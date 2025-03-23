const express = require("express");
const {
  getUserFiles,
  getRecentFiles,
  fileAction,
} = require("../controllers/fileController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getUserFiles);
router.get("/recent", authMiddleware, getRecentFiles);
router.post("/action", authMiddleware, fileAction);

module.exports = router;
