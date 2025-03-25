const express = require("express");
const router = express.Router();
const upload = require("../utils/multerConfig"); // Multer middleware for handling file upload
const authMiddleware = require("../middleware/authMiddleware"); // JWT middleware for authentication
const {
  importImage,
  getAllImages,
  deleteImage,
} = require("../controllers/imageController");

// Image Upload Route (Authenticated User Only)
router.post(
  "/import-image",
  authMiddleware,
  upload.single("image"),
  importImage
);
// Get all images uploaded by the authenticated user
router.get("/all-image", authMiddleware, getAllImages);

/// Delete image by ID from database and Cloudinary
router.delete("/image/:id", authMiddleware, deleteImage);

module.exports = router;
