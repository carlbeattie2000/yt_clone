const mongoose = require("mongoose");

const VideoAlgorithmDataSchema = new mongoose.Schema({
  video_id: {
    type: String,
    default: ""
  },
  viewsByDate: {
    type: Object,
    default: {}
  },
  likesByDate: {
    type: Object,
    default: {}
  },
  averageWatchTime: {
    type: Number,
    default: 0
  },
  watchTimes: {
    type: Array,
    default: []
  }
})

const videoAlgorithmData = mongoose.Model("videoAlgorithmData", VideoAlgorithmDataSchema);

module.exports = videoAlgorithmData;