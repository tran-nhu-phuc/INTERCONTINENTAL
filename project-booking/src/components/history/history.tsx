import "./history.css";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { Booking } from "../../type/type";
import OrderRepository from "../../repositories/order-repositories";
const columnsHistory: ColumnsType<any> = [
  {
    title: "Room Code",
    dataIndex: "codeOrder",
  },
  {
    title: "Name Guest",
    dataIndex: "lastNameUserOrder",
  },
  {
    title: "Date Booking",
    dataIndex: "getDateNow",
  },
  {
    title: "Phone Number",
    dataIndex: "phoneUserOrder",
  },
  {
    title: "Count Room",
    dataIndex: "countRoom",
  },
  {
    title: "Cost Room",
    dataIndex: "costRoom",
  },
  {
    title: "Status Booking",
    dataIndex: "statusBooking",
    sorter: (a, b) => a.totalPrice - b.totalPrice,
  },
  {
    title: "ToTal Price",
    dataIndex: "totalPrice",
    sorter: (a, b) => a.totalPrice - b.totalPrice,
  },
  {
    title: "Details",
    dataIndex: "details",
    render() {
      return <button className="btn-details-history">Details</button>;
    },
  },
  {
    title: "See reviews",
    dataIndex: "See reviews",
    render: () => {
      return <button className="see-comment">Xem đánh giá</button>;
    },
  },
];
const HistoryBooking = () => {
  const [getDataBooking, setGetDataBooking] = useState<Booking[]>([]);
  const getSes = JSON.parse(localStorage.getItem("tokenId") as string);
  useEffect(() => {
    const getByIdBooking = async () => {
      const getDataServices = new OrderRepository();
      try {
        const dataById = await getDataServices.getByCondition("idUser", getSes);
        setGetDataBooking([...dataById.data]);
      } catch (error) {}
    };
    getByIdBooking();
  }, []);
  console.log(getDataBooking);

  return (
    <div className="table-history">
      <h2>Your History</h2>
      <Table
        columns={columnsHistory}
        dataSource={getDataBooking}
        size="large"
      />
    </div>
  );
};
export default HistoryBooking;
