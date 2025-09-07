// Controllers/MessageController.js
const Message = require("../Models/MessageModel");

// Save a new message
const saveMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    return res.status(201).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error("Error saving message:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get all messages (admin)
const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  saveMessage,
  getAllMessages,
};
