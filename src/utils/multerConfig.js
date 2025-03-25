// const multer = require("multer");
// const path = require("path");

// // Set up storage configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Image files will be stored in the 'uploads' folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Generate unique file name
//   },
// });

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

// const multer = require("multer");
// const path = require("path");

// // File storage configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // লোকাল আপলোড ফোল্ডার
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// const upload = multer({ storage: storage });

// module.exports = upload;
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure "uploads" folder exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Saving to:", uploadDir); // Debugging log
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const filename = "image-" + Date.now() + path.extname(file.originalname);
    console.log("Generated filename:", filename); // Debugging log
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
