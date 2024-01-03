import { memo, useEffect, useState } from "react";
import "./booking.css";
import ChanSearch from "./change-search/change-search";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import TableListRoom from "./table-list-room/table-list-room";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Booking } from "../../type/type";
import RoomService from "../../services/room-service";
import OrderRepository from "../../repositories/order-repositories";
const BookingComponent = () => {
  const updateSearch = useSelector((state: any) => state.updateSearch);
  const [changeSearch, setChangeSearch] = useState<boolean>(false);
  const [moreItemBooking, setMoreItemBooking] = useState<Boolean>(false);
  const [dataPrice, setDatePrice] = useState<number>(NaN);
  const [changeMoney, setChangeMoney] = useState<string>("");
  const [sortNameRoom, setSortNameRoom] = useState<string>("");
  const [getSes, setGetSes] = useState<any>(null);
  const location = useLocation();
  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("data_search") as string);
    setGetSes(data);
  }, [updateSearch]);
  useEffect(() => {
    const handlePaymentSuccess = async () => {
      console.log("aaaaa");

      try {
        const dataSes: Booking = await JSON.parse(
          sessionStorage.getItem("data_payment") as string
        );
        const roomServices = new RoomService();
        const postDataBooking = new OrderRepository();
        const dataRoomService = await roomServices.getInformation(
          dataSes.idRoom
        );
        console.log(dataRoomService);
        await roomServices.setStockRoom(dataSes.idRoom, {
          stock: Number(dataRoomService.data.stock) - Number(dataSes.countRoom),
        });
        await postDataBooking.postBooking({ ...dataSes, pay: 2 });
      } catch (error) {
        console.log(error);
        return error;
      }
    };
    if (location.state === "history") {
      handlePaymentSuccess();
      location.state = "history-1";
    }
  }, []);
  const handelChangePrice = (e: any) => {
    switch (e.target.value) {
      case "USD":
        setDatePrice(1);
        setChangeMoney("USD");
        break;
      case "VND":
        setDatePrice(24250);
        setChangeMoney("VND");
        break;
      case "EURO":
        setDatePrice(0.9);
        setChangeMoney("EURO");
        break;
    }
  };
  const handelClickScrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <main className="booking-table-search">
      <div className="booking-page">
        <div className="change-search-booking">
          <div
            className="header-change-search-booking"
            onClick={() => setChangeSearch(!changeSearch)}
          >
            <div className="data-before">
              <span>Bai Bac, SonTra Peninsula, Danang, VN</span>|
              <span>
                {getSes?.dataStart} - {getSes?.dateEnd}
              </span>
              |
              <span>
                {Number(getSes?.countUser) + Number(getSes?.countChild)} Guest
              </span>
              |<span>{getSes?.numberRoom} Room</span>
            </div>
            <div className="click-table-change-search">
              <p>Thay đổi</p>
              <p>{changeSearch ? <FaChevronDown /> : <FaChevronUp />}</p>
            </div>
          </div>
          {changeSearch ? (
            <div className="content-change-search-booking">
              <ChanSearch />
            </div>
          ) : null}
        </div>
      </div>
      <div className="header-content-booking">
        <h2>Select your room</h2>
      </div>
      <div className="box-select-type-room">
        <div className="select-bed-count">
          <label>Type Bed</label>
          <select
            onChange={(e: any) => {
              setSortNameRoom(e.target.value);
            }}
            value={sortNameRoom}
          >
            <option value={""}>Any</option>
            <option value={"King"}>King</option>
            <option value={"Bedroom"}>Bed Room</option>
            <option value={"Queen"}>Queen</option>
          </select>
        </div>
        <div className="select-money">
          <label>Type Money</label>
          <select onChange={handelChangePrice} value={changeMoney}>
            <option value={"USD"}>USD</option>
            <option value={"VND"}>VND</option>
            <option value={"EURO"}>EURO</option>
          </select>
        </div>
      </div>
      <div className="list-room">
        <TableListRoom
          dataPrice={dataPrice}
          changeMoney={changeMoney}
          sortNameRoom={sortNameRoom}
        />
      </div>
      <div className="text-last-page">
        <p>Rates reflect average nightly rate for one room.</p>
      </div>
      <div className="more-item-booking">
        <p onClick={() => setMoreItemBooking(!moreItemBooking)}>
          {moreItemBooking ? "More" : "Least"} information
          {moreItemBooking ? <FaChevronUp /> : <FaChevronDown />}
        </p>
      </div>
      <div className="back-to-top-booking">
        <button onClick={handelClickScrollToTop}>Back To Top</button>
      </div>
    </main>
  );
};
export default memo(BookingComponent);
