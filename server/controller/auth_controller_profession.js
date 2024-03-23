const Profession = require("../models/profession_model");
const { param } = require("../router/auth_router");

const createProfession = async (req, res) => {
  try {
    const { name, city } = req.body;
    const professionExists = await Profession.findOne({ name, city });
    if (professionExists) {
      console.log("Profession Already Exists.");
      res.status(400).json({ msg: "Profession Already Exists" });
    } else {
      const professionCreated = await Profession.create({
        name,
        city,
      });
      console.log("Profession Created");
      res.status(201).json({ msg: "Profession Created", professionCreated });
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
      res
        .status(400)
        .json({
          msg: "No results found. Ensure Details are Correct or Create That Profession",
        });
    } else {
      res.status(200).json(professionExists);
    }
  } catch (error) {
    res.status(500).json({ msg: "Some Internal Server Error" });
    console.log(error);
  }
};

const editProfession = async (req, res) => {
  const providerId = req.body;
  const profession_city = req.query;
  console.log(profession_city.city);
  console.log(profession_city.name);

  try {
    const profession = await Profession.findOne({
      city: profession_city.city,
      name: profession_city.name,
    });
    if (!profession) {
      console.log("Profession Doesn't Exist");
      res.status(400).json({ msg: "Profession Doens't Exist." });
    } else {
      profession.provider.push(providerId.providerId);
      await profession.save();
      res
        .status(200)
        .json({ success: true, msg: "Provider added to the profession." });
      console.log("Provider Added Successfully.");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, msg: "Some Error has occured." });
    console.log("Some Error Has Occcured");
  }
};

module.exports = { getProfession, createProfession, editProfession };
