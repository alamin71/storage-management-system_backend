const multer = require("multer");

// Memory storage use korar jonno configuration
const storage = multer.memoryStorage();

// File filter to accept only image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPG, JPEG, PNG, and GIF are allowed.")
    );
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
