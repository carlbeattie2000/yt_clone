const mongoose = require("mongoose");

const ViewerVideoStatsSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: ""
  },
  videoId: {
    type: String,
    default: "",
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
})

ViewerVideoStatsSchema.index({ videoId: -1 })

const viewerVideoStats = mongoose.model("viewerVideoStats", ViewerVideoStatsSchema);

module.exports = viewerVideoStats;


// If use is not logged in
// on query, check if they already have been tracked
// if they have not, create a new document
// if they have, update the values