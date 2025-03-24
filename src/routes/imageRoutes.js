// const express = require("express");
// const router = express.Router();
// const upload = require("../utils/multerConfig"); // Multer middleware
// const authMiddleware = require("../middleware/authMiddleware"); // JWT middleware
// const { importImage, getAllImages } = require("../controllers/imageController");

// // Image Upload Route (Authenticated User Only)
// router.post(
//   "/import-image",
//   authMiddleware,
//   upload.single("image"),
//   importImage
// );

// // Get All Images API
// router.get("/all-image", authMiddleware, getAllImages);

// module.exports = router;
const express = require("express");
const router = express.Router();
const upload = require("../utils/multerConfig"); // Multer middleware for handling file upload
const authMiddleware = require("../middleware/authMiddleware"); // JWT middleware for authentication
const {
  importImage, // Controller function for image upload
  getAllImages, // Controller function for fetching all images
  deleteImage, // Controller function for deleting image by ID
} = require("../controllers/imageController");

// Image Upload Route (Authenticated User Only)
router.post(
  "/import-image", // Route for uploading image
  authMiddleware, // Authenticate the user before uploading
  upload.single("image"), // Handle single image upload with multer middleware
  importImage // Call the controller function to upload the image to Cloudinary
);

// Get All Images API (Authenticated User Only)
router.get("/all-image", authMiddleware, getAllImages); // Fetch all images uploaded by the authenticated user

// Delete Image by ID API (Authenticated User Only)
router.delete("/images/:id", authMiddleware, deleteImage); // Delete image by ID from database and Cloudinary

module.exports = router;
