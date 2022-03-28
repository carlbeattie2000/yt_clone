const mongoose = require("mongoose");
const crypto = require("crypto");

const UploadSchema = new mongoose.Schema({
  title: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  channel_id: {
    type: String,
    default: ""
  },
  views: {
    type: Number,
    default: 0
  },
  author: {
    type: String,
    default: 0
  },
  length: {
    type: String,
    default: 0
  },
  uploaded: {
    type: Date,
    default: Date.now()
  },
  v_id: {
    type: String,
    default: ""
  },
  mime_type: {
    type: String,
    default: ""
  },
  filesize: {
    type: Number,
    default: 0
  },
})

const upload = mongoose.model("upload", UploadSchema);

module.exports = upload;