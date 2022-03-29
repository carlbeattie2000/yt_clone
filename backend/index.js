const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4001;

// Routes
const videosRoute = require("./routes/videos/videos");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());     
app.use(express.static("public"));
app.use(cors());

// Using routes
app.use("/", videosRoute);

mongoose.connect("mongodb://localhost:27017/youtube_clone");

app.listen(PORT);