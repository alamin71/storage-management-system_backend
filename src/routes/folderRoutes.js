const express = require("express");
const {
  createFolder,
  getUserFolders,
} = require("../controllers/folderController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createFolder);
router.get("/", authMiddleware, getUserFolders);

module.exports = router;
