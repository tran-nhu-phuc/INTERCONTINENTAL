import { DatePicker, DatePickerProps } from "antd";
import "./tag_booking.css";
import { IoBed } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaChildReaching } from "react-icons/fa6";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { values } from "json-server-auth";
interface Props {
  handelChangeStatus: Function;
}
const TagBooking: React.FC<Props> = (props: Props) => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const fullDate = day + "/" + month + "/" + year;
  const [countUser, setCountUser] = useState<number>();
  const [countChild, setCountChild] = useState<number>();
  const [numberRoom, setNumberRoom] = useState<number>();
  const [startDate, setStartDate] = useState(date);
  const [dayStart, setDayStart] = useState<any>();
  const [endDate, setEndDate] = useState();
  const navigate = useNavigate();
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
  };
  const handelEndDateChange = (date: any, dateString: any) => {
    setEndDate(dateString);
  };
  const handelChangeSearch = () => {
    sessionStorage.setItem(
      "data_search",
      JSON.stringify({
        numberUser: countUser || 1,
        numberChild: countChild || 1,
        numberRooms: numberRoom || 1,
        timeCheckIn: dayStart,
        timeCheckOut: endDate,
      })
    );
    navigate("/booking");
  };
  return (
    <div className="hard-tag-booking">
      <div className="box-tag-popup-booking">
        <div className="tag-booking-header">
          <p>MAKE A RESERVATION</p>
        </div>
        <div className="date-tag-booking">
          <div className="date-tag-check-in">
            <p>Ngày nhận phòng</p>
            <DatePicker
              format={"DD/MM/YYYY"}
              onChange={handelStartDateChange}
              className="dateGetRoom"
              placeholder={fullDate}
              disabledDate={disabledDate}
              inputReadOnly={true}
            />
          </div>
          <div className="date-tag-check-out">
            <p>Ngày trả phòng</p>
            <DatePicker
              format={"DD/MM/YYYY"}
              onChange={handelEndDateChange}
              className="dateGetRoom"
              placeholder={fullDate}
              disabledDate={disabledEndDate}
            />
          </div>
        </div>
        <div className="count-tag-booking">
          <div className="tag-room-booking">
            <p>Số lượng phòng</p>
            <div className="box-tag-select">
              <select
                aria-label="State"
                name="room"
                onChange={(e: any) => setNumberRoom(e.target.value)}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
              <IoBed className="icon-bed" />
            </div>
          </div>
          <div className="tag-room-booking">
            <p>Người lớn</p>
            <div className="box-tag-select">
              <select
                aria-label="State"
                name="room"
                onChange={(e: any) => setCountUser(e.target.value)}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
                <option>13</option>
                <option>14</option>
                <option>15</option>
                <option>16</option>
                <option>17</option>
                <option>18</option>
                <option>19</option>
                <option>20</option>
              </select>
              <FaUser className="icon-bed" />
            </div>
          </div>
          <div className="tag-room-booking">
            <p>Trẻ em</p>
            <div className="box-tag-select">
              <select
                aria-label="State"
                name="room"
                onChange={(e: any) => setCountChild(e.target.value)}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
                <option>13</option>
                <option>14</option>
                <option>15</option>
                <option>16</option>
                <option>17</option>
                <option>18</option>
                <option>19</option>
                <option>20</option>
              </select>
              <FaChildReaching className="icon-bed" />
            </div>
          </div>
        </div>
        <div className="btn-tag-booking-search">
          <button onClick={handelChangeSearch}>Tìm kiếm</button>
        </div>
        <span
          className="close-tag-booking"
          onClick={() => {
            props.handelChangeStatus(false);
          }}
        >
          x
        </span>
      </div>
    </div>
  );
};
export default TagBooking;
