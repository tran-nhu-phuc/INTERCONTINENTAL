import toast, { Toaster } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import Layout from "../layout/default-layout";
import Category from "../components/category/categories";

const PrivateCategory = () => {
  let checkLogin = localStorage.getItem("token_admin") as string;
  return checkLogin ? (
    <>
      <Layout child={<Category />} />
    </>
  ) : (
    (toast.error("Chưa đăng nhập"), (<Navigate to={"*"} />))
  );
};

export default PrivateCategory;
