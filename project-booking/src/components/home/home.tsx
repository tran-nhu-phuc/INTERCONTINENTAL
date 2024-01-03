import ContentBookingRoom from "./content-booking-room/booking-room";
import ContentHealth from "./content-health/content-health";
import ContentHome from "./content-home/content-home";
import ContentRoom from "./content-room/content-room";
import IntroductoryContent from "./introductory-content/introductory";
import "./home.css";
import VideoYoutube from "./video-youtube/video-youtube";
import Carousels from "./carousel/carousel";

const Home = () => {
  return (
    <main>
      <ContentHome />
      <ContentRoom />
      <VideoYoutube />
      <ContentHealth />
      <Carousels />
      <IntroductoryContent />
      <ContentBookingRoom />
    </main>
  );
};
export default Home;
