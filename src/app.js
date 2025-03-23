const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const folderRoutes = require("./routes/folderRoutes");
const noteRoutes = require("./routes/noteRoutes");
const imageRoutes = require("./routes/imageRoutes");
const pdfRoutes = require("./routes/pdfRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Enable CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/users", authRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/pdfs", pdfRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Storage Management System is Running!");
});

module.exports = app;
