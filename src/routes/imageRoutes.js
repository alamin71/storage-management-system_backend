const express = require("express");
const router = express.Router();
const upload = require("../utils/multerConfig"); // Multer middleware
const authMiddleware = require("../middleware/authMiddleware"); // JWT middleware
const { importImage, getAllImages } = require("../controllers/imageController");

// Image Upload Route (Authenticated User Only)
router.post(
  "/import-image",
  authMiddleware,
  upload.single("image"),
  importImage
);

// Get All Images API
router.get("/all-image", authMiddleware, getAllImages);

module.exports = router;
