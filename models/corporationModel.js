const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const corporationSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "A name is required."],
        validate: {
            validator: (v) => {
                return /^[a-zA-Z0-9]+$/.test(v); 
            },
            message: "Please enter a valid name."
        }
    },
    password: {
        type: String,
        required: [true, "A password is required"],
        validate: {
            validator: (v) => {
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(v);
            },
            message: "Please enter a valid password"
        }
    },
    userCollection: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }],
    directorName: {
        type: String,
        required: [true, "A director name is required."],
        validate: {
            validator: (v) => {
                return /^[a-zA-Z0-9]+$/.test(v); 
            },
            message: "Please enter a valid director name."
        }
    },
    siret: {
        type: String,
        required: [true, "A siret is required."],
        validate: {
            validator: (v) => {
                return /^[a-zA-Z0-9]+$/.test(v); 
            },
            message: "Please enter a siret."
        }
    }

});

corporationSchema.pre("save", function(next) {
    if (!this.isModified("password")) {
        return next();
    }
    bcrypt.hash(this.password, 10, (error, hash) => {
        if (error) {
            return next(error);
        }
        this.password = hash;
        next();
    });
});



const corporationModel = mongoose.model("Corporations", corporationSchema);
module.exports = corporationModel;
