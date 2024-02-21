import "./room.css";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Input,
  InputRef,
  Popconfirm,
  Space,
  Table,
  TableColumnType,
  TableColumnsType,
  message,
} from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { MdModeEditOutline } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import RoomSerVices from "../../services/room-services";
import { useLocation } from "react-router-dom";
import ModalImageRoom from "./modal-image-room/modal-image-room";
import ModalRoom from "./modal-room/modal-room";
import toast from "react-hot-toast";
import { FilterDropdownProps } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
const Room = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataIndexRoom, setDataIndexRoom] = useState<any>();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [callBackApi, setCallBackApi] = useState<boolean>(false);
  const [callBackApiDelete, setCallBackApiDelete] = useState<Boolean>(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const handelCallBackApi = () => {
    setCallBackApi(!callBackApi);
  };
  const location = useLocation();
  const handelCancelEdit = () => {
    setOpenModalEdit(false);
  };
  const handleRowClick = (record: any) => {
    setDataIndexRoom(record);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const confirm = (core: any) => {
    message.success("Click on Yes");
    handleRemoveRoom(core);
    setCallBackApiDelete(!callBackApiDelete);
  };
  const handleRemoveRoom = async (core: any) => {
    try {
      const roomService = new RoomSerVices();
      const result = await roomService.deleteRoom(Number(core?.id));
      if (result?.status === 204) {
        handelCallBackApi();
        toast.success("Success Delete ");
      } else {
        toast.success("Fail Delete ");
      }
    } catch (error) {
      toast.success("Error Delete ");
      console.log(error);
    }
  };
  const cancel = () => {
    message.error("Click on No");
  };
  const [dataRoom, setDataRoom] = useState<any>();
  useEffect(() => {
    const getDataRoom = async () => {
      try {
        const roomSerVices = new RoomSerVices();
        const getDataRoom = await roomSerVices.getAllRoom();
        setDataRoom([...getDataRoom.data]);
      } catch (error) {
        throw error;
      }
    };
    getDataRoom();
  }, [callBackApi, callBackApiDelete]);

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
    onFilter: (value, record) =>
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
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: "5%",
      ...getColumnSearchProps("id"),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "10%",
      ...getColumnSearchProps("price"),
      sorter: (a, b) => a?.price - b?.price,
      sortDirections: ["descend", "ascend"],
      render(dataIndex) {
        return <p>{dataIndex + " USD"}</p>;
      },
    },
    {
      title: "Image",
      dataIndex: "image",
      width: "10%",

      render: (dataIndex: any, record: any) => {
        return (
          <div>
            <button
              onClick={() => {
                setIsModalOpen(true);
              }}
              className="view-image-room"
            >
              View Image
            </button>
            {isModalOpen ? (
              <ModalImageRoom
                handleCancel={handleCancel}
                dataImage={dataIndexRoom}
              />
            ) : null}
          </div>
        );
      },
    },
    {
      title: "Stock",
      dataIndex: "stock",
      width: "5%",

      ...getColumnSearchProps("stock"),
      sorter: (a, b) => a?.stock - b?.stock,
    },
    {
      title: "Action",
      dataIndex: "Action",
      width: "10%",

      render(dataIndex: any, record: any) {
        return (
          <>
            <div className="action-btn-change">
              <div className="btn-edit">
                <MdModeEditOutline onClick={() => setOpenModalEdit(true)} />
              </div>
              <div className="btn-delete">
                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this task?"
                  onConfirm={() => confirm(record)}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button size="large">
                    <MdDeleteForever />
                  </Button>
                </Popconfirm>
              </div>
            </div>
          </>
        );
      },
    },
  ];
  return (
    <div className="table-product-admin">
      <div className="search-product-admin">
        {openModalEdit ? (
          <ModalRoom
            handelCancelEdit={handelCancelEdit}
            dataIndexRoom={dataIndexRoom}
            handelCallBackApi={handelCallBackApi}
          />
        ) : null}
        <h1 className="header-admin">
          {location.pathname.slice(1).toLocaleUpperCase()}
        </h1>
        <span></span>
        <span></span>
      </div>
      <Table
        columns={column}
        dataSource={dataRoom}
        size="small"
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />
      ;
    </div>
  );
};
export default Room;
