const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4001;

// Routes
const videosRoute = require("./routes/videos/videos");
const usersRoute = require("./routes/users");

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));     
app.use(express.static("public"));
app.use(cors());

// Using routes
app.use("/", videosRoute);
app.use("/", usersRoute);

mongoose.connect("mongodb://localhost:27017/youtube_clone");

app.listen(PORT);