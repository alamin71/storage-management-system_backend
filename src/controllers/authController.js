const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");

const otpStorage = {}; // Temporarily OTP will be save

// Forgot Password API: OTP Generate and send otp through Email
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStorage[email] = { otp, expires: Date.now() + 5 * 60 * 1000 }; // till 5 min valid

    //message for mail when send OTP
    const message = `Your OTP for password reset is: ${otp}. It will expire in 5 minutes.`;

    // OTP send to email
    await sendEmail(email, "Password Reset OTP", message);

    res.status(200).json({ message: "OTP sent to your email." });
  } catch (error) {
    res.status(500).json({ message: "Error sending OTP", error });
  }
};

// Verify OTP API
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const storedOTP = otpStorage[email];

    //if  OTP not match or time expired
    if (!storedOTP) {
      return res.status(400).json({ message: "OTP expired or not requested." });
    }

    if (storedOTP.otp !== parseInt(otp)) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    res.status(200).json({ message: "OTP verified successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error verifying OTP", error });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const storedOTP = otpStorage[email];

    if (!storedOTP || storedOTP.otp !== parseInt(otp)) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    delete otpStorage[email]; // Remove OTP after successful reset

    res.status(200).json({ message: "Password reset successfully!" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Error resetting password", error });
  }
};

//google login... Google ID Token Verify API
const admin = require("../utils/firebaseAdmin");
const jwt = require("jsonwebtoken");

exports.googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body; // get ID Token from Frontend

    // Google ID Token Verify
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email, name, picture, uid } = decodedToken;

    // find database user
    let user = await User.findOne({ email });

    if (!user) {
      // if new user will be insert database
      user = new User({ name, email, googleId: uid });
      await user.save();
    }

    // Custom JWT Token Generate
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "6h",
    });

    res.status(200).json({ message: "Google Login Successful", token, user });
  } catch (error) {
    res.status(500).json({ message: "Google Login Failed", error });
  }
};
