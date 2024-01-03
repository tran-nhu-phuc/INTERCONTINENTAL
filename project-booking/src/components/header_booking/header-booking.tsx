import "./header-booking.css";
import { MdOutlineGTranslate } from "react-icons/md";
import { IoBed } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import Login from "../login/login";
import { useEffect, useState } from "react";
import { Select, Space } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../../store/reducer/user";
import UserService from "../../services/user-service";
import { User } from "../../type/type";
import { useNavigate } from "react-router-dom";
const HeaderBooking = () => {
  const [localUser, setLocalUser] = useState(localStorage.getItem("token"));
  const [dataUserById, setDataUserById] = useState<User>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (value: string) => {
    if (value === "logout") {
      dispatch(logout());
      setLocalUser(null);
      navigate("/");
    }
    if (value === "profile") {
      navigate("/profile");
    }
  };
  const [openPopUp, setOpenPopUp] = useState<boolean>(false);
  const handelClickPopUpLogin = () => {
    setLocalUser(localStorage.getItem("token"));
    setOpenPopUp(false);
  };
  const userID: any = localStorage.getItem("tokenId");
  const userServices = new UserService();
  useEffect(() => {
    const getUserByIDServices = async () => {
      try {
        const dataUserById = await userServices.getInformation(userID);
        setDataUserById({ ...dataUserById.data });
      } catch (error) {
        console.log("......");
      }
    };
    getUserByIDServices();
  }, []);
  return (
    <header className="header-register">
      <div className="box-header-register">
        <div className="phone-register">
          <span>01208 52 175</span>
          <span>Quý vị cần giúp đỡ?</span>
        </div>
        <div className="do-register">
          <div className="translate">
            <span>
              <MdOutlineGTranslate />
            </span>
            <span>Tiếng việt</span>
          </div>
          <div className="home-lie">
            <span>
              <IoBed />
            </span>
            <span onClick={() => navigate("/history")}>Lưu trú</span>
          </div>
          <div className="join">
            <button
              onClick={() => navigate("/register")}
              disabled={localUser as boolean | any}
            >
              Tham gia
            </button>
          </div>
          {localUser ? (
            <Space wrap>
              <Select
                value={`${
                  dataUserById?.first_name + " " + dataUserById?.last_name
                }`}
                style={{ width: 120 }}
                onChange={handleChange}
                options={[
                  {
                    value: "name",
                    label: `${
                      dataUserById?.first_name +
                      " " +
                      " " +
                      dataUserById?.last_name
                    }`,
                    disabled: true,
                  },
                  {
                    value: "profile",
                    label: "Profile",
                  },
                  { value: "logout", label: "Logout" },
                ]}
                size="large"
              />
            </Space>
          ) : (
            <div className="login-header-booking">
              <CiLogin />
              <button onClick={() => setOpenPopUp(true)}>Đăng nhập</button>
            </div>
          )}
        </div>
      </div>
      <div className="header-image-register">
        <img
          src="/asset/image-header-home/image-header-home-3.svg"
          alt="logo intercom"
        ></img>
      </div>
      <Login
        handelClickPopUpLogin={handelClickPopUpLogin}
        openPopUp={openPopUp}
      />
    </header>
  );
};
export default HeaderBooking;
