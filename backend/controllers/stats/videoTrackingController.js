// TODO:: See if using some kind of relations will speed up the query to average the watch time for a video.

const viewerVideoStatsModel = require("../../models/stats/videos/viewsVIdeoStats");

function updateViewerWatchTime({ id, watchTime, videoId }) {

  viewerVideoStatsModel.findOneAndUpdate({ userId: id, videoId: videoId }, { watchTime }, (err, doc) => {
    if (!doc) {
      const newViewerStatsModel = {
        userId: id,
        videoId: videoId,
        watchTime: watchTime,
        timeMuted: 0,
        timesViewed: 0
      }

      viewerVideoStatsModel.insertMany([newViewerStatsModel]);

    }

  })

}

function randomId() {
  const crypto = require("crypto");

  return crypto.randomBytes(16).toString("hex");
}

async function generateRandomVideoViewingStats(video_id, amount) {
  const videoModel = require("../../models/video");

  const videoData = await videoModel.findOne({ v_id: video_id });
  const videoLength = await videoData.length;

  const documents = [];

  const startTime = Date.now();

  for (let i = 0; i < amount; i++) {
    const randomViewTime = Math.random() * videoLength;

    const newViewStatObject = {
      userId: randomId(),
      videoId: video_id,
      watchTime: randomViewTime,
      timeMuted: 0,
      timesViewed: 0
    }

    documents.push(newViewStatObject);
  }

  await viewerVideoStatsModel.insertMany(documents);

  console.log("took", (Date.now() - startTime) / 1000, "s");
}

async function getVideoAverageViewTime(v_id) {
  const start = Date.now();

  const foundVideos = await viewerVideoStatsModel.find({ videoId: v_id }).lean().select({watchTime: 1});

  const totalWatchTime = foundVideos.reduce((a, b) => {
    return a + b.watchTime
  }, 0)

  return {
    video_id: v_id,
    totalWatchTimeInHours: Math.round((totalWatchTime / 3600) * 100) / 100,
    averageWatchTimeInHours: Math.round(((totalWatchTime / foundVideos.length) / 3600) * 100) / 100,
    searchTookInSeconds: (Date.now() - start) / 1000
  };
}

module.exports = {
  updateViewerWatchTime,
  getVideoAverageViewTime,
  generateRandomVideoViewingStats
}