// Models/MessageModel.js
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    uName: {
      type: String,
      required: true,
    },
    uEmail: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
