const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const multer = require("multer");
const upload = multer({ dest: "uploads/"});

const storage = multer.diskStorage({
    destination: function (req, file,  cb) {
        cb(null, "/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
require("dotenv").config();
const port = process.env.PORT;
const db = process.env.DB;
const app = express();
const corporationRouter = require("./routes/corporationRouter");
const cookieParser = require("cookie-parser")

app.use('/uploads', express.static('uploads'));
app.use(cookieParser());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(session({
    secret: "jnirmallo",
    resave: true,
    saveUninitialized: true
}));

app.use(corporationRouter);
app.use(express.static("./public"));

app.listen(port, (err)=>{
    if(err){
        console.log(err);
    } else {
        console.log(`Connecté au serveur sur le port ${port}`);
    }
});

mongoose.set("strictQuery", true);
mongoose.connect(db)
    .then(() => {
        console.log("Connecté à MongoDB");
    })
    .catch((err) => {
        console.error("Erreur de connexion à MongoDB :", err);
    });


