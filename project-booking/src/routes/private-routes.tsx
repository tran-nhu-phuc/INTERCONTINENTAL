import toast, { Toaster } from "react-hot-toast";
import Payment from "../components/payment/payment";
import { Navigate } from "react-router-dom";
import LayoutBooking from "../layouts/layout-booking/layout-booking";

const PrivateRouter = () => {
  let checkLogin = localStorage.getItem("token") as string;
  return checkLogin ? (
    <LayoutBooking child={<Payment />} />
  ) : (
    (toast.error("Chưa đăng nhập"), (<Navigate to={"/register"} />))
  );
};

export default PrivateRouter;
