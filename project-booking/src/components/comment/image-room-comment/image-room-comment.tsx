import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Carousel from "nuka-carousel";
import "./image-room-comment.css";
interface CustomButtonProps {
  onClick: () => void;
}

const CustomPrevButton: React.FC<CustomButtonProps> = ({ onClick }) => (
  <button onClick={onClick} className="custom-btn-slide-item-room-booking">
    .
    <FaChevronLeft />
  </button>
);

const CustomNextButton: React.FC<CustomButtonProps> = ({ onClick }) => (
  <button onClick={onClick} className="custom-btn-slide-item-room-booking">
    .
    <FaChevronRight />
  </button>
);
const ImageRoomComment = () => {
  const carouselSettings = {
    autoplay: true,
    wrapAround: true,
  };
  return (
    <div className="table-image-room-comment">
      <Carousel
        className="list-image-slide-comment"
        renderCenterLeftControls={({
          previousSlide,
        }: {
          previousSlide: () => void;
        }) => <CustomPrevButton onClick={previousSlide} />}
        renderCenterRightControls={({
          nextSlide,
        }: {
          nextSlide: () => void;
        }) => <CustomNextButton onClick={nextSlide} />}
        {...carouselSettings}
      >
        <img
          src="https://th.bing.com/th/id/OIP.mgQVVNp8IA-OHcuKbUofewHaFP?rs=1&pid=ImgDetMain"
          alt="slide"
        ></img>
        <img
          src="https://th.bing.com/th/id/OIP.mgQVVNp8IA-OHcuKbUofewHaFP?rs=1&pid=ImgDetMain"
          alt="slide"
        ></img>
        <img
          src="https://th.bing.com/th/id/OIP.mgQVVNp8IA-OHcuKbUofewHaFP?rs=1&pid=ImgDetMain"
          alt="slide"
        ></img>
        <img
          src="https://th.bing.com/th/id/OIP.mgQVVNp8IA-OHcuKbUofewHaFP?rs=1&pid=ImgDetMain"
          alt="slide"
        ></img>
      </Carousel>
    </div>
  );
};
export default ImageRoomComment;
