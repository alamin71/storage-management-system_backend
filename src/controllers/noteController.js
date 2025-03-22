const Note = require("../models/noteModel");

// Add Note API (POST /api/notes)
exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const note = new Note({
      user: req.user.id, // userId from middleware
      title,
      content,
    });

    await note.save();
    res.status(201).json({ message: "Note created successfully", note });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// Get All Notes (GET /api/notes)
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      message: "Notes fetched successfully",
      notes,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// Update Note (PUT /api/notes/:id)
exports.updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const noteId = req.params.id;

    // find note
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // check note by authorized user
    if (note.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this note" });
    }

    // note update
    note.title = title || note.title;
    note.content = content || note.content;
    note.updatedAt = Date.now();
    await note.save();

    res.status(200).json({
      message: "Note updated successfully",
      note,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// Delete Note API (DELETE /api/notes/:id)
exports.deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;

    // find note
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // check note by authorized user
    if (note.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this note" });
    }

    // Delete note
    await note.deleteOne();

    res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
