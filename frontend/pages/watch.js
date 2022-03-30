import LayoutLarge from "./layoutLarge";
import { useState, useEffect } from "react";
import { handleWatchTimeTracking, getVideoCurrentTime, updateVideoServerWatchTime } from "../utils/videoTracking";
import formatNumber from "../utils/formatNumber";
import { formattedDate } from "../utils/timeFunctions";
import { MdThumbUpOffAlt, MdThumbDownOffAlt, MdOutlineShortcut, MdOutlineContentCut, MdPlaylistAdd, MdMoreHoriz } from "react-icons/md";
import styles from "../static/styles/watch.module.scss";
import DefaultButton from "../components/defaultButton";

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
  const [videoWatchTime, setVideoWatchTime] = useState(0);

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
            onTimeUpdate={(e) => {
              handleWatchTimeTracking(e, videoResponse.v_id, videoResponse.length)
            }}
            onLoadedMetadata={(e) => {
              e.target.currentTime = currentVideoTime;

              setInterval(() => {
                updateVideoServerWatchTime(e, videoResponse.v_id);
              }, 16000)
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
                  <button>
                    <MdThumbUpOffAlt />
                  </button>

                  <button>
                    <MdThumbDownOffAlt />
                  </button>

                  <button>
                    <MdOutlineShortcut />
                    share
                  </button>

                  <button>
                    <MdOutlineContentCut />
                    clip
                  </button>

                  <button>
                    <MdPlaylistAdd />
                    save
                  </button>

                  <button>
                    <MdMoreHoriz />
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.video_an_author_details}>
              <div className={styles.video_an_author_details__author}>
                <div className={styles.video_an_author_details__author__profile_pic}>
                  <img src="https://yt3.ggpht.com/ytc/AKedOLR0zi-u_OId7UDDROmBzKbaQwUhuXR-K7fhDACv=s48-c-k-c0x00ffffff-no-rj" alt="profile_pic" />
                </div>

                <div className={styles.video_an_author_details__author__details}>
                  <p className={styles.video_an_author_details__author__details__name}>
                    {videoResponse.author}
                  </p>

                  <p className={styles.video_an_author_details__author__details__subscribers}>
                    {formatNumber(Math.floor(Math.random() * 500000))} subscribers
                  </p>
                </div>

                <div className={styles.video_an_author_details__author__actions}>
                  <DefaultButton
                    text="SUBSCRIBE" 
                    bg_color="#cc0000" 
                    br_color="transparent" 
                    f_color="#fff" 
                    br=".2rem" />
                </div>
              </div>

              <div className={styles.video_an_author_details__description}>
                <div></div>

                <div className={styles.video_an_author_details__description__content}>
                  <p>{videoResponse.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LayoutLarge>
  )
}