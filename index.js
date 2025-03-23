const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./src/app"); // Import app.js

dotenv.config();

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDB Connected... Successfully");
  } catch (error) {
    console.error("Database Connection Failed:", error);
    process.exit(1);
  }
};

connectDB();

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
