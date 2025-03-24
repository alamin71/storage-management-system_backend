// const mongoose = require("mongoose");

// const imageSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User", // User collection- reference
//       required: true,
//     },
//     filename: {
//       type: String,
//       required: true,
//     },
//     path: {
//       type: String,
//       required: true,
//     },
//     mimetype: {
//       type: String,
//       required: true,
//     },
//     size: {
//       type: Number,
//       required: true,
//     },
//     uploadedAt: {
//       type: Date,
//       default: Date.now,
//     },
//     isFavorite: {
//       type: Boolean,
//       default: false,
//     },
//     isLocked: {
//       type: Boolean,
//       default: false,
//     },

//     lockPin: {
//       type: Number,
//       minlength: 4,
//       maxlength: 4,
//       default: null,
//       select: false, // do Query not show
//     },
//   },
//   { timestamps: true }
// );

// const Image = mongoose.model("Image", imageSchema);
// module.exports = Image;
const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // User collection- reference
      required: true,
    },
    cloudinaryId: {
      // Cloudinary image er unique ID store korbe
      type: String,
      required: true,
    },
    url: {
      // Cloudinary image er URL store korbe
      type: String,
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
    mimetype: {
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
      select: false, // do Query not show
    },
  },
  { timestamps: true }
);

const Image = mongoose.model("Image", imageSchema);
module.exports = Image;
