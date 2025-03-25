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

const cloudinary = require("../utils/cloudinaryConfig");
const Image = require("../models/imageModel");

// exports.importImage = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     // Convert Buffer to Base64 DataURI
//     const base64Image = `data:${
//       req.file.mimetype
//     };base64,${req.file.buffer.toString("base64")}`;

//     // Upload to Cloudinary
//     const result = await cloudinary.uploader.upload(base64Image, {
//       folder: "user_uploads",
//     });

//     return res.status(200).json({
//       message: "Image uploaded successfully",
//       url: result.secure_url,
//     });
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     res.status(500).json({ error: "Failed to upload image" });
//   }
// };
exports.importImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Convert Buffer to Base64
    const base64Image = `data:${
      req.file.mimetype
    };base64,${req.file.buffer.toString("base64")}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: "user_uploads",
    });

    // নতুন Image Object তৈরি করে ডাটাবেজে সংরক্ষণ
    const newImage = new Image({
      userId: req.user.id, // **User ID সংরক্ষণ করুন**
      cloudinaryId: result.public_id, // Cloudinary এর unique ID
      url: result.secure_url, // Cloudinary image URL
      filename: req.file.originalname, // Filename multer থেকে নিবো
      mimetype: req.file.mimetype, // File type
      size: req.file.size, // File size in bytes
    });

    await newImage.save(); // ডাটাবেজে save করুন

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
  const { id } = req.params; // `id` হিসেবে ধরতে হবে

  try {
    const image = await Image.findById(id); // Database থেকে image খুঁজে বের করা

    if (!image) {
      return res.status(404).json({ message: "Image not found!" });
    }

    // Cloudinary থেকে image মুছতে হবে
    await cloudinary.uploader.destroy(image.cloudinaryId);

    // Database থেকে image delete করা
    await image.deleteOne();

    res.status(200).json({ message: "Image deleted successfully!" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Image deletion failed." });
  }
};
