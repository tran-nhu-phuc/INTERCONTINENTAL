import "./video-youtube.css";
const VideoYoutube = () => {
  return (
    <section className="video-iframe">
      <iframe
        width={1280}
        height={720}
        src="https://www.youtube.com/embed/-ujKdRnRmOs"
        title="What Do Our Guests Love About Their Stay? InterContinental Danang Sun Peninsula Resort"
        frameBorder={0}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      />
    </section>
  );
};
export default VideoYoutube;
