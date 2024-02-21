import "./search-main.css";
import { DatePicker, Space } from "antd";
import { useState } from "react";
import { IoBed } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaChildReaching } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import moment from "moment";
const Search = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const fullDate = day + "/" + month + "/" + year;
  const fullDateEnd = day + 1 + "/" + month + "/" + year;
  const [countUser, setCountUser] = useState<number>(1);
  const [countChild, setCountChild] = useState<number>(1);
  const [numberRoom, setNumberRoom] = useState<number>(1);
  const [startDate, setStartDate] = useState(date);
  const [dayStart, setDayStart] = useState<any>();
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();
  const disabledDate = (current: any) => {
    return current && current < date;
  };

  const disabledEndDate = (endValue: any) => {
    if (!endValue || !startDate) {
      return false;
    }

    const oneDayAfterStartDate = moment(startDate).add(1, "days");

    return endValue.isBefore(oneDayAfterStartDate);
  };
  const handelStartDate = (date: any, dateString: string) => {
    setStartDate(date);
    setDayStart(dateString);
  };
  const handelSubmitSearch = () => {
    sessionStorage.setItem(
      "data_search",
      JSON.stringify({
        timeCheckIn: dayStart ? dayStart : fullDate,
        timeCheckOut: endDate ? endDate : fullDateEnd,
        numberRooms: numberRoom,
        numberUser: countUser,
        numberChild: countChild,
      })
    );
    navigate("/booking");
  };

  return (
    <>
      <article className="search-main">
        <div className="items-input">
          {" "}
          <Space direction="vertical" className="box-date">
            <div className="item-room">
              <span>Ngày nhận phòng</span>
              <DatePicker
                format={"DD/MM/YYYY"}
                className="dateGetRoom"
                placeholder={fullDate}
                onChange={(date: any, dateString: any) =>
                  handelStartDate(date, dateString)
                }
                disabledDate={disabledDate}
              />
            </div>
            <div className="item-room">
              <span>Ngày trả phòng</span>
              <DatePicker
                format={"DD/MM/YYYY"}
                className="dateGetOutRoom"
                placeholder={fullDateEnd}
                disabledDate={disabledEndDate}
                onChange={(date: any, dateString: any) =>
                  setEndDate(dateString)
                }
              />
            </div>
            <div className="room-people">
              <div className="many-room">
                <label>Số phòng</label>
                <div className="box-select">
                  <select
                    aria-label="State"
                    name="numberRoom"
                    value={numberRoom}
                    onChange={(e: any) =>
                      setNumberRoom(
                        e.target.value ? e.target.value : numberRoom
                      )
                    }
                  >
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
                    name="countUser"
                    value={countUser}
                    onChange={(e: any) =>
                      setCountUser(e.target.value ? e.target.value : countUser)
                    }
                  >
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
                    name="countChild"
                    onChange={(e: any) =>
                      setCountChild(
                        e.target.value ? e.target.value : countChild
                      )
                    }
                  >
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
              <button onClick={handelSubmitSearch}>Tìm kiếm</button>
            </div>
          </Space>
        </div>
      </article>
    </>
  );
};
export default Search;
