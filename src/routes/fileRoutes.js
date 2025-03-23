const express = require("express");
const {
  getUserFiles,
  getRecentFiles,
  fileAction,
  getFavoriteFiles,
} = require("../controllers/fileController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getUserFiles);
router.get("/recent", authMiddleware, getRecentFiles);
router.post("/action", authMiddleware, fileAction);
router.get("/favorites", authMiddleware, getFavoriteFiles);

module.exports = router;
