import "./comment.css";
import ContentComment from "./content-comment/content-comment";
import RatingComment from "./rating-comment/rating-comment";
import { MdOutlineStarRate } from "react-icons/md";
import { Select, Space } from "antd";
import { Pagination } from "antd";
import ImageRoomComment from "./image-room-comment/image-room-comment";
import CommentWriting from "./writting-comment/writing-comment";
const CommentBooking = () => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className="table-star-comment">
      <div className="header-payment">
        <h1>Comment</h1>
      </div>
      <div className="box-list-image-room-comment">
        <p>1 King Club Suite Panoramic Oceanview</p>
        <ImageRoomComment />
      </div>
      <div className="box-rate-star-comment">
        <strong>
          OVERALL RATING
          <MdOutlineStarRate />
        </strong>
        <strong>4.0 out of 5</strong>
        <RatingComment number={5} value={20} percent={10} />
        <RatingComment number={4} value={30} percent={20} />
        <RatingComment number={3} value={40} percent={30} />
        <RatingComment number={2} value={50} percent={20} />
        <RatingComment number={1} value={60} percent={20} />
        <p>See all 7,892 reviews</p>
      </div>
      <div className="header-text-comment">
        <h2>CheapOair Reviews</h2>
        <div className="sort-comment-user">
          <span>Filter by</span>
          <Space wrap>
            <Select
              defaultValue="any"
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: "any", label: "Any" },
                { value: "five_star", label: "5 Star" },
                { value: "four_star", label: "4 Star" },
                { value: "three_star", label: "3 Star" },
                { value: "two_star", label: "2 Star" },
                { value: "one_star", label: "1 Star" },
              ]}
              rootClassName="click-sort-star"
            />
          </Space>
        </div>
      </div>
      <div className="writing-comment">
        <CommentWriting />
      </div>
      <div className="box-comment">
        <ContentComment />
        <ContentComment />
        <ContentComment />
        <ContentComment />
        <ContentComment />
        <ContentComment />
        <ContentComment />
        <ContentComment />
        <ContentComment />
        <ContentComment />
        <ContentComment />
        <ContentComment />
        <ContentComment />
        <ContentComment />
        <ContentComment />
      </div>
      <div className="pagination-comment">
        <Pagination defaultCurrent={10} total={15} />
      </div>
      {/* <RateStar /> */}
    </div>
  );
};

export default CommentBooking;
