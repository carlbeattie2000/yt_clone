const mongoose = require("mongoose");

const VideoAlgorithmDataSchema = new mongoose.Schema({
  video_id: {
    type: String,
    default: ""
  },
  viewsByDate: {
    type: Object,
    default: {
      [new Date()]: 0,
    }
  },
  likesByDate: {
    type: Object,
    default: {
      [new Date()]: 0,
    }
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

const videoAlgorithmData = mongoose.model("videoAlgorithmData", VideoAlgorithmDataSchema);

module.exports = videoAlgorithmData;