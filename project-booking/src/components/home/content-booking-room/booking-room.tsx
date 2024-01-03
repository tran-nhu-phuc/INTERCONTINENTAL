import "./booking-room.css";
import { PiVideoLight } from "react-icons/pi";
import { IoBedOutline } from "react-icons/io5";
import { CiShoppingTag } from "react-icons/ci";
const ContentBookingRoom = () => {
  return (
    <section className="content-booking-room">
      <article className="box-booking-room">
        <div className="header-content-booking-room">
          <p>ĐẶT PHÒNG</p>
        </div>
        <div className="list-booking-room">
          <div className="item-booking-room">
            <PiVideoLight className="video-booking-room" />
            <p>Đặt Phòng Trực Tiếp & Tiết Kiệm Chi Phí</p>
          </div>
          <div className="item-booking-room">
            <IoBedOutline className="video-booking-room" />
            <p>Tích lũy điểm với chương trình khách hàng thân thiết</p>
          </div>
          <div className="item-booking-room">
            <CiShoppingTag className="video-booking-room" />
            <p>Giá Tốt Nhất</p>
          </div>
        </div>
      </article>
    </section>
  );
};
export default ContentBookingRoom;
