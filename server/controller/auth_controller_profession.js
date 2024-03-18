const Profession = require("../models/profession_model");

const createProfession = async (req, res)=>{
    try {
        const {name, city} = req.body;
        const professionExists = await Profession.findOne({name , city})
        if(professionExists){
            console.log("Profession Already Exists.");
            res.status(400).json({msg:"Profession Already Exists"})
        }
        else{
            const professionCreated = await Profession.create({
                name , city
            })
            console.log("Profession Created");
            res.status(201).json({msg:"Profession Created", professionCreated})
        }     
    } catch (error) {
        console.log(error);
    }
}

module.exports = createProfession;