const Profession = require("../models/profession_model");
const Provider = require("../models/provider_model.");
const jwt = require('jsonwebtoken');

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
          msg: `Profession named "${name}"  Created In ${city} `,
          success: "true",
          professionCreated,
        });
    }
  } catch (error) {
    console.log(error);
  }
};

const getProfession = async (req, res) => {
  try {
    const { name, city } = req.query;
    const professionExists = await Profession.findOne({ name, city });

    if (!professionExists) {
      res.status(400).json({
        msg: "No results found. Ensure Details are Correct or Create That Profession",
      });
    } else {
      const numberOfProviders = professionExists.provider.length;
      res.status(200).json(professionExists);
    }
  } catch (error) {
    res.status(500).json({ msg: "Some Internal Server Error" });
    console.log(error);
  }
};

const editProfession = async (req, res) => {
  try {
    const providerId = req.cookies.token;
    const profession_city = req.query;
    const providerID = jwt.verify(providerId , process.env.JWT_KEY).userID;
    
    // console.log(decodedToken.userID);
    // console.log(profession_city.city);
    // console.log(profession_city.name);

    try {
      const profession = await Profession.findOne({
        city: profession_city.city,
        name: profession_city.name,
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
          .json({ success: true, msg: "Provider added to the profession." , code : 1 });
        console.log("Provider Added Successfully.");
      }
    } catch (error) {
      console.log(error);
      res.status(401).json({ success: false, msg: "Some Error has occured." , code : 500});
      console.log("Some Error Has Occcured");
    }
  } catch (error) {
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

module.exports = {
  getProfession,
  getProviders,
  createProfession,
  editProfession,
};
