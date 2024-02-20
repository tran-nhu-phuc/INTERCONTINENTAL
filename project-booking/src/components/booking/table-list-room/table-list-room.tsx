import "./table-list-room.css";
import Carousel from "nuka-carousel";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import RoomDetails from "../room-details/room-details";
import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomService from "../../../services/room-service";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
interface CustomButtonProps {
  onClick: () => void;
}
interface Props {
  dataPrice: number;
  changeMoney: string;
  sortNameRoom: string;
  endPointQuery: string;
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
  const [dataRoom, setDataRoom] = useState<any>();
  const navigate = useNavigate();
  const roomServices = new RoomService();
  const getDataUserLocal: string | null = localStorage.getItem(
    "token"
  ) as string;
  const data = JSON.parse(sessionStorage.getItem("data_search") as string);
  const carouselSettings = {
    autoplay: true,
    wrapAround: true,
  };
  const handelOpenPopup = () => {
    setOpenPopupDetails(false);
  };
  useEffect(() => {
    const getAllRoom = async () => {
      try {
        const dataRoomServices = await roomServices.getAllItem(
          props.endPointQuery
        );
        const dataResult: any = dataRoomServices.data.filter((item: any) => {
          return (
            Number(item.stock) >= Number(data.numberRooms) &&
            (props.sortNameRoom !== ""
              ? item.categoryId == props.sortNameRoom
              : true) &&
            Number(item?.countUser) * Number(data?.numberRooms) >=
              Number(data?.numberUser) + Number(data?.numberChild)
          );
        });
        setDataRoom([...dataResult]);
      } catch (error) {
        console.log(error);
      }
    };
    getAllRoom();
  }, [props.sortNameRoom, updateTableList, props.endPointQuery]);
  const handelDetails = (itemImage: any) => {
    setSelectedImage(itemImage);
    setOpenPopupDetails(true);
  };
  const handelBooking = async (index: number) => {
    const data = JSON.parse(sessionStorage.getItem("data_search") as string);
    if (dataRoom[index].stock < data.numberRooms) {
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
      {dataRoom?.map((item: any, index: any) => {
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
                <img src={`${item.imageRooms[0].linkImage1}`} alt="slide" />
                <img src={`${item.imageRooms[0].linkImage2}`} alt="slide" />
                <img src={`${item.imageRooms[0].linkImage3}`} alt="slide" />
                <img src={`${item.imageRooms[0].linkImage4}`} alt="slide" />
                <img src={`${item.imageRooms[0].linkImage5}`} alt="slide" />
              </Carousel>
            </div>
            <div className="content-item-booking">
              <h3>
                {data?.numberRooms} {""}
                {item?.name}
              </h3>
              <p onClick={() => handelDetails(item?.imageRooms[0])}>
                Room details
              </p>
              <p
                style={{
                  fontSize: "15px",
                  color: "rgb(243, 174, 72)",
                }}
                onClick={() => navigate(`/comment/${item?.id}`)}
              >
                Review
              </p>
            </div>
            <div className="btn-item-booking">
              <strong>MEMBER DISCOUNT</strong>
              <strong>
                {props?.dataPrice
                  ? (
                      item?.price *
                      props?.dataPrice *
                      data?.numberRooms
                    ).toLocaleString()
                  : item?.price * data?.numberRooms}{" "}
                <span>{props?.changeMoney ? props?.changeMoney : "USD"}</span>
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
