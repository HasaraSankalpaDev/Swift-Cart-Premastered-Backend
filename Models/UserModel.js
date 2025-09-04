const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserRegister = new Schema({
  uName: { type: String, required: true },
  uEmail: { type: String, required: true },
  uAddress: { type: String, required: true },
  uPhone: { type: String, required: true },
  uPass: { type: String, required: true },
  uType: { type: String, required: false },
});

module.exports = mongoose.model("UserRegister", UserRegister);
