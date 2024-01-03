import toast, { Toaster } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import Layout from "../layout/default-layout";
import Orders from "../components/orders/orders";
const PrivateBooking = () => {
  let checkLogin = localStorage.getItem("token_admin") as string;
  return checkLogin ? (
    <Layout child={<Orders />} />
  ) : (
    (toast.error("Chưa đăng nhập"), (<Navigate to={"/register"} />))
  );
};

export default PrivateBooking;
