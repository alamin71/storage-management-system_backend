const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
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

const PDF = mongoose.model("PDF", pdfSchema);
module.exports = PDF;
