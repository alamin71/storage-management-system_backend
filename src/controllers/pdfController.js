const cloudinary = require("../utils/cloudinaryConfig");
const PDF = require("../models/pdfModel");
const uploadToCloudinary = require("../utils/cloudinaryUpload");

exports.importPDF = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No PDF file uploaded!" });
  }

  try {
    // Cloudinary te upload korbo (resource_type 'raw' for PDFs)
    const result = await uploadToCloudinary(
      req.file.buffer,
      "user_pdfs",
      "raw"
    );

    // Save PDF details in the database
    const newPDF = new PDF({
      userId: req.user.id, // User ID from middleware
      cloudinaryId: result.public_id, // Cloudinary unique ID
      url: result.secure_url, // Cloudinary file URL
      filename: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });

    await newPDF.save(); // Save to database

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

// Delete PDF API
exports.deletePDF = async (req, res) => {
  const { id } = req.params;

  try {
    const pdf = await PDF.findById(id); // Find PDF in Database

    if (!pdf) {
      return res.status(404).json({ message: "PDF not found!" });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(pdf.cloudinaryId, {
      resource_type: "raw",
    });

    // Delete from Database
    await pdf.deleteOne();

    res.status(200).json({ message: "PDF deleted successfully!" });
  } catch (error) {
    console.error("Error deleting PDF:", error);
    res.status(500).json({ message: "PDF deletion failed." });
  }
};
