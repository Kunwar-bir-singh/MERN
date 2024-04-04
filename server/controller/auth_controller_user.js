const User = require("../models/user_model");
const jsonwebtoken = require('jsonwebtoken');

const bcrypt = require("bcrypt");

const jwtVerify = async (req, res , next)=>{
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) { 
      return res.status(401).json({msg : "No Token Provided"});
    } 
    
    const decoded = jsonwebtoken.verify(token , process.env.JWT_KEY);
    try {
      return res.status(200).json({msg : "Token Verified!" , valid : true , decoded});
    } catch (error) {
      return res.status(401).json({msg : "Invalid Token" , error});
    }
  } catch (error) {
    return res.status(401).json({msg : "Server Error" , error});
    console.log(error);
  }

}

const clearCookies = (req, res) => {
  try {
    res.clearCookie('token');
    res.json({msg : "Cookies Cleared"});
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
      return res.status(400).json({ msg: "Incorrect Password" });
    }

    const token = await userExists.generateToken();
    // res.cookie('token',token, { httpOnly: true});
    res.cookie('token',token);

    res.status(200).json({
      msg: "User Logged In Successfully",
      token,
      userId: userExists._id.toString(),
    });

    console.log("Successful Login","Token : ", token); 
    
  } catch (error) {
    console.log("Error While Logging", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};


const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const UserExits = await User.findOne({ phone });
    if (UserExits) {
      res.status(200).json({ msg: "User Already Exists" });
      console.log("User Already Exists bsdk.");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const userCreated = await User.create({
        username,
        email,
        phone,
        password: hashedPassword,
      });

      const token = await userCreated.generateToken();
      res
        .status(201)
        .json({
          msg: "User Created Sucessfully",
          token,
          userID: userCreated._id.toString(),
        });
      console.log("User Created Successfully bkl", token);
    }
  } catch (error) {
    res.status(401).json({ msg: "Error While Registering." });
    console.log("Some Error While Registering.", error);
  }
};

module.exports = {
  clearCookies,
  register,
  login,
  jwtVerify,
};
