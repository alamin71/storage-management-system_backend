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

// get user folders list API
exports.getUserFolders = async (req, res) => {
  try {
    const userId = req.user.id;
    const folders = await Folder.find({ userId });

    res.status(200).json({ folders });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
