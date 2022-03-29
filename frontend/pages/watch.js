import LayoutLarge from "./layoutLarge";
import { useState } from "react";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";

export const getServerSideProps = async (context) => {
  const v_id = context.query.v;
  
  const videoRequest = await fetch(`http://localhost:4001/video_details?v_id=${v_id}`);

  const videoResponse = await videoRequest.json();
  
  return {
    props: {
      videoResponse
    }
  }
}

export default function WatchVideo({ videoResponse }) {
  const router = useRouter();

  const [watchTime, setWatchTime] = useState(0);

  function handleVideoWatchTimeTracking(e) {

    const v_id = router.query.v;

    setWatchTime(watchTime + .3);

    cookieCutter.set(v_id+"_videoCurrentTime", e.target.currentTime);

    handleCheckingForValidView(v_id);

  }

  function handleCheckingForValidView(v_id) {

    const videoPlayedLength = parseFloat(cookieCutter.get(v_id));

    if (videoPlayedLength >= videoResponse.length) {
      return
    }

    cookieCutter.set(v_id, Math.round(watchTime * 100) / 100);

    if (cookieCutter.get(v_id+"viewed")) {
      return
    }

    if (videoPlayedLength > (videoResponse.length / 2)) {
      // valid view
      cookieCutter.set(v_id+"viewed", true);
    }

  }

  return (
    <LayoutLarge>
      <section className="video-box">
        <video controls autoPlay onTimeUpdate={(e) => handleVideoWatchTimeTracking(e)}>
          <source src={`http://localhost:4001/video_content/videos/${videoResponse.v_id}.mp4`}></source>
        </video>
      </section>
    </LayoutLarge>
  )
}