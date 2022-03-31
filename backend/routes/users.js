const express = require("express");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../", "public/images"))
  },
  filename: (req, file, cb) => {
    const completedFileName = crypto.randomBytes(16).toString("hex") + "." + file.mimetype.split("/")[1]; 
    cb(null, completedFileName);
  }
})

const upload = multer({ storage: fileStorageEngine })

const userController = require("../controllers/userController");

const router = express.Router();

router.post("/register", upload.single("profileImage"), async (req, res) => {
  const userDetails = req.body;

  const profileImageName = req.file.filename || "";

  await userController.registerUser(userDetails, profileImageName, res);
})

module.exports = router;