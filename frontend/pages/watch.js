import LayoutLarge from "./layoutLarge";

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
  return (
    <LayoutLarge>
      <section className="video-box">
        <video controls autoPlay>
          <source src={`http://localhost:4001/video_content/videos/${videoResponse.v_id}.mp4`}></source>
        </video>
      </section>
    </LayoutLarge>
  )
}