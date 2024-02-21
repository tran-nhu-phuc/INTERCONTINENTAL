import { useState } from "react";
import BookingService from "../../../services/booking-services";
import "./modal-order.css";
import Loading from "../../loading/loading";
import toast from "react-hot-toast";
interface Props {
  handelClosePopup: Function;
  dataCodeOrder: any;
  handelCallBackApi: Function;
}
const ModalOrder: React.FC<Props> = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [editDataStatusOrder, setEditDataStatusOrder] =
    useState<HTMLInputElement>();
  const handelEditOrder = async () => {
    setLoading(true);
    try {
      const editOrder = new BookingService();
      if (editDataStatusOrder) {
        await editOrder.pathBooking(props.dataCodeOrder.id, {
          status: editDataStatusOrder,
        });
        toast.success("Success Edit");
        props.handelCallBackApi();
      } else {
        toast.error("Fill Up Select");
      }
      setLoading(false);
      props.handelClosePopup();
    } catch (error) {
      setLoading(false);
      props.handelClosePopup();
      toast.error("Error Edit");
    }
  };
  let value = "";
  switch (props.dataCodeOrder.statusBooking?.toString()) {
    case "1":
      value = "Đang chờ nhận phòng";
      break;
    case "2":
      value = "Đã nhận phòng";
      break;
    case "3":
      value = "Đã trả phòng";
      break;
  }
  return (
    <div className="modal-admin">
      {loading ? <Loading styleLoading="white" /> : null}
      <div className="box-modal">
        <h2>Edit Booking</h2>
        <div className="select-order-admin">
          <select
            aria-label="State"
            defaultValue={value}
            onChange={(e: any) => setEditDataStatusOrder(e.target.value)}
          >
            <option value={1}>Đang chờ nhận phòng</option>
            <option value={2}>Đã nhận phòng</option>
            <option value={3}>Đã trả phòng</option>
          </select>
        </div>
        <div className="btn-modal-edit-order-admin">
          <button onClick={handelEditOrder}>Save</button>
        </div>
      </div>
      <button
        className="close-modal-edit-order"
        onClick={() => {
          props.handelClosePopup();
        }}
      >
        x
      </button>
    </div>
  );
};
export default ModalOrder;
