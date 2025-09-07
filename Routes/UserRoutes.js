// Routes/UserRoutes.js

const express = require("express");
const router = express.Router();
const {
  registerUser,
  getAllUsers,
  loginUser,
  getUserById,
  deleteUser,
  updateUser,
} = require("../Controllers/UserController");

router.post("/register", registerUser);
router.get("/users", getAllUsers);
router.post("/login", loginUser);
router.delete("/user/:uId", deleteUser);
router.put("/user/:id", updateUser);
router.get("/get-user/:uId", getUserById);

module.exports = router;
