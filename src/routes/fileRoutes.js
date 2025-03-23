const express = require("express");
const {
  getUserFiles,
  getRecentFiles,
  fileAction,
  getFavoriteFiles,
  lockFile,
  unlockFile,
  getFilesByDate,
} = require("../controllers/fileController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getUserFiles);
router.get("/recent", authMiddleware, getRecentFiles);
router.post("/action", authMiddleware, fileAction);
router.get("/favorites", authMiddleware, getFavoriteFiles);
router.post("/lock", authMiddleware, lockFile);
router.post("/unlock", authMiddleware, unlockFile);
// Get Files by Date API
router.get("/by-date", authMiddleware, getFilesByDate);

module.exports = router;
