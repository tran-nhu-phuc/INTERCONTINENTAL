import toast, { Toaster } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import Layout from "../layout/default-layout";
import DashBoard from "../components/dashboard/dashboard";
const PrivateRouter = () => {
  let checkLogin = localStorage.getItem("token_admin") as string;
  return checkLogin ? (
    <>
      <Layout child={<DashBoard />} />
    </>
  ) : (
    (toast.error("Chưa đăng nhập"), (<Navigate to={"/login"} />))
  );
};

export default PrivateRouter;
