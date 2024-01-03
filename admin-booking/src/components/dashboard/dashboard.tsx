import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import "./dashboard.css";
import { useLocation } from "react-router-dom";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { TbBrandBooking } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
const DashBoard = () => {
  const location = useLocation();
  return (
    <div className="table-dashboard-admin">
      <h1 className="header-admin">Dash Board</h1>
      <div className="dashboard-admin">
        <div className="box-item-dashboard-price-total">
          <div className="box">
            <div className="content-total-price">
              <span>Total Price</span>
              <strong>12999$</strong>
            </div>
            <div className="icon-total-price">
              <RiMoneyDollarCircleFill className="icon-total-price-money" />
            </div>
          </div>
        </div>
        <div className="box-item-dashboard-user">
          <div className="box">
            <div className="dash-board-user-content">
              <span>Total Customers</span>
              <strong>18</strong>
            </div>
            <div className="icon-user-dashboard">
              <FaUser className="icon-total-user" />
            </div>
          </div>
        </div>
        <div className="box-item-dashboard-order">
          <div className="box">
            <div className="dash-board-booking-content">
              <span>Total Booking</span>
              <strong>100</strong>
            </div>
            <div className="icon-booking-dashboard">
              <TbBrandBooking className="icon-total-booking" />
            </div>
          </div>
        </div>
        <div className="box-item-dashboard-chart">
          <BarChart
            series={[
              {
                data: [
                  1, 2, 3, 2, 1, 1, 2, 3, 2, 1, 1, 2, 3, 2, 1, 1, 2, 3, 2, 1, 1,
                  2, 3, 2, 1, 1, 2, 3, 2, 1,
                ],
              },
            ]}
            xAxis={[
              {
                scaleType: "band",
                data: [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14",
                  "15",
                  "16",
                  "17",
                  "18",
                  "19",
                  "20",
                  "21",
                  "22",
                  "23",
                  "24",
                  "25",
                  "26",
                  "27",
                  "28",
                  "29",
                  "30",
                ],
              },
            ]}
            height={400}
            width={1500}
            leftAxis={null}
          />
        </div>
      </div>
    </div>
  );
};
export default DashBoard;
