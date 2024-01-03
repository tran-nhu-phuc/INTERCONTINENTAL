import "./content-health.css";
const ContentHealth = () => {
  return (
    <section className="content-health">
      <article className="image">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/project-booking-c01b6.appspot.com/o/home%2Fimage-main-home-18.webp?alt=media&token=a96c62d4-ebd5-4cce-b9c3-86f7a9870da2"
          alt="room"
        />
      </article>
      <article className="content">
        <div className="link-health">
          <a>PHÒNG & SUITE</a>
          <a>BIỆT THỰ</a>
        </div>
        <h6>PHÒNG & SUITE</h6>
        <p>
          Nghỉ dưỡng gần gũi với thiên nhiên trong không gian trong lành, tinh
          khiết và tận hưởng dịch vụ đẳng cấp từ đội ngũ nhân viên tận tâm của
          chúng tôi.
        </p>
        <button>EXPLORE</button>
      </article>
    </section>
  );
};
export default ContentHealth;
