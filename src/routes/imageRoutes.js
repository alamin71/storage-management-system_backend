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
const upload = require("../utils/multerConfig"); // Multer middleware (for file upload)
const authMiddleware = require("../middleware/authMiddleware"); // JWT middleware for authentication
const {
  importImage,
  getAllImages,
  deleteImage,
} = require("../controllers/imageController");

// Image Upload Route (Authenticated User Only)
router.post(
  "/import-image", // Route path
  authMiddleware, // User authentication middleware
  upload.single("image"), // Multer middleware to handle image file
  importImage // Controller function for uploading image
);

// Get All Images API
router.get("/all-image", authMiddleware, getAllImages); // Fetch all images for the authenticated user
// Delete image by id API
router.delete("/images/:id", authMiddleware, deleteImage); // Delete image by ID
module.exports = router;
