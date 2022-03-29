import LargeVideoPreviewCard from "../components/video/largeVideoPreviewCard";
import Layout from "./layout"
import styles from "../static/styles/index.module.scss";
import Link from "next/link";

export const getServerSideProps = async (context) => {
  const videosRequests = await fetch("http://192.168.0.3:4001/recommend_videos");

  const videosResponse = await videosRequests.json();

  return {
    props: {
      videosResponse
    }
  }
}

export default function Home({ videosResponse }) {
  return (
    <Layout>
      <section className={styles.videos_preview_container}>
        {videosResponse.map(video => {
          return (
            <Link href={{ pathname: "/watch", query: { v: video.v_id } }}>
              <a>
                <LargeVideoPreviewCard 
                  v_id={video.v_id}
                  thumbnailSrc={video.v_id+".jpg"} 
                  title={video.title}
                  author={video.author}
                  views={video.views}
                  uploaded={video.uploaded}
                  length={video.length}
                   />
              </a>
            </Link>
          )
        })}
      </section>
    </Layout>
  )
}