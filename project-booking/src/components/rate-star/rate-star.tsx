import { Rating } from "react-simple-star-rating";
import "./rate-star.css";
import React, { memo } from "react";
import RattingService from "../../services/ratting-services";
import toast from "react-hot-toast";
interface Props {
  getDataRoom: any;
  handlePopUpRatting: Function;
}
const RateStar: React.FC<Props> = (props: Props) => {
  const handleAddRatting = async (value: number) => {
    try {
      if (value !== undefined) {
        const rattingServices = new RattingService();
        const userId = localStorage.getItem("tokenId");
        const newData = {
          rate: Number(value),
          userId: Number(userId),
          roomId: Number(props.getDataRoom?.id),
        };
        const result = await rattingServices.addNewRatting(newData);
        if (result.status === 201) {
          props.handlePopUpRatting(false);
        } else {
          toast.error("fail ratting");
        }
      }
    } catch (error) {
      toast.error("fail server ratting");
    }
  };
  return (
    <div className="background-rate-star">
      <div className="box-user-click-rate-star">
        <div className="header-rating-star">
          <h5>{props.getDataRoom?.name}</h5>
        </div>
        <div className="image-ratting-star">
          <img src={props?.getDataRoom?.imageRooms[0].linkImage1} alt="" />
        </div>
        <p>Reviews of room quality</p>
        <Rating
          initialValue={1}
          size={35}
          onClick={(value: number) => handleAddRatting(value)}
        />
      </div>
    </div>
  );
};
export default memo(RateStar);
