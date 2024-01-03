import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./sidebar-payment.css";
import Carousel from "nuka-carousel";
import React from "react";
import { Room } from "../../../type/type";
interface CustomButtonProps {
  onClick: () => void;
}
interface Props {
  dataRoom: Room;
}
const CustomPrevButton: React.FC<CustomButtonProps> = ({ onClick }) => (
  <button onClick={onClick} className="custom-btn-slide-item-room-booking">
    <FaChevronLeft />
  </button>
);

const CustomNextButton: React.FC<CustomButtonProps> = ({ onClick }) => (
  <button onClick={onClick} className="custom-btn-slide-item-room-booking">
    <FaChevronRight />
  </button>
);
const SideBarPayment: React.FC<Props> = (props: Props) => {
  const carouselSettings = {
    autoplay: true,
    wrapAround: true,
  };
  const itemImage: any = props.dataRoom ? [...props.dataRoom.image] : [];
  return (
    <div className="box-sidebar-payment">
      <div className="image-sidebar-payment">
        <Carousel
          className="slide-table-item-room"
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
          {itemImage?.map((item: any) => {
            return <img src={item} alt="image room intercom" />;
          })}
        </Carousel>
      </div>
      <div className="title-sidebar-payment">
        <img
          src="/asset/image-header-home/image-header-home-2.png"
          alt="logo intercom"
        ></img>
        <div className="title-sidebar-payment-header">
          <strong>InterContinental Danang Sun Peninsula Resort</strong>
          <p>1 {props.dataRoom ? props.dataRoom.name : "aaa"}</p>
        </div>
      </div>
      <div className="payment-alert">
        <div className="total-price-payment">
          <strong>Total Price</strong>
          <strong>{props.dataRoom ? props.dataRoom.cost : 0} USD</strong>
        </div>
        <div className="date-payment">
          <strong>Dates</strong>
          <p>Dec 25-26, 2023 </p>
        </div>
        <div className="reservation">
          <strong>Reservation</strong>
          <p>1 Room, 2 Adults</p>
        </div>
        <div className="room-payment">
          <div className="room-type-payment">
            <strong>Room Type</strong>
            <p>1 {props.dataRoom ? props.dataRoom.name : "aaa"}</p>
          </div>
        </div>
        <div className="rate-payment">
          <strong>Rate </strong>
          <div className="point">
            <p>MEMBER RATE by IHG® One</p>
            <p>Rewards BONUS POINTS: 1,000</p>
            <p>Bonus Points for Every Night</p>
          </div>
        </div>
        <div className="count-night">
          <div className="night-payment">
            <strong>1 night stay</strong>
            <p>{props.dataRoom ? props.dataRoom.cost : 0} USD</p>
          </div>
          <div className="dec-payment">
            <p>Dec 25 - Dec 26</p>
            <p>{props.dataRoom ? props.dataRoom.cost : 0} USD</p>
          </div>
        </div>
        <div className="average-nightly-rate">
          <strong>Average Nightly Rate</strong>
          <p>1,858.97 USD</p>
        </div>
        <div className="additional">
          <div className="charges">
            <strong>Additional Charges </strong>
            <strong>81.97 USD</strong>
          </div>
          <div className="service-charge">
            <p>Service Charge Mandatory As Per</p>
            <p>81.97 USD</p>
          </div>
          <p>Government Stipulations</p>
        </div>
        <div className="taxes-vats">
          <div className="taxes">
            <strong>Taxes</strong>
            <strong>137.70 USD</strong>
          </div>
          <div className="vat">
            <p>Vat</p>
            <p>137.70 USD</p>
          </div>
        </div>
        <div className="total-price-payment-side-bar-booking">
          <strong>Total Price</strong>
          <strong>{props.dataRoom ? props.dataRoom.cost : 0} USD</strong>
        </div>
      </div>
    </div>
  );
};
export default SideBarPayment;
