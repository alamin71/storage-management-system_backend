const multer = require("multer");

// Memory storage configuration for profile image upload
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Max 10MB image size limit
  },
  fileFilter: (req, file, cb) => {
    // Check if the uploaded file is an image
    if (file.mimetype.startsWith("image/")) {
      cb(null, true); // Accept file
    } else {
      cb(new Error("Only image files are allowed!"), false); // Reject file
    }
  },
});

module.exports = upload;
