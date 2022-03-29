import LayoutLarge from "./layoutLarge";
import { useState, useEffect } from "react";
import { handleWatchTimeTracking, getVideoCurrentTime } from "../utils/videoTracking";
import formatNumber from "../utils/formatNumber";
import { formattedDate } from "../utils/timeFunctions";
import styles from "../static/styles/watch.module.scss";

export const getServerSideProps = async (context) => {
  const v_id = context.query.v;
  
  const videoRequest = await fetch(`http://192.168.0.3:4001/video_details?v_id=${v_id}`);

  const videoResponse = await videoRequest.json();
  
  return {
    props: {
      videoResponse
    }
  }
}

export default function WatchVideo({ videoResponse }) {
  
  const [currentVideoTime, setCurrentVideoTime] = useState(0);

  useEffect(() => {
    setCurrentVideoTime(getVideoCurrentTime(videoResponse.v_id));
  }, []);

  

  return (
    <LayoutLarge>
      <section className={styles.video_box}>
        <div className={styles.video_container}>
          <video
            key={videoResponse.v_id}
            controls
            preload="auto"
            onTimeUpdate={(e) => handleWatchTimeTracking(e, videoResponse.v_id, videoResponse.length)}
            onLoadedMetadata={(e) => {
              e.target.currentTime = currentVideoTime
            }}
            >
            <source src={`http://192.168.0.3:4001/video_content/videos/${videoResponse.v_id}.mp4`}></source>
          </video>
          <div className={styles.video_details}>
            <div className={styles.video_main_details}>
              <div className={styles.video_main_details__keywords_box}>
                <p>#house #build #gaming</p>
              </div>
              <div className={styles.video_main_details__video_title}>
                <p>{videoResponse.title}</p>
              </div>
              <div className={styles.video_main_details__video_sub_details}>
                <div className={styles.video_main_details__video_sub_details__stats}>
                  <div>
                    <p>{formatNumber(videoResponse.views)} views</p>
                  </div>

                  <div>
                    <p>{formattedDate(videoResponse.uploaded)}</p>
                  </div>
                </div>
                <div className={styles.video_main_details__video_sub_details__actions}>
          
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LayoutLarge>
  )
}