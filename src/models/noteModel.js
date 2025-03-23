const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    isLocked: {
      type: Boolean,
      default: false,
    },

    lockPin: {
      type: Number,
      minlength: 4,
      maxlength: 4,
      default: null,
      select: false, // Query করলে দেখাবে না
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
