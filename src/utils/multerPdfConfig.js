// const multer = require("multer");

// // File storage configuration (memory storage)
// const storage = multer.memoryStorage(); // Store file in memory instead of disk

// // File filter (only pdf allowed)
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "application/pdf") {
//     cb(null, true);
//   } else {
//     cb(new Error("Only PDF files are allowed!"), false);
//   }
// };

// // Multer middleware
// const uploadPDF = multer({
//   storage: storage, // Using memory storage instead of disk storage
//   fileFilter: fileFilter,
//   limits: { fileSize: 20 * 1024 * 1024 }, // 20MB max size limit
// });

// module.exports = uploadPDF;
const multer = require("multer");

// File storage configuration (memory storage)
const storage = multer.memoryStorage(); // Store file in memory instead of disk

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
  storage: storage, // Using memory storage
  fileFilter: fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB max size limit
});

module.exports = uploadPDF;
