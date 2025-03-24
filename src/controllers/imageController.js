const Image = require("../models/imageModel");
const fs = require("fs");
const path = require("path");

// Image Upload Function
// exports.importImage = async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: "No image file uploaded!" });
//   }

//   try {
//     const newImage = new Image({
//       userId: req.user.id, // userId from middleware
//       filename: req.file.filename,
//       path: req.file.path,
//       mimetype: req.file.mimetype,
//       size: req.file.size,
//     });

//     await newImage.save(); // Database- save

//     res.status(200).json({
//       message: "Image uploaded successfully!",
//       image: newImage,
//     });
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     res.status(500).json({ message: "Image upload failed." });
//   }
// };

exports.importImage = async (req, res) => {
  console.log("⏳ Image Upload API Called..."); // ✅ Start Log

  if (!req.file) {
    console.log("❌ No File Received!"); // ✅ Log if file is missing
    return res.status(400).json({ message: "No image file uploaded!" });
  }

  try {
    console.log("📸 Uploaded File Details:", req.file); // ✅ Log File Details

    const newImage = new Image({
      userId: req.user.id, // Middleware থেকে userId নিচ্ছে
      filename: req.file.filename,
      path: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });

    await newImage.save(); // ✅ Database-এ save করবে

    console.log("✅ Image Uploaded Successfully:", newImage); // ✅ Log Success

    res.status(200).json({
      message: "Image uploaded successfully!",
      image: newImage,
    });
  } catch (error) {
    console.error("🚨 Error uploading image:", error); // ✅ Log Actual Error
    res
      .status(500)
      .json({ message: "Image upload failed.", error: error.message });
  }
};

// Get All Images API
exports.getAllImages = async (req, res) => {
  try {
    // only login user
    const images = await Image.find({ userId: req.user.id });

    res.status(200).json({
      message: "Images retrieved successfully!",
      images, // User uploaded all images
    });
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ message: "Failed to retrieve images." });
  }
};

// Delete Image API
exports.deleteImage = async (req, res) => {
  try {
    const imageId = req.params.id; //  image ID from URL
    const userId = req.user.id; // user ID from Middleware

    // find image
    const image = await Image.findOne({ _id: imageId, userId });

    if (!image) {
      return res
        .status(404)
        .json({ message: "Image not found or Unauthorized!" });
    }

    // delete from file system
    const imagePath = path.join(__dirname, "..", image.path);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // delete from db
    await Image.findByIdAndDelete(imageId);

    res.status(200).json({ message: "Image deleted successfully!" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Failed to delete image." });
  }
};
