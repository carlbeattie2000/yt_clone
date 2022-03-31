const videosModel = require("../models/video");
const videoAlgorithmicData = require("../models/videosAlgorithmData");

async function getRecommendVideos() {
  // Search the for all videos, grab the top viewed videos today and show them, if the user is not logged in
  const videosListSorted =  await videoAlgorithmicData.find({}, "video_id viewsByDate").then((docs) => {
    const dateNow = new Date();
    dateNow.setHours(0, 0, 0, 0);

    const foundVideos = docs.map(d => {
      return {[d.video_id]: d.viewsByDate[dateNow]}
    });

    return foundVideos.sort((a, b) => {
      const aValue = Object.values(a)[0];
      const bValue = Object.values(b)[0];

      if (aValue > bValue) {
        return -1;
      }

      if (aValue < bValue) {
        return 1;
      }

      return 0
    });
  })

  const ids = await videosListSorted.map((item) => {
    return Object.keys(item)[0]
  })

  const videos = await videosModel.find({
    v_id: {
      $in: ids
    }
  }).then((docs) => {
    return docs
  })

  return await videos.sort((a, b) => {
    if (ids.indexOf(a.v_id) < ids.indexOf(b.v_id)) {
      return -1;
    }

    if (ids.indexOf(a.v_id) > ids.indexOf(b.v_id)) {
      return 1;
    }

    return 0
  })
}

async function getVideo(v_id) {

  return await videosModel.findOne({ v_id }).then((doc) => {

    const dateNow = new Date();
    dateNow.setHours(0, 0, 0, 0);

    const updateQuery = `viewsByDate.${dateNow}`;

    videoAlgorithmicData.findOneAndUpdate({ video_id: v_id }, {$inc: {[updateQuery]: 1}}).select("viewsByDate")
    .then()
    .catch((err) => {
      if (err) throw new Error(err);
    })

    return doc
  })
}

// function createAlgo() {
//   videosModel.find({}, (err, docs) => {
//     docs.forEach((d) => {

//       const dateNow = new Date();
//       dateNow.setHours(0, 0, 0, 0);

//       const algoData = {
//         video_id: d.v_id,
//         viewsByDate: {
//           [dateNow]: 0
//         },
//         likesByDate: {
//           [dateNow]: 0
//         },
//         averageWatchTime: 0,
//         watchTimes: []
//       }

//       videoAlgorithmicData.insertMany([algoData]);

//     });
//   })
// }

// createAlgo();

module.exports = {
  getVideo,
  getRecommendVideos
}