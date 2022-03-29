const express = require("express");

const router = express.Router();

router.get("/watch_time", (req, res) => {
  const watchTime = req.query.w_time;
  const video_id = req.query.v_id;

  res.status(200).send({watchTime, video_id});
})
module.exports = router;