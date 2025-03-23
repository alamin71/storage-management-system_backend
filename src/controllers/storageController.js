const User = require("../models/userModel");

exports.getStorageSummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const totalStorage = 15 * 1024; // 15GB to MB
    const usedStorage = user.usedStorage || 0; // in MB
    const availableStorage = totalStorage - usedStorage; // in MB

    res.status(200).json({
      totalStorage: (totalStorage / 1024).toFixed(2) + " GB",
      usedStorage: (usedStorage / 1024).toFixed(2) + " GB",
      availableStorage: (availableStorage / 1024).toFixed(2) + " GB",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
