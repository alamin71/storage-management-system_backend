const mongoose = require("mongoose");
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

//recent upoladed file show api
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
// exports.fileAction = async (req, res) => {
//   try {
//     const { fileId, fileType, action, newName, destinationFolderId } = req.body;

//     let Model;
//     switch (fileType) {
//       case "folder":
//         Model = Folder;
//         break;
//       case "note":
//         Model = Note;
//         break;
//       case "image":
//         Model = Image;
//         break;
//       case "pdf":
//         Model = Pdf;
//         break;
//       default:
//         return res.status(400).json({ message: "Invalid file type" });
//     }

//     let file = await Model.findById(fileId);
//     if (!file) return res.status(404).json({ message: "File not found" });

//     switch (action) {
//       case "delete":
//         await Model.findByIdAndDelete(fileId);
//         return res.status(200).json({ message: "File deleted successfully" });

//       case "rename":
//         file.name = newName;
//         await file.save();
//         return res.status(200).json({ message: "File renamed successfully" });

//       case "copy":
//         const copiedFile = new Model({ ...file.toObject(), _id: undefined });
//         await copiedFile.save();
//         return res.status(200).json({ message: "File copied successfully" });

//       case "move":
//         file.folderId = destinationFolderId;
//         await file.save();
//         return res.status(200).json({ message: "File moved successfully" });

//       case "duplicate":
//         const duplicateFile = new Model({
//           ...file.toObject(),
//           _id: undefined,
//           name: file.name + " (copy)",
//         });
//         await duplicateFile.save();
//         return res
//           .status(200)
//           .json({ message: "File duplicated successfully" });

//       default:
//         return res.status(400).json({ message: "Invalid action" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
// exports.fileAction = async (req, res) => {
//   try {
//     let { fileId, fileType, action, newName, destinationFolderId } = req.body;

//     // Check if fileId is a valid ObjectId
//     if (!mongoose.Types.ObjectId.isValid(fileId)) {
//       return res.status(400).json({ message: "Invalid file ID format" });
//     }

//     // Convert fileId to ObjectId
//     fileId = new mongoose.Types.ObjectId(fileId);

//     let Model;
//     switch (fileType) {
//       case "folder":
//         Model = Folder;
//         break;
//       case "note":
//         Model = Note;
//         break;
//       case "image":
//         Model = Image;
//         break;
//       case "pdf":
//         Model = Pdf;
//         break;
//       default:
//         return res.status(400).json({ message: "Invalid file type" });
//     }

//     let file = await Model.findById(fileId);
//     if (!file) return res.status(404).json({ message: "File not found" });

//     switch (action) {
//       case "delete":
//         await Model.findByIdAndDelete(fileId);
//         return res.status(200).json({ message: "File deleted successfully" });

//       case "rename":
//         if (fileType === "folder" || fileType === "note") {
//           file.name = newName;
//         } else {
//           file.filename = newName;
//         }
//         await file.save();
//         return res.status(200).json({ message: "File renamed successfully" });

//       case "copy":
//         const copiedFile = new Model({ ...file.toObject(), _id: undefined });
//         await copiedFile.save();
//         return res.status(200).json({ message: "File copied successfully" });

//       case "move":
//         if (!mongoose.Types.ObjectId.isValid(destinationFolderId)) {
//           return res
//             .status(400)
//             .json({ message: "Invalid destination folder ID" });
//         }
//         file.parentFolder = new mongoose.Types.ObjectId(destinationFolderId);
//         await file.save();
//         return res.status(200).json({ message: "File moved successfully" });

//       case "duplicate":
//         const duplicateFile = new Model({
//           ...file.toObject(),
//           _id: undefined,
//           filename: file.filename ? file.filename + " (copy)" : undefined,
//           name: file.name ? file.name + " (copy)" : undefined,
//         });
//         await duplicateFile.save();
//         return res
//           .status(200)
//           .json({ message: "File duplicated successfully" });

//       default:
//         return res.status(400).json({ message: "Invalid action" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

