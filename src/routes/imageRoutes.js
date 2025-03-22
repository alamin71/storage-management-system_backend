const express = require("express");
const router = express.Router();
const upload = require("../utils/multerConfig"); // Multer middleware
const authMiddleware = require("../middleware/authMiddleware"); // JWT middleware
const { importImage } = require("../controllers/imageController");

// Image Upload Route (Authenticated User Only)
router.post(
  "/import-image",
  authMiddleware,
  upload.single("image"),
  importImage
);

module.exports = router;
