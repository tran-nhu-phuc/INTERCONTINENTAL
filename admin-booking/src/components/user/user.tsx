import "./user.css";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Input,
  InputRef,
  Space,
  Table,
  TableColumnType,
  TableColumnsType,
} from "antd";
import type { TableProps } from "antd/es/table";
import { MdModeEditOutline } from "react-icons/md";
import { useLocation } from "react-router-dom";
import UserService from "../../services/user-services";
import ModalUser from "./modal-user/modal-user";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { FilterDropdownProps } from "antd/es/table/interface";
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
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
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
  const column: TableColumnsType<any> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: "5%",
      ...getColumnSearchProps("id"),
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "fistName",
      key: "fistName",
      width: "10%",
      ...getColumnSearchProps("Name"),
      render(dataIndex, core: any) {
        return (
          <>
            <p>{core?.firstName + " " + core?.lastName}</p>
          </>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ["descend", "ascend"],
      width: "15%",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      ...getColumnSearchProps("phone"),
      sorter: (a, b) => a.phone.length - b.phone.length,
      sortDirections: ["descend", "ascend"],
      width: "15%",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      render: (dataIndex) => {
        return (
          <img src={dataIndex} alt="image user" className="avatar-user-admin" />
        );
      },
      width: "10%",
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "10%",
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
      width: "10%",
      render() {
        return (
          <>
            <div className="action-btn-change-user">
              <div className="btn-edit">
                <MdModeEditOutline onClick={() => setIsOpenModalUser(true)} />
              </div>
            </div>
          </>
        );
      },
    },
  ];
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
          {location?.pathname.slice(1).toLocaleUpperCase()}
        </h1>
        <span></span>
        <span></span>
      </div>
      <Table
        columns={column}
        dataSource={dataUser}
        onChange={onChange}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />
      ;
    </main>
  );
};
export default User;
