import { Rating } from "react-simple-star-rating";
import "./rate-star.css";
const RateStar = () => {
  return (
    <div className="background-rate-star">
      <div className="box-user-click-rate-star">
        <Rating initialValue={1} size={35} />
      </div>
    </div>
  );
};
export default RateStar;
