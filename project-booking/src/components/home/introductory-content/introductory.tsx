import Contact from "./contact/contact";
import "./introductory.css";
const IntroductoryContent = () => {
  return (
    <section className="introductory">
      <article className="content">
        <div className="right-quotes">
          <img
            src="/asset/image-header-home/image-main-home-19.webp"
            alt="quotes"
          ></img>
        </div>
        <div className="text">
          <p>
            Trải nghiệm kỳ nghỉ dưỡng riêng tư miền nhiệt đới với nắng vàng,
            biển xanh và cát trắng tại một trong những khu nghỉ dưỡng biển đẹp
            nhất Việt Nam. Còn gì tuyệt vời hơn khi được đắm mình vào thế giới
            thiên nhiên hoang sơ bên vịnh biển riêng tư và cảm nhận phong cách
            thiết kế độc đáo của khu nghỉ dưỡng là sự kết hợp hoàn hảo giữa văn
            hóa Việt Nam truyền thống và lối kiến trúc đương đại. Hãy trải
            nghiệm ẩm thực tinh túy và tận hưởng dịch vụ tận tâm từ đội ngũ nhân
            viên người địa phương của chúng tôi.
          </p>
        </div>
        <div className="left-quotes">
          <img
            src="/asset/image-header-home/image-main-home-20.jpg"
            alt="left-quotes"
          ></img>
        </div>
        <div className="ceo-intercom">
          <span>SEBASTIAN MODAK</span> Thời báo New York
        </div>
      </article>
      <Contact />
    </section>
  );
};
export default IntroductoryContent;
