import "./user.css";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { MdModeEditOutline } from "react-icons/md";
import { useLocation } from "react-router-dom";
import UserService from "../../services/user-services";
import ModalUser from "./modal-user/modal-user";
interface DataType {
  key: React.Key;
  Id: React.Key;
  Name: string;
  Email: string;
  Image: string;
  Status: number;
  Action?: any;
}
const User = () => {
  const location = useLocation();
  const [dataUser, setDataUser] = useState<any>();
  const [isOpenModalUser, setIsOpenModalUser] = useState<boolean>(false);
  const [dataIndexUser, setDataIndexUser] = useState<any>();
  const [callBackApi, setCallBackApi] = useState<boolean>(false);
  const columns: ColumnsType<DataType> = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "first_name",
      render(dataIndex, core: any) {
        return <p>{core.first_name + " " + core.last_name}</p>;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Image",
      dataIndex: "avatar",
      render: (dataIndex) => {
        return (
          <img src={dataIndex} alt="image user" className="avatar-user-admin" />
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render(dataIndex) {
        let value = "";
        let style = "";
        switch (dataIndex.toString()) {
          case "1":
            value = "Đang hoạt động";
            style = "Lime";
            break;
          case "2":
            value = "Đã block";
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
                <MdModeEditOutline onClick={() => setIsOpenModalUser(true)} />
              </div>
            </div>
          </>
        );
      },
    },
  ];
  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const handelCallBackApi = () => {
    setCallBackApi(!callBackApi);
  };
  const handleRowClick = (record: any) => {
    setDataIndexUser(record);
  };
  const handelClosePopup = () => {
    setIsOpenModalUser(false);
  };
  useEffect(() => {
    const getDataUser = async () => {
      try {
        const dataUserSerVices = new UserService();
        const getData = await dataUserSerVices.getAllUser();
        setDataUser([...getData.data]);
      } catch (error) {
        return error;
      }
    };
    getDataUser();
  }, [callBackApi]);
  return (
    <main className="table-user-admin">
      {isOpenModalUser ? (
        <ModalUser
          dataIndexUser={dataIndexUser}
          handelClosePopup={handelClosePopup}
          handelCallBackApi={handelCallBackApi}
        />
      ) : null}
      <div className="search-user-admin">
        <h1 className="header-admin">
          {location.pathname.slice(1).toLocaleUpperCase()}
        </h1>
        <span></span>
        <span></span>
      </div>
      <Table
        columns={columns}
        dataSource={dataUser}
        onChange={onChange}
        size="small"
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />
    </main>
  );
};
export default User;
