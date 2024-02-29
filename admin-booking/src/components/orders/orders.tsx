import "./orders.css";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Input,
  InputRef,
  Space,
  Table,
  TableColumnType,
  TableColumnsType,
} from "antd";
import { MdModeEditOutline } from "react-icons/md";
import BookingService from "../../services/booking-services";
import { useLocation } from "react-router-dom";
import ModalOrder from "./modal/modal-order";
import { SearchOutlined } from "@ant-design/icons";
import { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
const Orders = () => {
  const [dataCodeOrder, setDataCodeOrder] = useState<string>("");
  const [openPopupModelEdit, setOpenPopupModelEdit] = useState<boolean>(false);
  const [callBackApi, setCallBackApi] = useState<boolean>(false);
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
        const getDataBooking = await dataBookingSerVices.getAllData();
        setDataBooking([...getDataBooking.data] || []);
      } catch (error) {
        console.log(error);
      }
    };
    bookingServices();
  }, [callBackApi]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: any
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex: any): TableColumnType<any> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record: any) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const column: TableColumnsType<any> = [
    {
      title: "Id Room",
      dataIndex: "roomId",
      key: "roomId",
      width: "7%",
      ...getColumnSearchProps("roomId"),
    },
    {
      title: "Booking Code",
      dataIndex: "code",
      key: "code",
      width: "20%",
      ...getColumnSearchProps("code"),
      ...getColumnSearchProps("code"),
    },
    {
      title: "User Id",
      dataIndex: "userId",
      key: "userId",
      width: "7%",
      ...getColumnSearchProps("userId"),
      sorter: (a, b) => a.userId.length - b.userId.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Name Room",
      dataIndex: "nameRoom",
      key: "nameRoom",
      width: "20%",
      ...getColumnSearchProps("nameRoom"),
      sorter: (a, b) => a.nameRoom.length - b.nameRoom.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Count Room",
      dataIndex: "numberRooms",
      key: "numberRooms",
      width: "8%",
      ...getColumnSearchProps("numberRooms"),
      sorter: (a, b) => a.numberRooms.length - b.numberRooms.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Before Voucher",
      dataIndex: "firstPrice",
      key: "firstPrice",
      width: "10%",
      ...getColumnSearchProps("firstPrice"),
      sorter: (a, b) => a?.firstPrice - b?.firstPrice,
      sortDirections: ["descend", "ascend"],
      render(value, record, index) {
        return (
          <>
            <span>{value} USD</span>
          </>
        );
      },
    },
    {
      title: "ToTalPrice",
      dataIndex: "totalPrice",
      key: "totalPrice",
      width: "5%",
      ...getColumnSearchProps("totalPrice"),
      sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
      sortDirections: ["descend", "ascend"],
      render(value, record, index) {
        return (
          <>
            <span>{value} USD</span>
          </>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "13%",
      render(dataIndex) {
        let value = "";
        let style = "";
        switch (dataIndex?.toString()) {
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
        }
        return <p style={{ color: style }}>{value}</p>;
      },
    },
    {
      title: "Is Delete",
      dataIndex: "isDelete",
      width: "15%",
      render(dataIndex) {
        let value = "";
        let style = "";
        switch (dataIndex) {
          case false:
            value = "Đang hoạt động";
            style = "green";
            break;
          case true:
            value = "phòng đã hủy";
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
                  style={{ cursor: "pointer", fontSize: "25px" }}
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
        <span></span>
        <span></span>
      </div>
      <Table
        columns={column}
        dataSource={dataBooking}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />
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
