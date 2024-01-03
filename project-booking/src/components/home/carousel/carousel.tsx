import "./carousel.css";
import { Carousel } from "antd";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

const Carousels = () => {
  return (
    <div className="slide-carousel">
      <div className="btn-slide-left">
        <button>
          .<FaChevronLeft />
        </button>
      </div>
      <div className="btn-slide-right">
        <button>
          .<FaChevronRight />
        </button>
      </div>
      <Carousel autoplay className="box-slide-carousel">
        <div className="item-slide-carousel">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/project-booking-c01b6.appspot.com/o/home%2Fbanner%2Fimage-banner-home-1.jpg?alt=media&token=8417fa38-850a-4a47-ba20-7a1309ddbd12"
            alt="image"
          />
        </div>
        <div className="item-slide-carousel">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/project-booking-c01b6.appspot.com/o/home%2Fbanner%2Fimage-banner-home-2.jpg?alt=media&token=64d48c52-ad96-409d-87d2-cf8a0670ee60"
            alt="image"
          />
        </div>
        <div className="item-slide-carousel">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/project-booking-c01b6.appspot.com/o/home%2Fbanner%2Fimage-banner-home-1.jpg?alt=media&token=8417fa38-850a-4a47-ba20-7a1309ddbd12"
            alt="image"
          />
        </div>
        <div className="item-slide-carousel">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/project-booking-c01b6.appspot.com/o/home%2Fbanner%2Fimage-banner-home-2.jpg?alt=media&token=64d48c52-ad96-409d-87d2-cf8a0670ee60"
            alt="image"
          />
        </div>
        <div className="item-slide-carousel">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/project-booking-c01b6.appspot.com/o/home%2Fbanner%2Fimage-banner-home-1.jpg?alt=media&token=8417fa38-850a-4a47-ba20-7a1309ddbd12"
            alt="image"
          />
        </div>
        <div className="item-slide-carousel">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/project-booking-c01b6.appspot.com/o/home%2Fbanner%2Fimage-banner-home-2.jpg?alt=media&token=64d48c52-ad96-409d-87d2-cf8a0670ee60"
            alt="image"
          />
        </div>
        <div className="item-slide-carousel">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/project-booking-c01b6.appspot.com/o/home%2Fbanner%2Fimage-banner-home-1.jpg?alt=media&token=8417fa38-850a-4a47-ba20-7a1309ddbd12"
            alt="image"
          />
        </div>
        <div className="item-slide-carousel">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/project-booking-c01b6.appspot.com/o/home%2Fbanner%2Fimage-banner-home-2.jpg?alt=media&token=64d48c52-ad96-409d-87d2-cf8a0670ee60"
            alt="image"
          />
        </div>
        <div className="item-slide-carousel">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/project-booking-c01b6.appspot.com/o/home%2Fbanner%2Fimage-banner-home-1.jpg?alt=media&token=8417fa38-850a-4a47-ba20-7a1309ddbd12"
            alt="image"
          />
        </div>
        <div className="item-slide-carousel">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/project-booking-c01b6.appspot.com/o/home%2Fbanner%2Fimage-banner-home-2.jpg?alt=media&token=64d48c52-ad96-409d-87d2-cf8a0670ee60"
            alt="image"
          />
        </div>
      </Carousel>
    </div>
  );
};
export default Carousels;
