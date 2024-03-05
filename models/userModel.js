const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
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
    photo: {
        type: String,
        validate: {
            validator: (v) => {
                return /^[a-zA-Z0-9]+$/.test(v);
            },
            message: "Please enter a valid image"
        }
    },
    blame:{
        type: Number,
        required: [true, "A blame number is required"]
    },
    function: {
        type: String,
        required: [true, "A function is required."],
        validate: {
            validator: (v) => {
                return /^[a-zA-Z0-9]+$/.test(v); 
            },
            message: "Please enter a valid function."
        }
    }
});

userSchema.pre("save", async function (next){
    await userModel.updateOne(
        {_id: this._user},
        {$addToSet: {userCollection: this._id}}
    )
});
const userModel = mongoose.model("Users", userSchema);
module.exports = userModel;
