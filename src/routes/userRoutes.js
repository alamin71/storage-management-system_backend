const express = require("express");
const upload = require("../utils/editProfileMulterConfig"); // Import multer config
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

// Edit profile with image upload (memory storage)
router.put(
  "/edit-profile",
  authMiddleware,
  upload.single("profileImage"),
  editProfile
);

//change password
router.put("/change-password", authMiddleware, changePassword);

// delete Account
router.delete("/delete", authMiddleware, deleteAccount);

module.exports = router;
