import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./modal-image-room.css";
import Carousel from "nuka-carousel";
import React, { memo } from "react";
interface CustomButtonProps {
  onClick: () => void;
}
interface Props {
  handleCancel: Function;
  dataImage: any;
}

const CustomPrevButton: React.FC<CustomButtonProps> = ({ onClick }) => (
  <button onClick={onClick} className="custom-btn-slide-details-room-booking">
    .
    <FaChevronLeft />
  </button>
);

const CustomNextButton: React.FC<CustomButtonProps> = ({ onClick }) => (
  <button onClick={onClick} className="custom-btn-slide-details-room-booking">
    .
    <FaChevronRight />
  </button>
);
const ModalImageRoom: React.FC<Props> = (props: Props) => {
  const carouselSettings = {
    autoplay: true,
    wrapAround: true,
  };
  return (
    <div className="box-modal-image-room ">
      <div className="box-image-room">
        <div className="image-room ">
          <Carousel
            className="slide-table-details-room"
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
              src={props?.dataImage?.imageRooms[0]?.linkImage1}
              alt="image room"
            ></img>
            <img
              src={props?.dataImage?.imageRooms[0]?.linkImage2}
              alt="image room"
            ></img>
            <img
              src={props?.dataImage?.imageRooms[0]?.linkImage3}
              alt="image room"
            ></img>
            <img
              src={props?.dataImage?.imageRooms[0]?.linkImage4}
              alt="image room"
            ></img>
            <img
              src={props?.dataImage?.imageRooms[0]?.linkImage5}
              alt="image room"
            ></img>
          </Carousel>
        </div>
      </div>
      <button
        className="close-pop-up-views-image-room"
        onClick={() => props.handleCancel()}
      >
        x
      </button>
    </div>
  );
};
export default memo(ModalImageRoom);
