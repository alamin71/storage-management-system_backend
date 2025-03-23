const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Email validation function
const validateEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

// User Registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Email validation
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email format!" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists!" });

    // Password validation
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// User Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials!" });

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials!" });

    // Generate a new JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "6h", // Set the expiration time 6 hour
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = { registerUser, loginUser };
