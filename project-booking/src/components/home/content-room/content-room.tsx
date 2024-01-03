import "./content-room.css";
const ContentRoom = () => {
  return (
    <section className="content-room">
      <article className="content">
        <div className="link-room">
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
      <article className="image">
        <img src="/asset/image-header-home/image-main-home-5.webp" alt="room" />
      </article>
    </section>
  );
};
export default ContentRoom;
