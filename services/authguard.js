const corporationModel = require("../models/corporationModel");

const authguard = async (req, res, next) => {
    try{
        if (req.session.corporation){
            let user = await corporationModel.findOne({_id: req.session.corporation});
            if(user){
                return next();
            }
        }
        throw new Error("Corporation not connected.");
    }catch(error){
        console.error(error.message);
        res.redirect("/login");
    }
}
module.exports = authguard;