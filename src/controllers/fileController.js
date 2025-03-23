const Folder = require("../models/folderModel");
const Note = require("../models/noteModel");
const Image = require("../models/imageModel");
const Pdf = require("../models/pdfModel");

exports.getUserFiles = async (req, res) => {
  try {
    const userId = req.user.id;

    const folders = await Folder.find({ userId });
    const notes = await Note.find({ userId });
    const images = await Image.find({ userId });
    const pdfs = await Pdf.find({ userId });

    res.status(200).json({
      folders,
      notes,
      images,
      pdfs,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
