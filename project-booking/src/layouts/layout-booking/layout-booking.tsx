import "./layout-booking.css";
import React from "react";
import Footer from "../../components/footer/footer";
import HeaderBooking from "../../components/header_booking/header-booking";
interface Props {
  child: JSX.Element;
}
const LayoutBooking: React.FC<Props> = (props: Props) => {
  return (
    <div>
      <HeaderBooking />
      <div className="layout-booking-child">{props.child}</div>
      <Footer />
    </div>
  );
};
export default LayoutBooking;
