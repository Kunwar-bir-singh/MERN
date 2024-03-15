const Provider = require("../models/provider_model.");
const bcrypt = require('bcrypt');

const registerProvider = async (req ,res ) =>{
    try {
      const {profession, fullname,password ,phone,adress,city} = req.body;
      const providerExist = await Provider.findOne({phone});
      if(providerExist){
        res.status(400).json({msg:"Provider Aleady Exists , Please Login"});
      }
      else{
        const hashedPassword = await bcrypt.hash(password ,10);
        const providerCreated = await Provider.create({
            profession, fullname,password:hashedPassword ,phone,adress,city
        });
        
        res.status(201).json({msg:"Provider Created Successfully."});
        console.log("Provider Created");
      }

    } catch (error) {
        console.log(error);
    }
}

const loginProvider = async (req , res)=>{
  try {
    const {phone , password} = req.body;
    const providerExist = await Provider.findOne({phone});
    if(!providerExist){
      console.log("Create A Provider");
      res.status(400).json({msg:"Provider Doesn't Exists"});
    }
    else{
      const comparePass = await bcrypt.compare(password , providerExist.password);
      if(comparePass){
        console.log("Provider Exists!!");
      res.status(200).json({msg:"Successful login"});
      }
      else{
        console.log("Invalid Credentails");
      res.status(400).json({msg:"Invalid Credentails"});
      }
    }
  } catch (error) {
    console.log(error);
  }  
}

module.exports = {loginProvider , registerProvider}