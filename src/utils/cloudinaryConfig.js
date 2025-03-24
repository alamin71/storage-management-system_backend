const cloudinary = require("cloudinary").v2; // Cloudinary package
// require("dotenv").config(); // Load .env variables
const dotenv = require("dotenv");
dotenv.config();
// Cloudinary configuration using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Export Cloudinary instance to use in other files
module.exports = cloudinary;
