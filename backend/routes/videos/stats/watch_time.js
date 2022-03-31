const express = require("express");

const router = express.Router();

const videoTrackingModel = require("../../../controllers/stats/videoTrackingController");

function getClientIPv4Address(req) {
  return req.ip.split(":").pop();
}

router.get("/watch_time", (req, res) => {
  const watchTime = req.query.w_time;
  const video_id = req.query.v_id;
  const muted = req.query.muted;
  const autoPlay = req.query.a_play;
  const networkStatus = req.query.n_status;
  const paused = req.query.paused;
  const time = req.query.time;

  const userData = {
    id: getClientIPv4Address(req),
    watchTime: watchTime,
    videoId: video_id
  }

  videoTrackingModel.updateViewerWatchTime(userData);

  res.sendStatus(202);
})

router.get("/video_avg_w_time", async (req, res) => {

  const v_id = req.query.v_id;

  const data = await videoTrackingModel.getVideoAverageViewTime(v_id);

  res.send(data);
})

// router.get("/t", (req, res) => {
//   const videos = require("../../../models/video");
//   const v_alog = require("../../../models/videosAlgorithmData");
//   const crypto = require("crypto");

//   videos.find({}, async (err, docs) => {
//     let document = {};
//     let videoWatchTimes = [];

//     for (let doc of docs) {
//       const videosWatchTimesToAdd = Math.floor(Math.random() * 120000);

//       console.log("doc started creating", videosWatchTimesToAdd);

//       for (let i = 0; i < videosWatchTimesToAdd; i++) {

//         const randomWatchTime = Math.random() * doc.length;
//         const randomId = crypto.randomBytes(16).toString("hex");

//         const videoWatchTimeObject = {
//           userId: randomId,
//           watchTime: randomWatchTime
//         }

//         videoWatchTimes.push(videoWatchTimeObject)

//       }

//       document = {
//         video_id: doc.v_id,
//         watchTimes: videoWatchTimes
//       }

//       await v_alog.insertMany([document]);

//       document = null
//       videoWatchTimes = null;

//       document = [];
//       videoWatchTimes = [];

//       console.log("document pushed to mongodb");
//     }
//   })

//   res.send({done: true});
// })

module.exports = router;