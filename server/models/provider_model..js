const mongoose = require("mongoose");

const ProviderSchema = new mongoose.Schema({
  profession: {
    type: String,
    require:true
  },
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  address: {
    type: String,
    require: false,
  },
  city: {
    type: String,
    require: false,
  },
  isProvider:{
    type:Boolean,
    default: true,
}
});

ProviderSchema.methods.generateToken = async function() {
  try {
      return jwt.sign({
          userID: this._id.toString(),
          isAdmin: this.isAdmin,
      },
      process.env.JWT_Key,{
          expiresIn: "1d",
      });
  } catch (error) {
      console.log(error);
  }
}

const Provider = new mongoose.model("Provider", ProviderSchema);
module.exports = Provider;
