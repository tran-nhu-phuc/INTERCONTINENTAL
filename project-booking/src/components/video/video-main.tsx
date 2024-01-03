import Search from "./search-main/search-main";
import "./video-main.css";
const VideoMain = () => {
  return (
    <section className="video-hotel">
      <article className="video">
        <video autoPlay>
          <source
            src="/asset/video-header-home/video-home-1.mp4"
            type="video/mp4"
          />
          <source
            src="/asset/video-header-home/video-home-1.mp4"
            type="video/ogg"
          />
        </video>
      </article>
      <Search />
    </section>
  );
};
export default VideoMain;
