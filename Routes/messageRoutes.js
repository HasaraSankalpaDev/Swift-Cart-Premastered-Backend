const express = require("express");
const router = express.Router();
const {
  saveMessage,
  getAllMessages,
} = require("../Controllers/MessageController");

// Public route for sending messages
router.post("/send-message", saveMessage);

// Admin route to fetch all messages
router.get("/all-messages", getAllMessages);

module.exports = router;
