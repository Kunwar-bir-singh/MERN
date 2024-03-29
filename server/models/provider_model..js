const mongoose = require("mongoose");

const ProviderSchema = new mongoose.Schema({
  profession: {
    type: String,
    require:true
  },
  fullname: {
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
});

const Provider = new mongoose.model("Provider", ProviderSchema);
module.exports = Provider;
