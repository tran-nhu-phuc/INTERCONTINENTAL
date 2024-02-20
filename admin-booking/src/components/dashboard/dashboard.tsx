import { BarChart } from "@mui/x-charts/BarChart";
import "./dashboard.css";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { TbBrandBooking } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import UserService from "../../services/user-services";
import BookingService from "../../services/booking-services";
import { useEffect, useMemo, useState } from "react";
const DashBoard = () => {
  const [dataUser, setDataUser] = useState<any>();
  const [dataThirtyDay, setDataThirtyDay] = useState<any>();
  const totalPrice: any = useMemo(() => {
    let total = 0;
    dataThirtyDay?.map((item: any) => {
      return (total += Number(item?.total_amount));
    });
    return total;
  }, [dataThirtyDay]);
  useEffect(() => {
    const handleCallData = async () => {
      const userServices = new UserService();
      const bookingServices = new BookingService();
      try {
        const resultDataUser = await userServices.getAllUser();
        setDataUser([...resultDataUser.data]);
        const resultDataThirtyDay = await bookingServices.getAllPriceByDay();
        console.log(resultDataThirtyDay);

        setDataThirtyDay([...resultDataThirtyDay?.data] || []);
      } catch (error) {
        console.log(error);
      }
    };
    handleCallData();
  }, []);
  console.log(dataThirtyDay);

  return (
    <div className="table-dashboard-admin">
      <h1 className="header-admin">Dashboard</h1>
      <div className="dashboard-admin">
        <div className="box-item-dashboard-price-total">
          <div className="box">
            <div className="content-total-price">
              <span>Total Price</span>
              <strong>{totalPrice || 0}$</strong>
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
              <strong>{dataUser?.length}</strong>
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
              <strong>{dataThirtyDay?.length}</strong>
            </div>
            <div className="icon-booking-dashboard">
              <TbBrandBooking className="icon-total-booking" />
            </div>
          </div>
        </div>
        <div className="box-item-dashboard-chart">
          <h5 className="header-chart-dash-board">Bookings Data For 30 Days</h5>
          <BarChart
            series={[
              {
                data: [
                  dataThirtyDay?.map((item: any) => {
                    return item?.total_amount || 0;
                  }),
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
            width={2000}
            leftAxis={null}
          />
        </div>
      </div>
    </div>
  );
};
export default DashBoard;
