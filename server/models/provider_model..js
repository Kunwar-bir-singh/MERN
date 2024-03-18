const mongoose = require("mongoose");

const ProviderSchema = new mongoose.Schema({
  profession: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profession", // Reference to the Profession model
    required: true,
  },
  fullname: {
    type: String,
    requre: true,
  },
  password: {
    type: String,
    requre: true,
  },
  phone: {
    type: Number,
    requre: true,
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
