import styles from "../../static/styles/components/video/largeVideoPreviewCard.module.scss";
import convertSecondsIntoAppropriateFormat from "../../utils/dataToSeconds";
import formatNumber from "../../utils/formatNumber";
import { timeSinceDate } from "../../utils/timeFunctions";
import cookie from "cookie-cutter";
import { useEffect, useState } from "react";

export default function LargeVideoPreviewCard({
  v_id,
  thumbnailSrc,
  title,
  author,
  views,
  uploaded,
  length,
}) {
  const [videoWatchedTime, setVideoWatchTime] = useState(0);

  const secondsIntoCorrectFormat = convertSecondsIntoAppropriateFormat(length);
  const viewCountIntoCorrectFormat = formatNumber(views);

  const uploadedTimeCorrectFormat = timeSinceDate(uploaded);

  useEffect(() => {
    let videoTimeWatched = parseFloat(cookie.get(v_id + "_videoCurrentTime") * 100) / 100 || 0;

    videoTimeWatched = Math.round(videoTimeWatched /  length * 100) / 100;


    setVideoWatchTime(videoTimeWatched * 100);
  }, []);

  return (
    <div className={styles.large_image_preview_card}>
      <div className={styles.large_image_preview_card__thumbnail}>
        <img
          src={`http://localhost:4001/video_content/images/${thumbnailSrc}`}
          alt="thumbnail"
        />

        <p className={styles.thumbnail__video_length}>
          {secondsIntoCorrectFormat}
        </p>

        {videoWatchedTime ? <progress
          value={videoWatchedTime}
          max="100"
          className={styles.thumbnail__video_viewedTime}
        ></progress> : ""}
      </div>

      <div className={styles.details}>
        <p className={styles.details__video_title}>{title}</p>
        <p className={styles.details__video_author}>{author}</p>

        <div className={styles.details__video_stats}>
          <p className={styles.details__video_stats__views}>
            {viewCountIntoCorrectFormat} views
          </p>
          <p className={styles.details__video_stats__date_uploaded}>
            {uploadedTimeCorrectFormat}
          </p>
        </div>
      </div>
    </div>
  );
}
