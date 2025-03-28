const express = require("express");
const router = express.Router();
const uploadPDF = require("../utils/multerPdfConfig");
const authMiddleware = require("../middleware/authMiddleware");
const {
  importPDF,
  getAllPDFs,
  deletePDF,
} = require("../controllers/pdfController");

// PDF Upload Route
router.post("/import-pdf", authMiddleware, uploadPDF.single("pdf"), importPDF);
// get all pdf
router.get("/all-pdfs", authMiddleware, getAllPDFs);
//delete pdf
router.delete("/pdf/:id", authMiddleware, deletePDF);

module.exports = router;
