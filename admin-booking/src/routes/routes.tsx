import { Route, Routes } from "react-router-dom";
import Layout from "../layout/default-layout";
import DashBoard from "../components/dashboard/dashboard";
import Orders from "../components/orders/orders";
import User from "../components/user/user";
import Setting from "../components/setting/setting";
import Room from "../components/room/room";
import NotFound from "../components/not-found/not-found";
import LoginComponent from "../components/login/login";
import PrivateRouter from "./private";
import PrivateRoom from "./private-room";
import PrivateUser from "./private-user";
import PrivateBooking from "./private-booking";
import Category from "../components/category/categories";
import PrivateCategory from "./private-catefory";
const RouterAdmin = () => {
  return (
    <>
      <Routes>
        <Route element={<PrivateRouter />}>
          <Route path="/" element={<Layout child={<DashBoard />} />} />
        </Route>
        <Route element={<PrivateRoom />}>
          <Route path="/rooms" element={<Layout child={<Room />} />} />
        </Route>
        <Route element={<PrivateUser />}>
          <Route path="/users" element={<Layout child={<User />} />} />
        </Route>
        <Route element={<PrivateBooking />}>
          <Route path="/bookings" element={<Layout child={<Orders />} />} />
        </Route>
        <Route element={<PrivateCategory />}>
          <Route path="/categories" element={<Layout child={<Category />} />} />
        </Route>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
export default RouterAdmin;
