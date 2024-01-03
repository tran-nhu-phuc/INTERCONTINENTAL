import { useState } from "react";
import Loading from "../../loading/loading";
import "./modal-room.css";
import { Booking } from "../../../type/type";
import RoomSerVices from "../../../services/room-services";
import toast from "react-hot-toast";
interface Props {
  handelCancelEdit: Function;
  dataIndexRoom: any;
  handelCallBackApi: Function;
}
const ModalRoom: React.FC<Props> = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [getValueRoom, setGetValueRoom] = useState<any>();
  const handelGetValueInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setGetValueRoom({
      ...getValueRoom,
      [name]: value,
    });
  };
  const handelPatchEditRoom = async () => {
    setLoading(true);
    try {
      const dataRoomSerVices = new RoomSerVices();
      if (getValueRoom) {
        await dataRoomSerVices.setStockRoom(
          getValueRoom,
          props.dataIndexRoom.id
        );
        props.handelCallBackApi();
        toast.success("ok");
        setLoading(false);
        props.handelCancelEdit();
      } else {
        setLoading(false);
        toast.error("fill up edit");
      }
    } catch (error) {
      setLoading(false);
      toast.error("edit error");
      props.handelCancelEdit();
    }
  };
  return (
    <div className="modal-admin-room">
      {loading ? <Loading styleLoading="white" /> : null}
      <div className="box-modal-room">
        <h2>Edit Room</h2>
        <div className="box-input-room-admin">
          <input
            type="text"
            placeholder={props.dataIndexRoom.name}
            className="input-room-admin"
            onChange={handelGetValueInput}
            name={"name"}
          />
          <input
            type="text"
            placeholder={props.dataIndexRoom.cost + "USD"}
            className="input-room-admin"
            onChange={handelGetValueInput}
            name={"cost"}
          />
        </div>
        <button className="save-edit-room" onClick={handelPatchEditRoom}>
          Save
        </button>
      </div>
      <button
        className="close-modal-edit-room"
        onClick={() => props.handelCancelEdit()}
      >
        x
      </button>
    </div>
  );
};
export default ModalRoom;
