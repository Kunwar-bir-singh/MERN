const User = require("../models/user_model");
const bcrypt = require("bcrypt");
const home = (req, res) => {
  try {
    res.send("Auth Controller Working");
  } catch (error) {
    console.log("Some error has occured.", error);
  }
};

const login = async (req, res)=>{
    try {
       const {phone , password} = req.body;
       const userExists = await User.findOne({phone});
       if(!userExists){
        res.status(401).json({msg:"User Doesnt Exists."});
       }
       else{
        const checkPassword = await bcrypt.compare(password , userExists.password);
        if(checkPassword){
            res.status(200).json({msg: "User Logged In Successfully", token: await  userExists.generateToken() , userId : userExists._id.toString()});
            console.log("Sucessful Login");
        }
        else{
            res.status(400).json({msg: "Login Credentails Are Wrong"});
            console.log(" Credentails Are Wrong");
        }
       }
    } catch (error) {
        console.log("Error While Logging" , error);
    }
}

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
      const token = await userCreated.generateToken()
      res.status(201).json({ msg: "User Created Sucessfully" , token , userID:userCreated._id.toString()});
      console.log("User Created Successfully bkl", token);
    }
  } catch (error) {
    res.status(401).json({msg:"Error While Registering."})
    console.log("Some Error While Registering.", error);
  }
};

module.exports = {
  home,
  register,
  login,
};
