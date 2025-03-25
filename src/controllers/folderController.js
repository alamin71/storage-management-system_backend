const Folder = require("../models/folderModel");

// Create folder API
exports.createFolder = async (req, res) => {
  try {
    const { name, parentFolder } = req.body;
    const userId = req.user.id;

    if (!name) {
      return res.status(400).json({ message: "Folder name is required" });
    }

    const newFolder = new Folder({ name, userId, parentFolder });
    await newFolder.save();

    res
      .status(201)
      .json({ message: "Folder created successfully", folder: newFolder });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// get user folders list API without middleware
exports.getUserFolders = async (req, res) => {
  try {
    const folders = await Folder.find();
    res.status(200).json({ folders });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete folder API
exports.deleteFolder = async (req, res) => {
  try {
    const folderId = req.params.id;
    const userId = req.user.id;

    // Check if the folder exists
    const folder = await Folder.findOne({ _id: folderId, userId });
    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    // Delete the folder
    await Folder.deleteOne({ _id: folderId });

    res.status(200).json({ message: "Folder deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
