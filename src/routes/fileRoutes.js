const express = require("express");
const {
  getUserFiles,
  getRecentFiles,
  fileAction,
  getFavoriteFiles,
  lockFile,
  unlockFile,
} = require("../controllers/fileController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getUserFiles);
router.get("/recent", authMiddleware, getRecentFiles);
router.post("/action", authMiddleware, fileAction);
router.get("/favorites", authMiddleware, getFavoriteFiles);
router.post("/lock", authMiddleware, lockFile);
router.post("/unlock", authMiddleware, unlockFile);

module.exports = router;
