import "./room.css";
import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Table, message } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { MdModeEditOutline } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import RoomSerVices from "../../services/room-services";
import { useLocation } from "react-router-dom";
import ModalImageRoom from "./modal-image-room/modal-image-room";
import { IoMdOpen } from "react-icons/io";
import ModalRoom from "./modal-room/modal-room";
import toast from "react-hot-toast";
interface DataType {
  key: React.Key;
  Id: React.Key;
  Name: string;
  Cost: number;
  Image: string;
  Stock: number;
  Price: number;
  Status: number;
  Action?: any;
}

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};
const Room = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataIndexRoom, setDataIndexRoom] = useState<any>();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [callBackApi, setCallBackApi] = useState<boolean>(false);
  const [callBackApiDelete, setCallBackApiDelete] = useState<Boolean>(false);
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
  const confirm = () => {
    message.success("Click on Yes");
    handelDeleteRoom();
    setCallBackApiDelete(!callBackApiDelete);
  };

  const cancel = () => {
    message.error("Click on No");
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Cost",
      dataIndex: "cost",
      sorter: (a, b) => a.Cost - b.Cost,
      render(dataIndex) {
        return <p>{dataIndex + " USD"}</p>;
      },
    },
    {
      title: "Image",
      dataIndex: "image",
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
      sorter: (a, b) => a.Stock - b.Stock,
    },
    {
      title: "Action",
      dataIndex: "Action",
      render() {
        return (
          <>
            <div className="action-btn">
              <div className="btn-edit">
                <MdModeEditOutline onClick={() => setOpenModalEdit(true)} />
              </div>
              <div className="btn-delete">
                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this task?"
                  onConfirm={confirm}
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
  const handelDeleteRoom = async () => {
    const dataRoomServices = new RoomSerVices();
    try {
      await dataRoomServices.deleteRoom(dataIndexRoom.id);
    } catch (error) {
      toast.error("lỗi 404");
    }
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
        columns={columns}
        dataSource={dataRoom}
        onChange={onChange}
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
