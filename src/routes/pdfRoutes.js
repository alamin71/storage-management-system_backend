const express = require("express");
const router = express.Router();
const uploadPDF = require("../utils/multerPdfConfig"); // Updated Multer config
const authMiddleware = require("../middleware/authMiddleware");
const { importPDF, getAllPDFs } = require("../controllers/pdfController");

// PDF Upload Route
router.post("/import-pdf", authMiddleware, uploadPDF.single("pdf"), importPDF);
// get all pdf
router.get("/all-pdfs", authMiddleware, getAllPDFs);

module.exports = router;
