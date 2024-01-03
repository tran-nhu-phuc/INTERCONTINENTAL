import { Route, Routes } from "react-router-dom";
import DefaultLayout from "../layouts/default-layout/defaultLayout";
import Home from "../components/home/home";
import LayoutBooking from "../layouts/layout-booking/layout-booking";
import RegisterBooking from "../components/register/register";
import BookingComponent from "../components/booking/booking";
import Payment from "../components/payment/payment";
import HistoryBooking from "../components/history/history";
import CommentBooking from "../components/comment/comment";
import PrivateRouter from "./private-routes";
import ProfileUser from "../components/card-profile/card-profile";

const RoutesLink = () => {
  return (
    <>
      <Routes>
        <Route path="/" index element={<DefaultLayout child={<Home />} />} />
        <Route
          path="/register"
          element={<LayoutBooking child={<RegisterBooking />} />}
        />
        <Route
          path="/booking"
          element={<LayoutBooking child={<BookingComponent />} />}
        />
        <Route element={<PrivateRouter />}>
          <Route
            path="/payment/:id"
            element={<LayoutBooking child={<Payment />} />}
          />
        </Route>
        <Route
          path="/history"
          element={<LayoutBooking child={<HistoryBooking />} />}
        />
        <Route
          path="/comment"
          element={<LayoutBooking child={<CommentBooking />} />}
        />
        <Route
          path="/profile"
          element={<LayoutBooking child={<ProfileUser />} />}
        />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  );
};
export default RoutesLink;
