const express = require("express");
const { getUserFiles } = require("../controllers/fileController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getUserFiles);

module.exports = router;
