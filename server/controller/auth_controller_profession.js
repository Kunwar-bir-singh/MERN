const Profession = require("../models/profession_model");
const Provider = require("../models/provider_model.");
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');


const createProfession = async (req, res) => {
  try {
    const { name, city } = req.body;
    const professionExists = await Profession.findOne({ name, city });
    if (professionExists) {
      console.log("Profession Already Exists.");
      res
        .status(400)
        .json({
          msg: `The Profession In ${city}  Already Exists`,
          success: "true",
          professionExists,
        });
    } else {
      const professionCreated = await Profession.create({
        name,
        city,
      });
      console.log("Profession Created");
      res
        .status(201)
        .json({
          msg: `Profession named "${name}"  created In ${city} `,
          success: "true",
          professionCreated,
        });
    }
  } catch (error) {
    res.status(500).json({msg:"Internal Server Error"})
    console.log(error);
  }
};

const getProfession = async (req, res) => {
  try {
    const { name, city } = req.query;
    const objectUserId =  ObjectId.createFromHexString(req.body.userID);
    // console.log("Object userId",objectUserId , typeof objectUserId );
    const professionExists = await Profession.findOne({ name, city });

    if (!professionExists) {
      res.status(400).json({
        msg: "No results found. Ensure Details are Correct or Create That Profession",
        code : 0
      });
      console.log("Profession Isn't Found :( ");
    } else {
      const ifProviderLinked = professionExists.provider.includes(objectUserId);
      console.log("Output Of ifProviderLinked : ", ifProviderLinked);
      res.status(200).json({professionExists , code : 1, ifProviderLinked});
      console.log("Profession Found :) ", professionExists, ifProviderLinked);
    }
  } catch (error) {
    res.status(500).json({ msg: "Some Internal Server Error" , err : true });
    console.log(error);
  }
};

const editProfession = async (req, res) => {
  try {
    const professionCity = req.query.city;
    const professionName = req.query.name;

    const {providerID} = req.body;
   
    try {
      const profession = await Profession.findOne({
        city: professionCity,
        name: professionName,
      });
      if (!profession) {
        console.log("Profession Doesn't Exist");
        res.status(400).json({ msg: "Profession Doens't Exist." });
      } else {
        if(profession.provider.includes(providerID)){
          console.log("You are already linked with the profesison.");
          return res.status(400).json({msg : "You are already linked with the profesison." , code : 0});
        }
        profession.provider.push(providerID);
        await profession.save();
        res
          .status(200)
          .json({ success: true, msg: "Profession successfully linked!" , code : 1 });
        console.log("Provider Added Successfully.");
      }
    } catch (error) {
      console.log(error);
      res.status(401).json({ success: false, msg: "Some Error has occured." , code : 500});
      console.log("Some Error Has Occcured");
    }
  } catch (error) {
    res.status(500).json({msg:"Internal Server Error"})
    console.log(error);
  }
};

const getProviders = async (req, res) => {
  try {
    const { name, city } = req.query;
    const profession = await Profession.findOne({ name, city });

    if (!profession) {
      res.status(400).json({
        msg: "No results found. Ensure Details are Correct or Create That Profession",
      });
    }
    const providersId = profession.provider;
    console.log(providersId);
    const providers = await Provider.find({ _id: { $in: providersId } });
    console.log(providers);

    if (providers == null || providers.length === 0) {
      console.log("No providers found.");
      res.status(400).json({ msg: "Providers Doesn't Exist." });
    } else {
      res.status(200).json({ msg: "Providers Found!", providers });
      console.log("Providers Found!");
    }
  } catch (error) {
    console.log(error);
  }
};

const unLinkProvider = async (req, res) =>{
  try {
    const {userID, professionID} = req.body;
    // console.log(userID , professionID);
      const unLinked = await Profession.updateOne(
        { _id: ObjectId.createFromHexString(professionID) },
        { $pull: { provider: ObjectId.createFromHexString(userID) } }
      );
      if(unLinked.acknowledged){
        console.log("Profession Successfully Uninked!");
        res.status(200).json({msg : "Profession Successfully Uninked!", code : 1});
      } 
  } catch (error) {
    console.log(error);
    res.status(500).json({msg : "Some Error Has Occured."}, );
  }
}

module.exports = {
  getProfession,
  getProviders,
  createProfession,
  editProfession,
  unLinkProvider
};
