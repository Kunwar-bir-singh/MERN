const Provider = require("../models/provider_model.");
const bcrypt = require("bcrypt");
const { jwtVerify } = require("./auth_controller_user");
const User = require("../models/user_model");
const { ObjectId } = require("mongodb");
const registerProvider = async (req, res) => {
  try {
    const { profession, fullname, username, password, phone, address, city } =
      req.body;
    const providerExists = await Provider.findOne({ phone });
    if (providerExists) {
      return res
        .status(400)
        .json({ msg: "Provider Already Exists, Please Login", code: 0 });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const providerCreated = await Provider.create({
        profession,
        username,
        fullname,
        password: hashedPassword,
        phone,
        address,
        city,
        image: {
          url: "https://i.pinimg.com/1200x/fc/04/73/fc047347b17f7df7ff288d78c8c281cf.jpg",
        },
      });
      console.log("Provider Created Successfully", providerCreated);
      return res
        .status(201)
        .json({ msg: "Provider Created Successfully.", code: 1 });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

const loginProvider = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const providerExists = await Provider.findOne({ phone });
    if (!providerExists) {
      console.log("Create A Provider First");
      res.status(400).json({ msg: "Provider Doesn't Exists", code: 2 });
    } else {
      const comparePass = await bcrypt.compare(
        password,
        providerExists.password
      );
      if (comparePass) {
        console.log("Provider Exists!!");

        const token = await providerExists.generateToken();
        res.cookie("token", token);

        res.status(200).json({
          msg: "Provider Logged In Successfully",
          code: 1,
        });

        console.log("Successful Login As Provider", "Token : ", token);
      } else {
        console.log("Invalid Credentails");
        res.status(400).json({ msg: "Invalid Credentails", code: 0 });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Server Error While Provider Login" });
  }
};

const bookmarkProfession = async (req, res) => {
  try {
    const { userID, providerPhone, isProvider } = req.body;
    console.log(userID,providerPhone , isProvider);

    let userType = isProvider ? Provider : User;
    const userObjectId = ObjectId.createFromHexString(userID);
    const user = await userType
      .findOne({
        _id: userObjectId,
      }) 
      const phoneExists = user.bookmarkProvider.includes(providerPhone);
      console.log(phoneExists);
      if(phoneExists) 
      {
        await userType.updateOne( {_id : userObjectId}, { $pull: {bookmarkProvider : providerPhone  }} )
        console.log("Bookmark Removed!",);
        await Provider.updateOne({phone : providerPhone} , {$pull : {bookmarkedWith: userObjectId}})
        res.status(200).json({ msg: "Bookmark Removed!", code: 0 });
      }
      else {
        await userType.updateOne({ _id: userObjectId },{ $push: { bookmarkProvider: providerPhone }});
        await Provider.updateOne({phone : providerPhone} , {$push : {bookmarkedWith: userObjectId}})
        res.status(200).json({ msg: "Bookmark Added!", code: 1 });
      }
  } catch (error) {
    console.log("Bookmark Error : ");
    console.log(error);
    res.status(400).json({ msg: "Some Error" });
  }
};

module.exports = { loginProvider, registerProvider, bookmarkProfession };
