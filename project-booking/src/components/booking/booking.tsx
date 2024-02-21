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
import CategoryService from "../../services/categoty-service";
const BookingComponent = () => {
  const updateSearch = useSelector((state: any) => state.updateSearch);
  const [changeSearch, setChangeSearch] = useState<boolean>(false);
  const [moreItemBooking, setMoreItemBooking] = useState<Boolean>(false);
  const [dataPrice, setDatePrice] = useState<number>(NaN);
  const [changeMoney, setChangeMoney] = useState<string>("");
  const [sortNameRoom, setSortNameRoom] = useState<string>("");
  const [getSes, setGetSes] = useState<any>(null);
  const [dataCategory, setDataCategory] = useState<any>();
  const [endPointQuery, setEndPointQuery] = useState<string>("");
  const location = useLocation();
  const handleViewMore = (limit: number) => {
    setEndPointQuery(`/?limit=${limit}`);
  };
  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("data_search") as string);
    setGetSes(data);
  }, [updateSearch]);
  useEffect(() => {
    const handlePaymentSuccess = async () => {
      try {
        const dataSes: Booking = await JSON.parse(
          sessionStorage.getItem("data_payment") as string
        );
        const postDataBooking = new OrderRepository();
        await postDataBooking.postBooking({ ...dataSes, paymentType: 2 });
      } catch (error) {
        console.log(error);
        return error;
      }
    };
    if (location.state === "history") {
      handlePaymentSuccess();
      location.state = "history-1";
      sessionStorage.removeItem("data_payment");
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
  useEffect(() => {
    const handleCategory = async () => {
      try {
        const categoryService = new CategoryService();
        const dataCategory = await categoryService.getAll();
        setDataCategory([...dataCategory.data]);
      } catch (error) {
        console.log(error);
      }
    };
    handleCategory();
  }, []);
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
                {getSes?.timeCheckIn} - {getSes?.timeCheckOut}
              </span>
              |
              <span>
                {Number(getSes?.numberUser) + Number(getSes?.numberChild)} Guest
              </span>
              |<span>{getSes?.numberRooms} Room</span>
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
            aria-label="State"
            onChange={(e: any) => {
              setSortNameRoom(e.target.value);
              handleViewMore(1000);
            }}
            value={sortNameRoom}
          >
            <option value={""}>Any</option>
            {dataCategory?.map((item: any) => {
              return <option value={`${item.id}`}>{item.name}</option>;
            })}
          </select>
        </div>
        <div className="select-money">
          <label>Type Money</label>
          <select
            aria-label="State"
            onChange={handelChangePrice}
            value={changeMoney}
          >
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
          endPointQuery={endPointQuery}
        />
      </div>
      <div className="text-last-page">
        <p>Rates reflect average nightly rate for one room.</p>
      </div>
      <div className="more-item-booking">
        <p
          onClick={() => {
            setMoreItemBooking(!moreItemBooking);
            moreItemBooking ? handleViewMore(7) : handleViewMore(1000);
          }}
        >
          {moreItemBooking ? "Least" : "More"} information
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
