const cloudinary = require("./cloudinaryConfig"); // Import Cloudinary Config

// Upload function (Buffer Support)
const uploadToCloudinary = (
  fileBuffer,
  folder = "uploads",
  resourceType = "auto"
) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(fileBuffer); // Buffer send korbe
  });
};

module.exports = uploadToCloudinary;
