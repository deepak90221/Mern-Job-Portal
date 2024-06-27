const path = require("path");
const multer = require("multer");

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: "./public/uploads/", // Adjust as needed
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB limit (adjust as needed)
}).single("myImage"); // Adjust field name if different

const UploadController = async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error("Error uploading file:", err);
      return res.status(500).json({ message: "Error uploading file" });
    }

    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);

    // Handle the uploaded file (e.g., store metadata, process further)

    res.status(200).json({ message: "File uploaded successfully" });
  });
};

module.exports = UploadController;
