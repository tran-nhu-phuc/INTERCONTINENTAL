import { useState } from "react";
import "./menu-btn-header.css";
import TagBooking from "../../home/tag_booking/tag_booking";
const ButtonHeader = () => {
  const [openTagBooking, setTagBooking] = useState<boolean>(false);
  const handelChangeStatus = (status: boolean) => {
    setTagBooking(status);
  };
  return (
    <>
      <div className="menu-btn-header">
        <div className="btn-club">
          <button>
            <img
              src="/asset/image-header-home/image-header-home-2.png"
              alt="logo INTERCONTINENTAL"
            />
            INTERCONTINENTAL
          </button>
        </div>
        <div className="btn-booking-room">
          <button onClick={() => setTagBooking(true)}>Đặt phòng</button>
        </div>
        {openTagBooking ? (
          <TagBooking handelChangeStatus={handelChangeStatus} />
        ) : null}
      </div>
    </>
  );
};
export default ButtonHeader;
