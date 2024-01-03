import { DatePicker, DatePickerProps } from "antd";
import "./tag_booking.css";
import { IoBed } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaChildReaching } from "react-icons/fa6";
import React from "react";
interface Props {
  handelChangeStatus: Function;
}
const TagBooking: React.FC<Props> = (props: Props) => {
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {};
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const fullDate = day + "/" + month + "/" + year;
  const disabledDate = (current: any) => {
    return current && current < date;
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
              onChange={onChange}
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
              onChange={onChange}
              className="dateGetRoom"
              placeholder={fullDate}
              disabledDate={disabledDate}
            />
          </div>
        </div>
        <div className="count-tag-booking">
          <div className="tag-room-booking">
            <p>Số phòng</p>
            <div className="box-tag-select">
              <select name="room">
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
              <select name="room">
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
              <select name="room">
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
          <button>Tìm kiếm</button>
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
