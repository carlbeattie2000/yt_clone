// TODO:: See if using some kind of relations will speed up the query to average the watch time for a video.

const videoAlgoModel = require("../../models/videosAlgorithmData");

async function updateViewerWatchTime({ id, watchTime, videoId }) {
  const viewerTrackingData = {
    userId: id,
    watchTime: watchTime,
    timeMuted: 0,
    timesViewed: 0
  }

  videoAlgoModel.findOneAndUpdate(
    { video_id: videoId, 
      "watchTimes": 
      { "$elemMatch": { "userId": id } } 
    },
    {
      "$set": { "watchTimes.$.watchTime": watchTime }
    })
    .then( async (err, doc) => {
      if (err) console.error(err);

      if (doc == undefined) {

        videoAlgoModel.findOneAndUpdate(
          { video_id: videoId }, 
          { $push: { watchTimes: viewerTrackingData } })
          .then()
          .catch(console.log)

      }
    })
}

async function getVideoAverageViewTime(v_id) {
  const foundData = await videoAlgoModel.findOne({ video_id: v_id }, "watchTimes").lean();

  const average = foundData["watchTimes"].reduce((a, b) => {
    return a + b.watchTime
  }, 1);

  return await {
    avg: Math.round(((average / foundData["watchTimes"].length) / 3600) * 100) / 100,
    resultsFound: foundData["watchTimes"].length
  };
}

module.exports = {
  updateViewerWatchTime,
  getVideoAverageViewTime,
}