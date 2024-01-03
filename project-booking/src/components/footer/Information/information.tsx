import "./information.css";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
const InformationHotel = () => {
  return (
    <section className="information">
      <article className="logo-hotel">
        <div className="image">
          <img
            style={{ width: 250, height: 120 }}
            src="/asset/image-header-home/image-header-home-3.svg"
            alt="logo INTERCOM"
          />
        </div>
        <div className="address-hotel">
          <div className="address">
            <p>Bán Đảo Sơn Trà, Đà Nẵng,</p>
            <p>550000 Việt Nam</p>
          </div>
          <div className="phone">
            <p>SĐT: +84 236 393 8888</p>
            <p>Fax: +84 236 393 8887</p>
          </div>
          <div className="policy">
            <a>Sơ đồ trang web Chính Sách Riêng Tư</a>
            <a>Ưu Điểm Phản hồi của khách hàng</a>
            <a>IHG Clean Promise</a>
          </div>
        </div>
      </article>
      {/* <article className="register-guest">
        <span>Đăng Ký Nhận Ưu Đãi và Bản Tin</span>
        <div className="container-guest">
          <div className="name-guest">
            <label>First/Last Name*</label>
            <div className="btn">
              <input type="text" aria-label="First Name" />
              <input type="text" aria-label="Last Name" />
            </div>
          </div>
          <div className="email-guest">
            <label>Email*</label>
            <input type="email" aria-label="Email" />
          </div>
          <div className="btn-guest">
            <button>Submit</button>
          </div>
        </div>
      </article> */}
      <article className="social-network">
        <div className="logo-social-network">
          <p>
            <i>
              <FaFacebookF />
            </i>
          </p>
          <p>
            <i>
              <FaTwitter />
            </i>
          </p>
          <p>
            <i>
              <FaInstagram />
            </i>
          </p>
          <p>
            <i>
              <FaYoutube />
            </i>
          </p>
          <p>
            <i>
              <FaPinterest />
            </i>
          </p>
          <p>
            <i>
              <FaLinkedinIn />
            </i>
          </p>
        </div>
        <div className="logo">
          <img
            src="/asset/image-header-home/image-footer-home-6.svg"
            alt="logo"
          />
        </div>
        <div className="image">
          <img
            src="/asset/image-header-home/image-footer-home-7.webp"
            alt="INTERCOM"
          />
        </div>
      </article>
    </section>
  );
};
export default InformationHotel;
