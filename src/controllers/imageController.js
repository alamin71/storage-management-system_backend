const cloudinary = require("../utils/cloudinaryConfig");
const Image = require("../models/imageModel");
const uploadToCloudinary = require("../utils/cloudinaryUpload");

exports.importImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Cloudinary te upload korbo (resource_type 'image' for images)
    const result = await uploadToCloudinary(
      req.file.buffer,
      "user_uploads",
      "image"
    );

    // New Image Object for save db
    const newImage = new Image({
      userId: req.user.id, // User ID save
      cloudinaryId: result.public_id, // Cloudinary unique ID
      url: result.secure_url, // Cloudinary image URL
      filename: req.file.originalname, // Filename from multer
      mimetype: req.file.mimetype, // File type
      size: req.file.size, // File size in bytes
    });

    await newImage.save(); // save to database

    return res.status(200).json({
      message: "Image uploaded & saved successfully",
      image: newImage,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
};

// Get All Images API
exports.getAllImages = async (req, res) => {
  try {
    // Login user er shob image retrieve kora
    const images = await Image.find({ userId: req.user.id });

    res.status(200).json({
      message: "Images retrieved successfully!",
      images, // User uploaded shob images return kora
    });
  } catch (error) {
    console.error("Error fetching images:", error); // Error in fetching images
    res.status(500).json({ message: "Failed to retrieve images." }); // Internal server error
  }
};

// Delete Image API with Cloudinary
exports.deleteImage = async (req, res) => {
  const { id } = req.params;

  try {
    const image = await Image.findById(id); // image find to Database

    if (!image) {
      return res.status(404).json({ message: "Image not found!" });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(image.cloudinaryId);

    // Delete from Database
    await image.deleteOne();

    res.status(200).json({ message: "Image deleted successfully!" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Image deletion failed." });
  }
};
