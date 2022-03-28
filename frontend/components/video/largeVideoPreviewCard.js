import styles from "../../static/styles/components/video/largeVideoPreviewCard.module.scss"

import convertSecondsIntoAppropriateFormat from "../../utils/dataToSeconds";
import formatNumber from "../../utils/formatNumber";
import { timeSinceDate } from "../../utils/timeFunctions";

export default function LargeVideoPreviewCard({ thumbnailSrc, title, author, views, uploaded, length }) {

  const secondsIntoCorrectFormat = convertSecondsIntoAppropriateFormat(length);
  const viewCountIntoCorrectFormat = formatNumber(views);

  const uploadedTimeCorrectFormat = timeSinceDate(uploaded);

  return (
    <div className={styles.large_image_preview_card}>
      <div className={styles.large_image_preview_card__thumbnail}>
        <img src={`http://localhost:4001/video_content/images/${thumbnailSrc}`} alt="thumbnail" />

        <p className={styles.thumbnail__video_length}>{secondsIntoCorrectFormat}</p>
      </div>

      <div className={styles.details}>
        <p className={styles.details__video_title}>{title}</p>
        <p className={styles.details__video_author}>{author}</p>

        <div className={styles.details__video_stats}>
          <p className={styles.details__video_stats__views}>{viewCountIntoCorrectFormat} views</p>
          <p className={styles.details__video_stats__date_uploaded}>{uploadedTimeCorrectFormat}</p>
        </div>
      </div>
    </div>
  )
}