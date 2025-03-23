const express = require("express");
const { getStorageSummary } = require("../controllers/storageController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/summary", authMiddleware, getStorageSummary);

module.exports = router;
