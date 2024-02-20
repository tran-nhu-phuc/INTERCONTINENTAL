import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./room-details.css";
import { IoMdClose } from "react-icons/io";
import Carousel from "nuka-carousel";
import React, { memo, useState } from "react";
import { Room } from "../../../type/type";
interface CustomButtonProps {
  onClick: () => void;
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
interface Props {
  handelOpenPopup: Function;
  dataRoom: Room;
  selectedImage: any;
}
const RoomDetails: React.FC<Props> = (props: Props) => {
  const carouselSettings = {
    autoplay: true,
    wrapAround: true,
  };
  return (
    <div className="room-details">
      <div className="box-room-details">
        <div className="header-details-booking-room">
          <h3>1 {props.dataRoom.name} </h3>
          <p onClick={() => props.handelOpenPopup()}>
            <IoMdClose />
          </p>
        </div>
        <div className="content-details-booking">
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
            <img src={props.selectedImage?.linkImage1} alt="slide"></img>
            <img src={props.selectedImage?.linkImage2} alt="slide"></img>
            <img src={props.selectedImage?.linkImage3} alt="slide"></img>
            <img src={props.selectedImage?.linkImage4} alt="slide"></img>
            <img src={props.selectedImage?.linkImage5} alt="slide"></img>
          </Carousel>
          <p className="club-details">Club Terrace Suite terrace</p>
          <p className="stocked-luxury">
            80 Sqm Luxury Bath View Stocked Minibar Furnished Balcony Outdoor
            Lounge Access
          </p>
          <div className="text-booking-details">
            <div className="bed-details">
              <strong className="header-content-text-details">
                Room Amenities
              </strong>
              <p>Bed</p>
              <ul>
                <li>King</li>
              </ul>
              <p>Room Classification</p>
              <ul>
                <li>Customizable Suite 10</li>
              </ul>
              <p>View</p>
              <ul>
                <li>Ocean View</li>
              </ul>
              <p>Bathroom Amenities</p>
              <ul>
                <li>Luxury Bath View</li>
                <li>Separate Bath and Walk-in Shower</li>
                <li>Freestanding Bath</li>
              </ul>
              <p>Room Appliances</p>
              <ul>
                <li>Stocked Minibar</li>
              </ul>
            </div>
            <div className="outdoors-details">
              <p>Outdoor Items</p>
              <ul>
                <li>Furnished Balcony</li>
                <li>Outdoor Living Area</li>
              </ul>
              <p>Room Location</p>
              <ul>
                <li>Corner Room</li>
              </ul>
              <p>Floor</p>
              <ul>
                <li>High Floor</li>
              </ul>
              <p>Room Access</p>
              <ul>
                <li>Lounge Access</li>
              </ul>
              <p>Smoking Policy</p>
              <ul>
                <li>Non-Smoking</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(RoomDetails);
