import toast, { Toaster } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import Layout from "../layout/default-layout";
import DashBoard from "../components/dashboard/dashboard";
import Orders from "../components/orders/orders";
import User from "../components/user/user";
import Room from "../components/room/room";

const PrivateUser = () => {
  let checkLogin = localStorage.getItem("token_admin") as string;
  return checkLogin ? (
    <>
      <Layout child={<User />} />
    </>
  ) : (
    (toast.error("Chưa đăng nhập"), (<Navigate to={"*"} />))
  );
};

export default PrivateUser;
