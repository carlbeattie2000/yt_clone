const express = require("express");

const router = express.Router();

const videoTrackingModel = require("../../../controllers/stats/videoTrackingController");

function getClientIPv4Address(req) {
  return req.ip.split(":").pop();
}


// for (let i = 0; i < 200000; i++) {
//   videoTrackingModel.generateRandomVideoViewingStats("7c0243321b4e4b52a499b231c5115d6e");
// }

videoTrackingModel.generateRandomVideoViewingStats("9e03dd54ea2741298af319683dee206a", 55000);


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

module.exports = router;