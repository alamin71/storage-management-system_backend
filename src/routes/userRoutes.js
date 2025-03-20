const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");

const router = express.Router();
// Test route
router.get("/", (req, res) => {
  res.send("User API is working!");
});

// User Registration
router.post("/register", registerUser);

// User Login
router.post("/login", loginUser);

module.exports = router;
