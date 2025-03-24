const fs = require("fs");
const path = require("path");
const PDF = require("../models/pdfModel");

// PDF Upload Function
exports.importPDF = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No PDF file uploaded!" });
  }

  try {
    const newPDF = new PDF({
      userId: req.user.id, // userId from middleware
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
    });

    await newPDF.save(); // save to database

    res.status(200).json({
      message: "PDF uploaded successfully!",
      pdf: newPDF,
    });
  } catch (error) {
    console.error("Error uploading PDF:", error);
    res.status(500).json({ message: "PDF upload failed." });
  }
};

// Get All PDFs API
exports.getAllPDFs = async (req, res) => {
  try {
    // only logged-in user's PDFs
    const pdfs = await PDF.find({ userId: req.user.id });

    res.status(200).json({
      message: "PDFs retrieved successfully!",
      pdfs, // All PDFs uploaded by the user
    });
  } catch (error) {
    console.error("Error fetching PDFs:", error);
    res.status(500).json({ message: "Failed to retrieve PDFs." });
  }
};
