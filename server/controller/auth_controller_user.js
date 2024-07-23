const User = require("../models/user_model");
const Provider = require("../models/provider_model.");
const jsonwebtoken = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
let userType = User;

const jwtVerify = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "No Token Provided" });
    }
    const decoded = jsonwebtoken.verify(token, process.env.JWT_KEY);
    try {
      return res
        .status(200)
        .json({ msg: "Token Verified!", valid: true, decoded });
    } catch (error) {
      return res.status(401).json({ msg: "Invalid Token", error });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: "Server Error", error });
  }
};

const clearCookies = (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ msg: "Cookies Cleared" });
    // res.send('Cookie cleared successfully');
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const userExists = await User.findOne({ phone });
    if (!userExists) {
      return res.status(401).json({ msg: "User Doesn't Exist." });
    }

    const checkPassword = await bcrypt.compare(password, userExists.password);
    if (!checkPassword) {
      return res.status(400).json({ msg: "Incorrect Password", code: 0 });
    }

    const token = await userExists.generateToken();
    res.cookie("token", token);

    res.status(200).json({
      msg: "User Logged In Successfully",
      userId: userExists._id.toString(),
      code: 1,
    });

    console.log("Successful Login ", "Token : ", token);
  } catch (error) {
    console.log("Error While Logging", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const register = async (req, res) => {
  try {
    const { username, fullname, email, phone, password } = req.body;
    const UserExits = await User.findOne({ phone });
    if (UserExits) {
      res.status(200).json({ msg: "User Already Exists", code: 0 });
      console.log("User Already Exists bsdk.");
      return;
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const userCreated = await User.create({
        username,
        fullname,
        email,
        phone,
        password: hashedPassword,
        image: {
          url: "https://i.pinimg.com/1200x/fc/04/73/fc047347b17f7df7ff288d78c8c281cf.jpg",
        },
      });

      const token = await userCreated.generateToken();
      res.status(201).json({
        msg: "User Created Sucessfully",
        code: 1,
        userID: userCreated._id.toString(),
      });
      console.log("User Created Successfully bkl", token);
    }
  } catch (error) {
    res.status(401).json({ msg: "Some Error Occured While Registering." });
    console.log("Some Error While Registering.", error);
  }
};

const googleLogin = async (req, res) => {
  try {
    const { email, isProvider } = req.body;
    if (isProvider) userType = Provider;
    console.log("Email , IsProvider :  ", email, isProvider);
    const userExists = await userType.findOne({ email: email });
    console.log("User Exists : ", userExists);
    if (!userExists) {
      console.log("User Doesnt Exist");
      return res
        .status(401)
        .json({ msg: "User Doesn't Exist. Please Register First.", code: 0 });
    }
    console.log("User :", userExists);
    const token = await userExists.generateToken();
    res.cookie("token", token);

    res.status(200).json({
      msg: "Login Successfull!",
      userId: userExists._id.toString(),
      code: 1,
      token,
    });

    console.log("Successful Google Login ", "Token : ", token);
  } catch (error) {
    console.log("Error While Logging", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const data = req.body.decoded;
    console.log(data);
    if (data.isProvider) userType = Provider;

    const user = await userType.findOne({
      _id: ObjectId.createFromHexString(data.userID),
    });
    console.log(user);
    if (user) {
      res.status(200).json({ msg: "Sucessfully Data Found ", user });
      console.log("User Successfully Found");
      return;
    }
    console.log("Some Error");
    res.status(400).json({ msg: "Error during Search " });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Some Error has occured. " });
  }
};

const editUserDetails = async (req, res) => {
  try {
    const reqData = req.body;
    console.log("Data From Body ", reqData);
    if (reqData.isProvider) userType = Provider;

    const user = await userType.updateOne(
      { phone: reqData.phone },
      {
        $set: {
          profession: reqData.profession,
          username: reqData.username,
          fullname: reqData.fullname,
          phone: reqData.phone,
          city: reqData.city,
          email: reqData.email,
          address: reqData.address,
          isAvailable: reqData.isAvailable,
          isVerified: reqData.isVerified,
        },
      }
    );
    const updatedUser = await userType.findOne({ phone: reqData.phone });
    console.log("Details Successfully Updated", updatedUser);
    res.status(200).json({ msg: "Details Successfully Updated", code: 1 });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something Went Wrong!" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { userID, newPassword, isProvider } = req.body;
    const userObjectId = ObjectId.createFromHexString(userID);
    
    if (isProvider) userType = Provider;

    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await userType.findOne({_id: userObjectId});
    const isSamePassword = await bcrypt.compare(newPassword, user.password);

    if (isSamePassword) {
      console.log("SAME PASSWORD BOZO")
      return res.status(400).json({code:2, msg: 'New password must be different from the current password' });
    }
    await userType.updateOne({ _id: userObjectId }, { password: newHashedPassword });

    console.log("Password Changed Successfully : ", user);
    res
      .status(200)
      .json({ msg: "Password Changed Successfully", code: 1, user: user });
  } catch (error) {
    console.log(error);
    res
    .status(400)
    .json({ msg: "Some Error Has Occured", code: 0 });
  }
};

const emailVerification = async (req, res) => {
  const userEmail = req.body.userEmail;

  let config = {
    service: "gmail",
    auth: {
      user: process.env.GMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  function generateEmailCode() {
    return Math.floor(100000 + Math.random() * 900000);
  }
  let emailCode = generateEmailCode();
  async function main() {
    const info = await transporter.sendMail({
      from: `Kunwarbir Singh 🤠" ${process.env.GMAIL} `,
      to: userEmail,
      subject: "Verification Mail",
      text: "Hello world?",
      html: `Your Verification Code is <b>${emailCode}</b> `,
    });
  }

  main().catch(console.error);
  console.log("Email sent: sucessfully.");
  return res
    .status(200)
    .json({ msg: "Email Verification Sent", emailCode: emailCode, code: 1 });
};

module.exports = {
  clearCookies,
  register,
  login,
  googleLogin,
  jwtVerify,
  getUserDetails,
  editUserDetails,
  emailVerification,
  changePassword,
};
