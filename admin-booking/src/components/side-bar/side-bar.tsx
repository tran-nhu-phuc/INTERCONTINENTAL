import "./side-bar.css";
import { RxDashboard } from "react-icons/rx";
import { TbBrandBooking } from "react-icons/tb";
import { FaBorderAll } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../../store/reducer/user-reducer";
const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handelLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <aside className="side-bar-admin">
      <ul>
        <Link to="/">
          <li className="aside">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/project-booking-c01b6.appspot.com/o/home%2Fimage-header-home-2.png?alt=media&token=ec326fd0-a6a0-4f4d-a581-b1972769e317"
              alt="image"
            />
          </li>
        </Link>
        <li className="aside-a" title="dashboard">
          <Link to="/">
            <Tooltip title="Dashboard">
              <RxDashboard className="icon-side-bar-admin" />
            </Tooltip>
          </Link>
        </li>
        <li className="aside-a" title="product">
          <Link to="/rooms">
            <Tooltip title="Rooms">
              <TbBrandBooking className="icon-side-bar-admin" />
            </Tooltip>
          </Link>
        </li>
        <li className="aside-a" title="order">
          <Link to="/bookings">
            <Tooltip title="Orders">
              <FaBorderAll className="icon-side-bar-admin" />
            </Tooltip>
          </Link>
        </li>
        <li className="aside-a" title="user">
          <Link to="/users">
            <Tooltip title="Users">
              <FaUser className="icon-side-bar-admin" />
            </Tooltip>
          </Link>
        </li>
        <li>
          <Tooltip title="Logout">
            <IoIosLogOut
              className="icon-side-bar-admin"
              onClick={handelLogout}
            />
          </Tooltip>
        </li>
      </ul>
    </aside>
  );
};
export default SideBar;
