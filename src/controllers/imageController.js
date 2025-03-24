const Image = require("../models/imageModel");

// Image Upload Function
exports.importImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image file uploaded!" });
  }

  try {
    const newImage = new Image({
      userId: req.user.id, // userId from middleware
      filename: req.file.filename,
      path: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });

    await newImage.save(); // Database- save

    res.status(200).json({
      message: "Image uploaded successfully!",
      image: newImage,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Image upload failed." });
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