exports.fileAction = async (req, res) => {
  try {
    let { fileId, fileType, action, newName, destinationFolderId } = req.body;

    // Check if fileId is valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(fileId)) {
      return res.status(400).json({ message: "Invalid file ID format" });
    }

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
        if (!newName) {
          return res.status(400).json({ message: "New name is required" });
        }
        if (fileType === "folder" || fileType === "note") {
          file.name = newName;
        } else {
          file.filename = newName;
        }
        await file.save();
        return res.status(200).json({ message: "File renamed successfully" });

      case "copy":
        const copiedFile = new Model({
          ...file.toObject(),
          _id: new mongoose.Types.ObjectId(),
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
        await copiedFile.save();
        return res.status(200).json({ message: "File copied successfully" });

      case "move":
        if (!mongoose.Types.ObjectId.isValid(destinationFolderId)) {
          return res
            .status(400)
            .json({ message: "Invalid destination folder ID" });
        }
        file.parentFolder = new mongoose.Types.ObjectId(destinationFolderId);
        await file.save();
        return res.status(200).json({ message: "File moved successfully" });

      case "duplicate":
        const duplicateFile = new Model({
          ...file.toObject(),
          _id: new mongoose.Types.ObjectId(),
          filename: file.filename ? file.filename + " (copy)" : undefined,
          name: file.name ? file.name + " (copy)" : undefined,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
        await duplicateFile.save();
        return res
          .status(200)
          .json({ message: "File duplicated successfully" });

      case "favorite":
        file.isFavorite = !file.isFavorite;
        await file.save();
        return res.status(200).json({
          message: `File ${
            file.isFavorite ? "favorited" : "unfavorited"
          } successfully`,
        });

      default:
        return res.status(400).json({ message: "Invalid action" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//favourte listing api
exports.getFavoriteFiles = async (req, res) => {
  try {
    const userId = req.user.id;

    const favoriteFolders = await Folder.find({ userId, isFavorite: true });
    const favoriteNotes = await Note.find({ userId, isFavorite: true });
    const favoriteImages = await Image.find({ userId, isFavorite: true });
    const favoritePdfs = await Pdf.find({ userId, isFavorite: true });

    res.status(200).json({
      favoriteFiles: [
        ...favoriteFolders,
        ...favoriteNotes,
        ...favoriteImages,
        ...favoritePdfs,
      ],
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//  Lock File API
exports.lockFile = async (req, res) => {
  try {
    let { fileId, fileType, lockPin } = req.body;

    if (!mongoose.Types.ObjectId.isValid(fileId)) {
      return res.status(400).json({ message: "Invalid file ID format" });
    }

    if (!lockPin || lockPin.toString().length !== 4) {
      return res
        .status(400)
        .json({ message: "Lock PIN must be a 4-digit number" });
    }

    fileId = new mongoose.Types.ObjectId(fileId);

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

    // Save PIN directly
    file.isLocked = true;
    file.lockPin = lockPin; // Save the 4-digit PIN directly
    await file.save();

    res.status(200).json({ message: "File locked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Unlock File API
exports.unlockFile = async (req, res) => {
  try {
    let { fileId, fileType, lockPin } = req.body;

    if (!mongoose.Types.ObjectId.isValid(fileId)) {
      return res.status(400).json({ message: "Invalid file ID format" });
    }

    if (!lockPin || lockPin.toString().length !== 4) {
      return res
        .status(400)
        .json({ message: "Unlock PIN must be a 4-digit number" });
    }

    fileId = new mongoose.Types.ObjectId(fileId);

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

    let file = await Model.findById(fileId).select("+lockPin");
    if (!file) return res.status(404).json({ message: "File not found" });

    // Check if file is locked
    if (!file.isLocked || !file.lockPin) {
      return res.status(400).json({ message: "This file is not locked" });
    }

    // Compare PIN directly
    if (lockPin !== file.lockPin) {
      return res.status(401).json({ message: "Incorrect PIN" });
    }

    // Unlock File
    file.isLocked = false;
    file.lockPin = null;
    await file.save();

    res.status(200).json({ message: "File unlocked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
