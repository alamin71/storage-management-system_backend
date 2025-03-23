const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Connect with User

    parentFolder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      default: null,
    }, // Support sub-folder

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
      select: false, // do Query not show
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Folder", folderSchema);
