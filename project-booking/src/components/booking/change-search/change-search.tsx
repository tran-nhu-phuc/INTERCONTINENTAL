import "./change-search.css";
import { IoBed } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaChildReaching } from "react-icons/fa6";
import { DatePicker, Space } from "antd";
import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { updateSearch } from "../../../store/reducer/update";
const ChanSearch = () => {
  const getData = JSON.parse(sessionStorage.getItem("data_search") as string);
  const date = new Date();
  const [countUser, setCountUser] = useState<number>(getData.numberUser);
  const [countChild, setCountChild] = useState<number>(getData.numberChild);
  const [numberRoom, setNumberRoom] = useState<number>(getData.numberRooms);
  const [startDate, setStartDate] = useState(date);
  const [dayStart, setDayStart] = useState<any>(getData.timeCheckIn);
  const [endDate, setEndDate] = useState(getData.timeCheckOut);
  const [status, setStatus] = useState<boolean>(true);
  const dispatch = useDispatch();
  const disabledDate = (current: any) => {
    return current && current < date;
  };
  const disabledEndDate = (endValue: any) => {
    if (!endValue || !startDate) {
      return false;
    }
    return endValue.isBefore(startDate); // isBefore() để kiểm tra xem một thời điểm có trước một thời điểm khác hay không
  };
  const handelStartDateChange = (date: any, dateString: string) => {
    setStartDate(date);
    setDayStart(dateString);
    setStatus(false);
  };
  const handelEndDateChange = (date: any, dateString: string) => {
    setEndDate(dateString);
    setStatus(false);
  };
  const handelChangeSearch = () => {
    sessionStorage.setItem(
      "data_search",
      JSON.stringify({
        numberUser: countUser,
        numberChild: countChild,
        numberRooms: numberRoom,
        timeCheckIn: dayStart,
        timeCheckOut: endDate,
      })
    );
    window.scrollTo(0, 500);
    setStatus(true);
    dispatch(updateSearch() as any);
  };
  return (
    <div className="box-change-search">
      <Space direction="vertical" className="box-date">
        <div className="date-change-search">
          <div className="item-room">
            <span>Ngày nhận phòng</span>
            <DatePicker
              format={"DD/MM/YYYY"}
              onChange={handelStartDateChange}
              className="dateGetRoom"
              placeholder={dayStart}
              disabledDate={disabledDate}
            />
          </div>
          <div className="item-room">
            <span>Ngày trả phòng</span>
            <DatePicker
              format={"DD/MM/YYYY"}
              onChange={handelEndDateChange}
              className="dateGetOutRoom"
              placeholder={endDate}
              disabledDate={disabledEndDate}
            />
          </div>
        </div>
        <div className="room-people">
          <div className="many-room">
            <label>Số phòng</label>
            <div className="box-select">
              <select
                aria-label="State"
                name="room"
                value={numberRoom}
                onChange={(e: any) => {
                  setNumberRoom(e.target.value);
                  setStatus(false);
                }}
              >
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
              <IoBed className="icon-bed" />
            </div>
          </div>
          <div className="many-room">
            <label>Người lớn</label>
            <div className="box-select">
              <select
                aria-label="State"
                name="room"
                value={countUser}
                onChange={(e: any) => {
                  setCountUser(e.target.value);
                  setStatus(false);
                }}
              >
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
                <option value={11}>11</option>
                <option value={12}>12</option>
                <option value={13}>13</option>
                <option value={14}>14</option>
                <option value={15}>15</option>
                <option value={16}>16</option>
                <option value={17}>17</option>
                <option value={18}>18</option>
                <option value={19}>19</option>
                <option value={20}>20</option>
              </select>
              <FaUser className="icon-bed" />
            </div>
          </div>
          <div className="many-room">
            <label>Trẻ em</label>
            <div className="box-select">
              <select
                aria-label="State"
                name="room"
                value={countChild}
                onChange={(e: any) => {
                  setCountChild(e.target.value);
                  setStatus(false);
                }}
              >
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
                <option value={11}>11</option>
                <option value={12}>12</option>
                <option value={13}>13</option>
                <option value={14}>14</option>
                <option value={15}>15</option>
                <option value={16}>16</option>
                <option value={17}>17</option>
                <option value={18}>18</option>
                <option value={19}>19</option>
                <option value={20}>20</option>
              </select>
              <FaChildReaching className="icon-bed" />
            </div>
          </div>
        </div>
        <div className="btn-search">
          <button disabled={status} onClick={handelChangeSearch}>
            Tìm kiếm
          </button>
        </div>
        <div className="address-hotel">
          Bai Bac, SonTra Peninsula, Danang, VN
        </div>
        <div className="doc-change-search">
          <p>* Requires affiliation in the respective organisation. ** Best</p>
          <p>Available Rate Search does not include affiliation rates.</p>
        </div>
      </Space>
    </div>
  );
};
export default memo(ChanSearch);
