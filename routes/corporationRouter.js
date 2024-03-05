const userModel = require("../models/userModel");
const corporationRouter = require("express").Router();
const bcrypt = require("bcrypt");
const authguard = require("../services/authguard");
const corporationModel = require("../models/corporationModel");



corporationRouter.get("/", async (req, res) =>{
    res.render("./pages/home.twig");
});

corporationRouter.get("/register", async (req, res) => {
    try{
        res.render("./pages/register.twig", {
            title: "Register"
        });
    }catch (error){
        res.render("./pages/register.twig", {
            title: "Register",
            error: error.errors
        });
    }
});

corporationRouter.post("/register", async (req, res) => {
    try {
        const corporation = new corporationModel(req.body);
        await corporation.save();
        console.log("Corporation successfully created :", corporation);
        res.redirect("/login");
    } catch(error) {
        console.error("Error creating corporation:", error);
        res.render("./pages/register.twig", {
            error: error.errors
        });
    }
});

corporationRouter.get("/login", async (req, res) => {
    try{
        res.render("./pages/login.twig", {
            title: "Login"
        });
    }catch (error){
        res.render("./pages/register.twig", {
            title: "Login",
            error: error.errors
        });
    }
});

corporationRouter.post("/login", async (req, res) => {
    try {
        let corporation = await corporationModel.findOne({ name: req.body.name }, { password: 1 }); 
        if (corporation && corporation.password) { 
            if (await bcrypt.compare(req.body.password, corporation.password)) {
                req.session.corporation = corporation._id;
                console.log(req.session)
                res.redirect("/dashboard");
            } else {
                throw { password: "Wrong name or password" }
            }
        } else {
            throw { name: "Wrong name or password" }
        }
    } catch(error) {
        res.render("./pages/login.twig", {
            title: "Login",
            error: error
        })
    }
});

corporationRouter.get("/dashboard", authguard, async (req, res) => {
    try {
        const corporation = await corporationModel.findById(req.session.corporation);
        const users = await userModel.find({ _id: { $in: corporation.userCollection } });
        res.render("./pages/dashboard.twig", {
            title: "Dashboard",
            corporation: await corporationModel.findOne({ _id: req.session.corporation }).select("name"),
            users: users
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


corporationRouter.post("/dashboard", authguard, async (req, res) =>{
    try {
        const user = new userModel(req.body);
        user._corporation = req.session.corporation;
        await user.save();
        const userId = user._id;
        await corporationModel.updateOne(
            { _id: req.session.corporation },
            { $push: { userCollection: userId } }
        );
        console.log("User successfully created :", user);
        res.redirect("/dashboard")
    } catch(error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

corporationRouter.get("/delete/:id" , authguard, async (req, res) => {
    try{
        await userModel.deleteOne({_id: req.params.id})
        res.redirect("/dashboard")
    }catch(error){
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})

corporationRouter.get("/edit/:id" , authguard, async (req, res) => {
    try{
        let user = await userModel.findById(req.params.id)
        res.render("./pages/edituser.twig",{
            title: "Edit",
            user: user
        })
    }catch(error){
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})

corporationRouter.post("/edit/:id", authguard, async (req, res) => {
    try {
        const updatedUser = await userModel.updateOne({ _id: req.params.id }, req.body);
        const user = await userModel.findById(req.params.id);
        if(user.blame >= 3){
            await userModel.deleteOne({_id: req.params.id})
        }
        res.render("./pages/edituser.twig", {
            success: true,
            title: "Edit",
            user: user
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = corporationRouter;