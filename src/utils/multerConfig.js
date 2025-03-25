// const multer = require("multer");

// // Memory storage use korar jonno configuration
// const storage = multer.memoryStorage();

// // File filter to accept only image files
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(
//       new Error("Invalid file type. Only JPG, JPEG, PNG, and GIF are allowed.")
//     );
//   }
// };

// const upload = multer({ storage, fileFilter });

// module.exports = upload;
const multer = require("multer");

// File storage configuration (Use memory storage for Cloudinary)
const storage = multer.memoryStorage();

// File filter (only allow PDFs)
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
};

// Multer middleware
const uploadPDF = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB max size limit
});

module.exports = uploadPDF;
