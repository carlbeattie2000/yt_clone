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

router.post("/video_viewed", (req, res) => {
  console.log(req.body);

  const { v_id, valid_view } = req.body;

  if (valid_view == true) {
    videos.findOneAndUpdate({ v_id }, { $inc: {views: 1} }, {new: true}, (err) => {
      if (err) {
        return res.sendStatus(404);
      }
  
      return res.sendStatus(200);
    })
  } else {
    res.sendStatus(500);
  }
})

module.exports = router;