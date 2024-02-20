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
import { Link, useNavigate } from "react-router-dom";
import ShowImage from "../show-image/show-image";
import ProfileUser from "../card-profile/card-profile";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import QrCode from "../qr-code/qr-code";
import toast from "react-hot-toast";
import OrderService from "../../services/order-service";
import { FaChevronLeft } from "react-icons/fa";
const HeaderBooking = () => {
  const [localUser, setLocalUser] = useState(localStorage.getItem("token"));
  const [dataUserById, setDataUserById] = useState<any>();
  const [isShowImage, setIsShowImage] = useState<boolean>(false);
  const [userId] = useState<any>(localStorage.getItem("tokenId"));
  const [nameUser] = useState<any>(localStorage.getItem("nameUser"));
  const [callBackApi, setCallBackApi] = useState<boolean>(false);
  const [callBackApiBooking, setCallBackApiBooking] = useState<boolean>(false);
  const [isOpenPopUpProfile, setIsOpenPopUpProfile] = useState<boolean>(false);
  const [dataBooking, setDataBooking] = useState<any>();
  const [isQrCode, setIsQrCode] = useState<boolean>(false);
  const [isModelQr, setIsModelQr] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleModelQrCode = (status: boolean) => {
    setIsQrCode(status);
  };
  const handleCallApiBooking = () => {
    setCallBackApiBooking(!callBackApiBooking);
  };
  const handleProfile = (statusProfile: boolean) => {
    setIsOpenPopUpProfile(statusProfile);
  };
  const handleShowImage = (statusShowImage: boolean) => {
    setIsShowImage(statusShowImage);
  };
  const handleCallApi = () => {
    setCallBackApi(!callBackApi);
  };
  const handleChange = (value: string) => {
    if (value === "logout") {
      dispatch(logout());
      setLocalUser(null);
      navigate("/");
    }
    if (value === "profile") {
      handleProfile(true);
    }
  };
  const [openPopUp, setOpenPopUp] = useState<boolean>(false);
  const handelClickPopUpLogin = () => {
    setLocalUser(localStorage.getItem("token"));
    setOpenPopUp(false);
  };
  useEffect(() => {
    const callApiBooking = async () => {
      try {
        const bookingService = new OrderService();
        const response = await bookingService.getAllByUser(userId);
        setDataBooking([
          ...response?.data?.filter((item: any) => {
            return item?.bookingDelete === 0 && item?.statusBooking === 1;
          }),
        ]);
      } catch (error) {
        console.log(error);
        toast.error("error");
      }
    };
    callApiBooking();
  }, [callBackApiBooking]);
  console.log(dataBooking);

  useEffect(() => {
    const getUserByIDServices = async () => {
      try {
        const userServices = new UserService();
        const dataUser = await userServices.getInformation(userId);
        setDataUserById(dataUser.data);
      } catch (error) {
        throw error;
      }
    };
    getUserByIDServices();
  }, [callBackApi]);
  const handleClick = async (bookingId: number) => {
    if (dataBooking) {
      const data = dataBooking?.find((item: any) => {
        return item?.bookingId === bookingId;
      });
      localStorage.setItem("data_booking", JSON.stringify(data));
      setIsQrCode(true);
    } else {
      toast.error("Error QR");
    }
  };
  return (
    <header className="header-register">
      {isQrCode ? (
        <QrCode
          handleModelQrCode={handleModelQrCode}
          handleCallApiBooking={handleCallApiBooking}
        />
      ) : null}
      <div className="come-back-comment">
        <FaArrowLeft
          className="come-back-comment-left"
          onClick={() => window.history.back()}
        />
        <FaArrowRight
          className="come-back-comment-right"
          onClick={() => window.history.forward()}
        />
      </div>
      <button
        className="open-model-list-qr-code"
        onClick={() => setIsModelQr(true)}
      >
        <FaChevronLeft />
        Nhận phòng
      </button>
      {isModelQr ? (
        <div className="table-show-list-check-in-qr-code">
          <div className="list-qr-code-left">
            <img
              className="image-header-model-qr-code"
              src="https://th.bing.com/th/id/R.dac6ac7b9b93ade37f386b44c27fa8e0?rik=7fkA4FhB0QWV8g&pid=ImgRaw&r=0"
              alt=""
            />
            {dataBooking?.map((item: any) => {
              return (
                <>
                  <p
                    style={{
                      width: "100%",
                      paddingLeft: "20px",
                      fontSize: "20px",
                    }}
                  >
                    {item?.nameRoom}
                  </p>
                  <img
                    src={item?.linkImage1}
                    alt=""
                    className="image-item-booking-header"
                  />
                  <button
                    onClick={() => handleClick(item?.bookingId)}
                    className="btn-show-qr-code-check-in"
                  >
                    <span className="text-qr-code-in-btn">
                      <span>CheckIn</span> <span>{item?.timeCheckIn}</span>
                    </span>
                  </button>
                </>
              );
            })}
            <button
              className="close-btn-list-qr-code"
              onClick={() => setIsModelQr(false)}
            >
              X
            </button>
          </div>
        </div>
      ) : null}
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
              <img
                src={dataUserById?.avatar}
                alt="ảnh user"
                className="image-user-profile-header-booking"
                onClick={() => handleShowImage(true)}
              />
              <Select
                value={`${nameUser}`}
                style={{ width: 120 }}
                onChange={handleChange}
                options={[
                  {
                    value: "name",
                    label: `${nameUser}`,
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
        <Link to={"/"}>
          <img
            src="/asset/image-header-home/image-header-home-3.svg"
            alt="logo intercom"
          ></img>
        </Link>
      </div>
      <Login
        handelClickPopUpLogin={handelClickPopUpLogin}
        openPopUp={openPopUp}
      />
      {isShowImage ? (
        <ShowImage
          handleShowImage={handleShowImage}
          avatar={dataUserById?.avatar}
        />
      ) : null}
      {isOpenPopUpProfile ? (
        <div className="component-profiles">
          <ProfileUser
            handleProfile={handleProfile}
            handleCallApi={handleCallApi}
          />
        </div>
      ) : null}
    </header>
  );
};
export default HeaderBooking;
