// Controllers/UserController.js

const bcrypt = require("bcrypt");
const User = require("../Models/UserModel");

// Register User
const registerUser = async (req, res) => {
  const { uName, uEmail, uAddress, uPhone, uPass, uType } = req.body;

  if (!uName || !uEmail || !uPass || !uAddress || !uPhone) {
    return res.json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ uEmail });
    if (existingUser) {
      return res.json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(uPass, 10);

    const newUser = new User({
      uName,
      uEmail,
      uAddress,
      uPhone,
      uPass: hashedPassword,
      uType,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error during user registration:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { uEmail, uPass } = req.body;

  if (!uEmail || !uPass) {
    return res.json({ error: "All Fields are Required" });
  }

  try {
    const user = await User.findOne({ uEmail });
    if (!user) {
      return res
        .status(404)
        .json({ status: "notFound", error: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(uPass, user.uPass);
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ status: "pwsError", error: "Incorrect password" });
    }

    const responseMessage =
      user.uType === "User" ? "Found User" : "Found Admin";
    const uId = user._id;

    return res
      .status(200)
      .json({ status: "ok", message: responseMessage, uId });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({ error: "Server Error" });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  const { uId } = req.params;

  try {
    const user = await User.findByIdAndDelete(uId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else {
      return res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (err) {
    console.error("Error deleting user:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Update User
const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { uName, uEmail, uAddress, uPhone, uPass, uType } = req.body;
  let user;

  try {
    user = await User.findByIdAndUpdate(
      id,
      { uName, uEmail, uAddress, uPhone, uPass, uType },
      { new: true }
    );
  } catch (err) {
    console.error(err);
  }

  // User cannot be updated
  if (!user) {
    return res.status(404).json({ message: "Can't update user" });
  }

  // User update success
  return res.status(200).json(user);
};

// Get User by ID
const getUserById = async (req, res) => {
  const { uId } = req.params;

  try {
    const user = await User.findById(uId).select("-uPass"); // exclude password
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  registerUser,
  getAllUsers,
  loginUser,
  deleteUser,
  updateUser,
  getUserById,
};
