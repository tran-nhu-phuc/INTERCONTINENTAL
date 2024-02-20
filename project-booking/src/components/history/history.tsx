import "./history.css";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { Booking } from "../../type/type";
import { useNavigate } from "react-router-dom";
import RoomDetails from "../booking/room-details/room-details";
import RoomService from "../../services/room-service";
import OrderService from "../../services/order-service";

const HistoryBooking = () => {
  const [getDataBooking, setGetDataBooking] = useState<Booking[]>([]);
  const userId = JSON.parse(localStorage.getItem("tokenId") as string);
  const [dataRoom, setDataRoom] = useState<any>();
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);
  const navigate = useNavigate();
  const handelOpenPopup = (status: boolean) => {
    setIsOpenDetail(status);
  };
  const handleRowDetail = async (record: any) => {
    console.log(record);
    try {
      const getDataServices = new RoomService();
      const result = await getDataServices.getInformation(
        Number(record?.roomId)
      );
      setDataRoom(result?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getByIdBooking = async () => {
      const getDataServices = new OrderService();
      try {
        const result = await getDataServices.getAllByUser(userId);
        setGetDataBooking([...result.data]);
      } catch (error) {
        console.log(error);
      }
    };
    getByIdBooking();
  }, []);
  const columnsHistory: ColumnsType<any> = [
    {
      title: "Room Code",
      dataIndex: "code",
    },
    {
      title: "Date Booking",
      dataIndex: "createdAt",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
    },
    {
      title: "Count Room",
      dataIndex: "numberRooms",
    },
    {
      title: "Status Booking",
      dataIndex: "status",
      sorter: (a, b) => a.status - b.status,
      render(status) {
        let result;
        let style;
        switch (status) {
          case 1:
            result = "Đang chờ nhận phòng";
            style = "black";
            break;
          case 2:
            result = "Đã nhận phòng";
            style = "green";
            break;
          case 3:
            style = "red";
            result = "Đã trả phòng";
            break;
          default:
            break;
        }
        return (
          <button className="btn-details-history" style={{ color: style }}>
            {result}
          </button>
        );
      },
    },
    {
      title: "Delete",
      dataIndex: "bookingDelete",
      sorter: (a, b) => a.bookingDelete - b.bookingDelete,
      render(bookingDelete) {
        let result;
        let style;
        switch (bookingDelete) {
          case 1:
            style = "red";
            result = "Phòng đã được hủy";
            break;
          case 0:
            style = "green";
            result = "Phòng đang hoạt động";
            break;
          default:
            break;
        }
        return <p style={{ color: style }}>{result}</p>;
      },
    },
    {
      title: "ToTal Price",
      dataIndex: "totalPrice",
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
    {
      title: "Details",
      dataIndex: "details",
      render(dataIndex, record) {
        return (
          <button
            style={{ cursor: "pointer", outline: "none" }}
            className="btn-details-history"
            onClick={async () => {
              await handleRowDetail(record);
              handelOpenPopup(true);
            }}
          >
            Details
          </button>
        );
      },
    },
    {
      title: "See reviews",
      dataIndex: "See reviews",
      render: (dataIndex, record) => {
        return (
          <button
            style={{ cursor: "pointer", outline: "none" }}
            className="see-comment"
            onClick={() => {
              navigate(`/comment/${record?.roomId}`);
            }}
          >
            Xem đánh giá
          </button>
        );
      },
    },
  ];
  return (
    <div className="table-history">
      <h2>Your History</h2>
      <Table
        columns={columnsHistory}
        dataSource={getDataBooking}
        size="large"
      />
      {isOpenDetail ? (
        <RoomDetails
          handelOpenPopup={handelOpenPopup}
          dataRoom={dataRoom}
          selectedImage={dataRoom?.imageRooms[0]}
        />
      ) : null}
    </div>
  );
};
export default HistoryBooking;
