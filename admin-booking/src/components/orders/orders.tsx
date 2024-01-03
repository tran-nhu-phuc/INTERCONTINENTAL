import "./orders.css";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { MdModeEditOutline } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import BookingService from "../../services/booking-services";
import { useLocation } from "react-router-dom";
import ModalOrder from "./modal/modal-order";
import Loading from "../loading/loading";
interface DataType {
  key: React.Key;
  IdProduct: number;
  IdUser: number;
  NameUser: string;
  ToTalPrice: number;
  Image: string;
  Quantity: number;
  Status: number;
  Action?: any;
}

const Orders = () => {
  const [dataCodeOrder, setDataCodeOrder] = useState<string>("");
  const [openPopupModelEdit, setOpenPopupModelEdit] = useState<boolean>(false);
  const [callBackApi, setCallBackApi] = useState<boolean>(false);
  const [getValueSearch, setGetValueSearch] = useState<any>();
  const handelCallBackApi = () => {
    setCallBackApi(!callBackApi);
  };
  const handleRowClick = (record: any) => {
    setDataCodeOrder(record);
  };
  const [dataBooking, setDataBooking] = useState<any>();
  const location = useLocation();
  const handelClosePopup = () => {
    setOpenPopupModelEdit(false);
  };

  useEffect(() => {
    const bookingServices = async () => {
      try {
        const dataBookingSerVices = new BookingService();
        let getDataBooking;
        if (getValueSearch === undefined) {
          getDataBooking = await dataBookingSerVices.getAllData();
        } else if (getValueSearch === "") {
          getDataBooking = await dataBookingSerVices.getAllData();
        } else {
          getDataBooking = await dataBookingSerVices.getByCondition(
            getValueSearch,
            "lastNameUserOrder"
          );
        }
        setDataBooking([...getDataBooking.data] || []);
      } catch (error) {}
    };
    bookingServices();
  }, [callBackApi, getValueSearch]);
  console.log(getValueSearch);

  const columns: ColumnsType<DataType> = [
    {
      title: "Id Room",
      dataIndex: "idRoom",
    },
    {
      title: "Code Booking",
      dataIndex: "codeOrder",
    },
    {
      title: "IdUser",
      dataIndex: "idUser",
    },
    {
      title: "NameUser",
      dataIndex: "lastNameUserOrder",
    },
    {
      title: "ToTalPrice",
      dataIndex: "totalPrice",
      sorter: (a: any, b: any) =>
        a.totalPrice * a.countRoom - b.totalPrice * b.countRoom,
      render: (dataIndex, record: any) => (
        <span>{Number(record.countRoom) * Number(dataIndex)} USD</span>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "countRoom",
      sorter: (a, b) => a.Quantity - b.Quantity,
    },
    {
      title: "Status",
      dataIndex: "statusBooking",
      render(dataIndex) {
        let value = "";
        let style = "";
        switch (dataIndex.toString()) {
          case "1":
            value = "Đang chờ nhận phòng";
            style = "orange";
            break;
          case "2":
            value = "Đã nhận phòng";
            style = "Lime";
            break;
          case "3":
            value = "Đã trả phòng";
            style = "black";
            break;
          case "4":
            value = "Phòng đã được hủy";
            style = "red";
            break;
        }
        return <p style={{ color: style }}>{value}</p>;
      },
    },
    {
      title: "Action",
      dataIndex: "Action",
      render() {
        return (
          <>
            <div className="action-btn">
              <div className="btn-edit">
                <MdModeEditOutline
                  onClick={() => setOpenPopupModelEdit(true)}
                />
              </div>
            </div>
          </>
        );
      },
    },
  ];
  return (
    <div className="table-order-admin">
      <div className="search-order-admin">
        <h1 className="header-admin">
          {location.pathname.slice(1).toLocaleUpperCase()}
        </h1>
        <input
          type="search"
          placeholder="search"
          onChange={(e: any) => setGetValueSearch(e.target.value)}
        ></input>
        <span></span>
      </div>
      <Table
        columns={columns}
        dataSource={dataBooking}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        size="small"
      />
      ;
      {openPopupModelEdit ? (
        <ModalOrder
          handelClosePopup={handelClosePopup}
          dataCodeOrder={dataCodeOrder}
          handelCallBackApi={handelCallBackApi}
        />
      ) : null}
    </div>
  );
};
export default Orders;
