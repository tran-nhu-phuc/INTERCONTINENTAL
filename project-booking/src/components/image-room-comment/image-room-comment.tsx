import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Carousel from "nuka-carousel";
import "./image-room-comment.css";
import { memo } from "react";
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
interface Props {
  getDataRoom: any;
}
const ImageRoomComment: React.FC<Props> = (props: Props) => {
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
          src={props.getDataRoom?.imageRooms[0].linkImage1}
          alt="slide"
        ></img>
        <img
          src={props.getDataRoom?.imageRooms[0].linkImage2}
          alt="slide"
        ></img>
        <img
          src={props.getDataRoom?.imageRooms[0].linkImage3}
          alt="slide"
        ></img>
        <img
          src={props.getDataRoom?.imageRooms[0].linkImage4}
          alt="slide"
        ></img>
        <img
          src={props.getDataRoom?.imageRooms[0].linkImage5}
          alt="slide"
        ></img>
      </Carousel>
    </div>
  );
};
export default memo(ImageRoomComment);
