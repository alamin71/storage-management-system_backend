const express = require("express");
const router = express.Router();
const {
  createNote,
  getAllNotes,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");
const authMiddleware = require("../middleware/authMiddleware");

// Note Create Route (POST /api/notes)
router.post("/", authMiddleware, createNote);
// Get All Notes Route (GET /api/notes)
router.get("/", authMiddleware, getAllNotes);
// Update Note Route (PUT /api/notes/:id)
router.put("/:id", authMiddleware, updateNote);
// Delete Note Route (DELETE /api/notes/:id)
router.delete("/:id", authMiddleware, deleteNote);

module.exports = router;
