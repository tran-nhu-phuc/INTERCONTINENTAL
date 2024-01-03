import React from "react";
import "./rate-comment.css";
import { MdStarRate } from "react-icons/md";
interface Props {
  number: number;
  value: number;
  percent: number;
}
const RatingComment: React.FC<Props> = (props: Props) => {
  return (
    <div className="start-comment">
      <span>{props.number}</span>
      <span>
        <MdStarRate className="icon-star-comment" />
      </span>
      <input
        type="range"
        disabled
        step={1}
        value={props.value}
        placeholder="1"
        min="0"
        max="100"
      ></input>
      <span className="percent-rate-comment">{props.percent}%</span>
    </div>
  );
};
export default RatingComment;
