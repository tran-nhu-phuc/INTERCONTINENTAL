import { useState } from "react";
import "./modal-user.css";
import UserService from "../../../services/user-services";
import toast from "react-hot-toast";
import useSocket from "../../../hooks/useSocket";
interface Props {
  dataIndexUser: any;
  handelClosePopup: Function;
  handelCallBackApi: Function;
}
const ModalUser: React.FC<Props> = (props: Props) => {
  const socket = useSocket();
  const [getDataEditUser, setGetDataEditUser] = useState<any>();
  const handelEditUser = async () => {
    if (getDataEditUser) {
      try {
        const userService = new UserService();
        if (getDataEditUser) {
          await userService.setStatusUser(
            { status: Number(getDataEditUser) },
            props.dataIndexUser?.id
          );
          if (getDataEditUser == 2) {
            socket.emit(`blockUser`, {
              userId: props.dataIndexUser?.id,
            });
          }
          await props.handelCallBackApi();
          await props.handelClosePopup();
        } else {
          toast.error("fill up select");
        }
      } catch (error) {
        toast.error("404");
      }
    }
  };
  return (
    <div className="modal-admin-user">
      <div className="box-modal-user">
        <h2>Edit User</h2>
        <div className="select-user-admin">
          <select
            aria-label="State"
            onChange={(e: any) => setGetDataEditUser(e.target.value)}
          >
            <option>Select Edit User</option>
            <option value={1}>Đang hoạt động</option>
            <option value={2}>Block</option>
          </select>
        </div>
        <div className="btn-modal-edit-user-admin">
          <button onClick={handelEditUser}>Save</button>
        </div>
      </div>
      <button
        className="close-modal-user-admin"
        onClick={() => props.handelClosePopup()}
      >
        x
      </button>
    </div>
  );
};
export default ModalUser;
