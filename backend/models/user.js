const mongoose = require("mongoose");

const UserModelSchema = new mongoose.Schema({
  full_name: {
    type: String,
    default: "",
    required: true
  },
  username: {
    type: String,
    default: "",
    required: true,
    unique: true
  },
  email: {
    type: String,
    default: "",
    required: true,
    unique: true
  },
  password: {
    type: String,
    default: "",
    required: true
  },
  passwordSalt: {
    type: String,
    default: "",
    required: true
  },
  profile_image: {
    type: String,
    default: ""
  },
  banner_image: {
    type: String,
    default: ""
  },
  subscribers: {
    type: Array,
    default: []
  },
  videos: {
    type: Array,
    default: []
  },
  playlists: {
    type: [
      {
        playlist_name: {
          type: String,
          default: ""
        },
        videos: {
          type: Array,
          default: []
        }
      }
    ],
    default: []
  },
  total_video_hours_uploaded: {
    type: Number,
    default: 0
  },
  verified_creator: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model("user", UserModelSchema);