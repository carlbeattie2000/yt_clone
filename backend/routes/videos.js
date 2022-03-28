const express = require("express");

const router = express.Router();

const videos = require("../models/video");

router.get("/recommend_videos", (req, res) => {
  videos.find({}, (err, docs) => {
    res.send(docs);
  })
})

router.get("/video_details", (req, res) => {
  const v_id = req.query.v_id;

  videos.findOne({ v_id: v_id }, (err, doc) => {
    res.send(doc);
  })
})

module.exports = router;