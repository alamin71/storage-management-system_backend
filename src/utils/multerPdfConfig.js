const multer = require("multer");

// File storage configuration (memory storage)
const storage = multer.memoryStorage();

// File filter (only allow PDFs)
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
};

//Multer middleware
const uploadPDF = multer({
  storage: storage, // Using memory storage
  fileFilter: fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB max size limit
});

module.exports = uploadPDF;
