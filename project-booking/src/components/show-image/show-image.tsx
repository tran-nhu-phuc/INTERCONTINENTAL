import React from "react";
import "./show-image.css";
interface Props {
  handleShowImage: Function;
  avatar: string;
}
const ShowImage: React.FC<Props> = (props: Props) => {
  return (
    <div
      className="table-show-image"
      onClick={() => props.handleShowImage(false)}
    >
      <div className="box-show-image">
        <img src={props.avatar} alt="ảnh" className="image-show-user" />
      </div>
    </div>
  );
};
export default ShowImage;
