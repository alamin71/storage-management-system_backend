const express = require("express");
const {
  forgotPassword,
  verifyOTP,
  resetPassword,
  googleLogin,
} = require("../controllers/authController");

const router = express.Router();

router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
router.post("/google-login", googleLogin);
module.exports = router;
