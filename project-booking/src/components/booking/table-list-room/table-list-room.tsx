import "./table-list-room.css";
import Carousel from "nuka-carousel";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import RoomDetails from "../room-details/room-details";
import React, { memo, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Room } from "../../../type/type";
import RoomService from "../../../services/room-service";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import ShowMoreText from "react-show-more-text";
interface CustomButtonProps {
  onClick: () => void;
}
interface Props {
  dataPrice: number;
  changeMoney: string;
  sortNameRoom: string;
}
const CustomPrevButton: React.FC<CustomButtonProps> = ({ onClick }) => (
  <button onClick={onClick} className="custom-btn-slide-item-room-booking">
    .
    <FaChevronLeft />
  </button>
);
const CustomNextButton: React.FC<CustomButtonProps> = ({ onClick }) => (
  <button onClick={onClick} className="custom-btn-slide-item-room-booking">
    .
    <FaChevronRight />
  </button>
);
const TableListRoom: React.FC<Props> = (props: Props) => {
  const updateTableList = useSelector((state: any) => state.updateSearch);
  const [openPopupDetails, setOpenPopupDetails] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<[]>([]);
  const [dataRoom, setDataRoom] = useState<Room[]>([]);
  const navigate = useNavigate();
  const roomServices = new RoomService();
  const getDataUserLocal: string | null = localStorage.getItem(
    "token"
  ) as string;
  const carouselSettings = {
    autoplay: true,
    wrapAround: true,
  };
  const handelOpenPopup = () => {
    setOpenPopupDetails(false);
  };
  useEffect(() => {
    const getAllRoom = async () => {
      const data = JSON.parse(sessionStorage.getItem("data_search") as string);
      try {
        const dataRoomServices = await roomServices.getAllItem();
        const dataResult: any = dataRoomServices.data.filter((item: any) => {
          return (
            item.count_user >=
              Number(data.countUser) + Number(data.countChild) &&
            item.stock >= data.numberRoom &&
            (props.sortNameRoom !== ""
              ? item.category == props.sortNameRoom
              : true)
          );
        });
        setDataRoom([...dataResult]);
      } catch (error) {
        console.log("......");
      }
    };
    getAllRoom();
  }, [props.sortNameRoom, updateTableList]);
  const handelDetails = (itemImage: any) => {
    setSelectedImage(itemImage);
    setOpenPopupDetails(true);
  };
  const handelBooking = async (index: number) => {
    const data = JSON.parse(sessionStorage.getItem("data_search") as string);
    if (dataRoom[index].stock < data.numberRoom) {
      toast.error("không đủ phòng");
    } else {
      if (getDataUserLocal) {
        navigate(`/payment/${dataRoom[index].id}`);
      } else {
        await toast.error("chưa đăng nhập");
        navigate("/register");
      }
    }
  };
  return (
    <>
      {dataRoom.map((item, index) => {
        return (
          <div className="table-item-searched">
            <Toaster />
            <div className="image-item-booking">
              <Carousel
                className="slide-table-item-room"
                renderCenterLeftControls={({
                  previousSlide,
                }: {
                  previousSlide: () => void;
                }) => <CustomPrevButton onClick={previousSlide} />}
                renderCenterRightControls={({
                  nextSlide,
                }: {
                  nextSlide: () => void;
                }) => <CustomNextButton onClick={nextSlide} />}
                {...carouselSettings}
              >
                {item.image.map((itemImage: string) => {
                  return <img src={itemImage} alt="slide" />;
                })}
              </Carousel>
            </div>
            <div className="content-item-booking">
              <h3>{item.name}</h3>
              <p onClick={() => handelDetails([...item.image])}>Room details</p>
            </div>
            <div className="btn-item-booking">
              <strong>MEMBER DISCOUNT</strong>
              <strong>
                {props.dataPrice
                  ? (item.cost * props.dataPrice).toLocaleString()
                  : item.cost}{" "}
                <span>{props.changeMoney ? props.changeMoney : "USD"}</span>
              </strong>
              <span>per night</span>
              <span>Excludes 5% Service Charge.</span>
              <button onClick={() => handelBooking(index)}>Booking</button>
            </div>
            {openPopupDetails ? (
              <RoomDetails
                handelOpenPopup={handelOpenPopup}
                dataRoom={item}
                selectedImage={selectedImage}
              />
            ) : null}
          </div>
        );
      })}
    </>
  );
};
export default memo(TableListRoom);
