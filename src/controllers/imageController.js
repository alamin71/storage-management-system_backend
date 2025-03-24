// const Image = require("../models/imageModel");

// // Image Upload Function
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

// // Get All Images API
// exports.getAllImages = async (req, res) => {
//   try {
//     // only login user
//     const images = await Image.find({ userId: req.user.id });

//     res.status(200).json({
//       message: "Images retrieved successfully!",
//       images, // User uploaded all images
//     });
//   } catch (error) {
//     console.error("Error fetching images:", error);
//     res.status(500).json({ message: "Failed to retrieve images." });
//   }
// };

const cloudinary = require("../utils/cloudinaryConfig"); // Cloudinary configuration import
const Image = require("../models/imageModel");

// Image Upload Function with Cloudinary
exports.importImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image file uploaded!" }); // No file uploaded
  }

  try {
    // Cloudinary te image upload
    const result = await cloudinary.uploader.upload(req.file.path);

    // Image details database e save kora
    const newImage = new Image({
      userId: req.user.id, // User id from middleware
      cloudinaryId: result.public_id, // Cloudinary image er unique ID
      url: result.secure_url, // Cloudinary image er URL
      mimetype: req.file.mimetype, // File type (JPEG, PNG, etc.)
      size: req.file.size, // File size
    });

    await newImage.save(); // Save to database

    res.status(200).json({
      message: "Image uploaded successfully!",
      image: newImage, // Return the image data
    });
  } catch (error) {
    console.error("Error uploading image:", error); // Error in uploading
    res.status(500).json({ message: "Image upload failed." }); // Internal server error
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
  const { imageId } = req.params; // Get image ID from request params

  try {
    const image = await Image.findById(imageId); // Database theke image search kora

    if (!image) {
      return res.status(404).json({ message: "Image not found!" }); // If image not found
    }

    // Cloudinary theke image delete kora
    await cloudinary.uploader.destroy(image.cloudinaryId);

    // Database theke image remove kora
    await image.remove();

    res.status(200).json({ message: "Image deleted successfully!" }); // Image delete success message
  } catch (error) {
    console.error("Error deleting image:", error); // Error in deleting
    res.status(500).json({ message: "Image deletion failed." }); // Internal server error
  }
};
