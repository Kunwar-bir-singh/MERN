const mongoose  = require("mongoose");
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require: true,
    },
    fullname:{
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
    isVerified: {
        type : Boolean,
        default : false,
      },
    isProvider:{
        type:Boolean,
        default: false,
    },
    bookmarkProvider:[{
        type: Number,
        ref: "Bookmark"
    }]
    ,
    image:{
        publicId:{
            type: String,
            required: false,
        },
        url: {
            type: String,
            required: false,
        }
    }    
})

userSchema.methods.generateToken = async function() {
    try {
        return jwt.sign({
            userID: this._id.toString(),
            isProvider: this.isProvider,
        },
        process.env.JWT_Key,{
            expiresIn: "1d",
        });
    } catch (error) {
        console.log(error);
    }
}

const User = new mongoose.model("Users" , userSchema);
module.exports = User;