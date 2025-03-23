const express = require("express");
const {
  registerUser,
  loginUser,
  editProfile,
  changePassword,
  deleteAccount,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
// Test route
router.get("/", (req, res) => {
  res.send("User API is working!");
});

// User Registration
router.post("/register", registerUser);

// User Login
router.post("/login", loginUser);

//edit profile
router.put("/profile", authMiddleware, editProfile);

//change password
router.put("/change-password", authMiddleware, changePassword);

// delete Account
router.delete("/delete", authMiddleware, deleteAccount);

module.exports = router;
