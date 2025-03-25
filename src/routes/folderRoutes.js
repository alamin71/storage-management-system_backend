const express = require("express");
const {
  createFolder,
  getUserFolders,
  deleteFolder,
} = require("../controllers/folderController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createFolder);
router.get("/", getUserFolders);
router.delete("/:id", authMiddleware, deleteFolder);

module.exports = router;
