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
  console.log(props.dataImage);

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
            {props?.dataImage?.image.map((item: any) => {
              return <img src={item} alt="image room"></img>;
            })}
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
