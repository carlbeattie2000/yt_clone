export function handleWatchTimeTracking(e, v_id, v_length) {

  const videoTrackingData = JSON.parse(localStorage.getItem("v_t")) || {};

  if (!videoTrackingData.hasOwnProperty(v_id)) {

    videoTrackingData[v_id] = {
      "currentTime": 0,
      "watchTime": 0,
      "viewed": false
    }

  }

  videoTrackingData[v_id]["currentTime"] =  e.target.currentTime;

  if (parseFloat(videoTrackingData[v_id]["watchTime"] < v_length)) {
    let watchTime = parseFloat(videoTrackingData[v_id]["watchTime"]) + .3 || 0 + .3;

    videoTrackingData[v_id]["watchTime"] = watchTime;
  }

  localStorage.setItem("v_t", JSON.stringify(videoTrackingData));

  handleCheckingForValidView(v_id, v_length);

}

function handleCheckingForValidView(v_id, v_length) {

  const videoTrackingData = JSON.parse(localStorage.getItem("v_t")) || {};

  const totalWatchTime = parseFloat(videoTrackingData[v_id]["watchTime"]) || 0;

  if (totalWatchTime >= v_length) return

  if (videoTrackingData[v_id]["viewed"] == true) return

  if (totalWatchTime > v_length / 5) {

    videoTrackingData[v_id]["viewed"] = true;

    localStorage.setItem("v_t", JSON.stringify(videoTrackingData));

    sendValidViewRequest(v_id);

  } else {

    localStorage.setItem("v_t", JSON.stringify(videoTrackingData));

  }

}

export function getVideoCurrentTime(v_id) {

  const videoTrackingData = JSON.parse(localStorage.getItem("v_t")) || {}

  if (!videoTrackingData.hasOwnProperty(v_id)) {

    return 0

  }

  if (videoTrackingData[v_id].hasOwnProperty("currentTime")) {

    return parseFloat(videoTrackingData[v_id]["currentTime"])

  }

  return 0

}

async function sendValidViewRequest(v_id) {

  const videoTrackingData = JSON.parse(localStorage.getItem("v_t"));

  console.log("valid_view");

  const viewRequest = await fetch("http://192.168.0.3:4001/video_viewed", {

    headers: {
      'Accept': "application/json",
      'Content-Type': "application/json"
    },
    method: "POST",
    body: JSON.stringify({v_id, valid_view: videoTrackingData[v_id]["viewed"]})

  });

  const response = await viewRequest;
  
  return response.status;

}
