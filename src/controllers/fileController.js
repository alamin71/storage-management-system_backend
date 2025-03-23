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

//recent file api
exports.getRecentFiles = async (req, res) => {
  try {
    const userId = req.user.id;

    const recentFolders = await Folder.find({ userId })
      .sort({ createdAt: -1 })
      .limit(3);
    const recentNotes = await Note.find({ userId })
      .sort({ createdAt: -1 })
      .limit(3);
    const recentImages = await Image.find({ userId })
      .sort({ createdAt: -1 })
      .limit(3);
    const recentPdfs = await Pdf.find({ userId })
      .sort({ createdAt: -1 })
      .limit(3);

    const recentFiles = [
      ...recentFolders,
      ...recentNotes,
      ...recentImages,
      ...recentPdfs,
    ]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);

    res.status(200).json({ recentFiles });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//File Action API (Delete, Copy, Rename, Move, Duplicate)
exports.fileAction = async (req, res) => {
  try {
    const { fileId, fileType, action, newName, destinationFolderId } = req.body;

    let Model;
    switch (fileType) {
      case "folder":
        Model = Folder;
        break;
      case "note":
        Model = Note;
        break;
      case "image":
        Model = Image;
        break;
      case "pdf":
        Model = Pdf;
        break;
      default:
        return res.status(400).json({ message: "Invalid file type" });
    }

    let file = await Model.findById(fileId);
    if (!file) return res.status(404).json({ message: "File not found" });

    switch (action) {
      case "delete":
        await Model.findByIdAndDelete(fileId);
        return res.status(200).json({ message: "File deleted successfully" });

      case "rename":
        file.name = newName;
        await file.save();
        return res.status(200).json({ message: "File renamed successfully" });

      case "copy":
        const copiedFile = new Model({ ...file.toObject(), _id: undefined });
        await copiedFile.save();
        return res.status(200).json({ message: "File copied successfully" });

      case "move":
        file.folderId = destinationFolderId;
        await file.save();
        return res.status(200).json({ message: "File moved successfully" });

      case "duplicate":
        const duplicateFile = new Model({
          ...file.toObject(),
          _id: undefined,
          name: file.name + " (copy)",
        });
        await duplicateFile.save();
        return res
          .status(200)
          .json({ message: "File duplicated successfully" });

      default:
        return res.status(400).json({ message: "Invalid action" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
