const Provider = require("../models/provider_model.");
const bcrypt = require('bcrypt');

const register = async (req ,res ) =>{
    try {
      const {profession, fullname,password ,phone,adress,city} = req.body;
      const providerExist = await Provider.findOne({phone});
      if(providerExist){
        res.status(400).json({msg:"Provider Aleady Exists , Please Login"});
      }
      else{
        const hashedPassword = bcrypt.hash(password ,10);
        const providerCreated = await Provider.create({
            profession, fullname,password:hashedPassword ,phone,adress,city
        });
        
        req.status(201).json({msg:"Provider Created Successfully."});
        console.log("Provider Created");
      }

    } catch (error) {
        console.log(error);
    }
}