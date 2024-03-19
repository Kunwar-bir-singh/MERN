const Profession = require("../models/profession_model");

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
      res.status(400).json({ msg: "No results found. Ensure Details are Correct or Create That Profession" });
    } else {
      res.status(200).json(professionExists);
    }
  } catch (error) {
    res.status(500).json({msg:"Some Internal Server Error"})
    console.log(error);
  }
};

module.exports = {getProfession , createProfession};
