const mongoose  = require("mongoose");
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require: true,
    },
    email:{
        type:String,
        require: true,
    },
    phone:{
        type:String,
        require: true,
    },
    password:{
        type:String,
        require: true,
    },
    isAdmin:{
        type:Boolean,
        default: false,
    }
})

userSchema.methods.generateToken = async function() {
    try {
        return jwt.sign({
            userID: this._id.toString(),
            phone: this.phone,
            isAdmin: this.isAdmin,
        },
        process.env.JWT_Key,{
            expiresIn: "1d",
        });
    } catch (error) {
        console.log(error);
        throw error; // Ensure errors are propagated
    }
}

const User = new mongoose.model("Users" , userSchema);
module.exports = User;