import express from "express";
import { PORT, mongoURL } from "./config.js";
import mongoose from "mongoose";
import { Item } from "./models/itemModel.js"; // Ensure this path is correct
import cors from "cors";
import { createRequire } from "module";
import multer from "multer";
import fs from "fs";
import path from "path";

const require = createRequire(import.meta.url); // To use require for multer
const app = express();
app.use(express.json());
app.use(cors());
app.use('/files', express.static("files")); // Serve static files from the "files" directory

//================================================== multer ==============================================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files"); // Upload destination
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now(); // Create unique file names
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

// ============================== GET all items =================================
app.get("/item", async (req, res) => {
  try {
    const items = await Item.find({});
    return res.status(200).json({
      count: items.length,
      data: items,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// =============================== POST item ====================================
app.post("/item", upload.single("file"), async (req, res) => {
  console.log(req.file);
  try {
    // Validate request body
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.phoneno ||
      !req.body.title ||
      !req.body.description
    ) {
      return res.status(400).send({ message: "All fields are required." });
    }

    const newItem = {
      name: req.body.name,
      email: req.body.email,
      phoneno: req.body.phoneno,
      title: req.body.title,
      description: req.body.description,
      image: req.file.filename, // Store the uploaded image filename
    };
    const item = await Item.create(newItem);
    return res.status(200).send(item);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating item");
  }
});

// ============================== GET item by ID =================================
app.get("/item/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).send({ message: "Item not found" });
    }
    return res.status(200).json(item);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// ================================ DELETE item ==================================
app.delete("/item/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).send({ message: "Item not found" });
    }
    
    // Construct the path to the image file to delete
    const imagePath = path.join(process.cwd(), 'files', item.image);
    
    // Delete image file
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ message: "Error deleting image" });
      } else {
        console.log(`Deleted image: ${item.image}`);
      }
    });

    // Delete the item from the database
    await Item.findByIdAndDelete(id);
    return res.status(200).send({ message: "Item deleted" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// ================================ Server Setup =================================
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

// =============================== MongoDB Connection ============================
mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log(error);
  });
