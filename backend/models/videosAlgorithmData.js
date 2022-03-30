const mongoose = require("mongoose");

const VideoAlgorithmDataSchema = new mongoose.Schema({
  video_id: {
    type: String,
    default: "",
    unique: true
  },
  viewsByDate: {
    type: Object,
    default: {
      [new Date()]: 0,
    }
  },
  watchTimes: {
    type: [{
      userId: {
        type: String,
        default: ""
      },
      watchTime: {
        type: Number,
        default: 0
      },
      timeMuted: {
        type: Number,
        default: 0
      },
      timesViewed: {
        type: Number,
        default: 0
      }
    }],
    default: []
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
})

const videoAlgorithmData = mongoose.model("videoAlgorithmData", VideoAlgorithmDataSchema);

module.exports = videoAlgorithmData;