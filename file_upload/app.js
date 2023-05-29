import express from "express";
import multer from "multer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set up the multer storage configuration
const storage = multer.diskStorage({
  destination: join(__dirname, "uploads/"),
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage }); // Destination folder and filename for uploaded files

app.post("/upload", upload.single("myFile"), function(req, res) {
  if (!req.file) {
    res.status(400).send("No file uploaded.");
    return;
  }
  
  const originalName = req.file.originalname;
  const mimeType = req.file.mimetype;
  const size = req.file.size;
  const filePath = req.file.path;

  // Handle or process the uploaded file

  res.send("File uploaded successfully.");
});

app.post("/test-upload", upload.single("myFile"), function(req, res) {
  if (!req.file) {
    res.status(400).send("No file uploaded.");
    return;
  }

  const originalName = req.file.originalname;
  const mimeType = req.file.mimetype;
  const size = req.file.size;
  const filePath = req.file.path;

  // Move the uploaded file to the desired location
  const destinationPath = join(__dirname, "uploads/test.jpg");
  req.file.destination = __dirname + "/"; // Update the destination to the current directory
  req.file.path = destinationPath;

  // Move the file to the desired location
  req.file.mv(req.file.path, function(err) {
    if (err) {
      console.error(err);
      res.status(500).send("Error occurred while moving the file.");
    } else {
      res.send("File uploaded successfully.");
    }
  });
});

// Serve static files from the "public" directory
app.use(express.static(join(__dirname, "public")));

app.listen(3000, function() {
  console.log("Server listening on port 3000");
});
