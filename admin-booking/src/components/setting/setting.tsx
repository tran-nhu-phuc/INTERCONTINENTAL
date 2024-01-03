import "./setting.css";
import React from "react";
import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { title } from "process";
import { MdModeEditOutline } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { Outlet } from "react-router-dom";
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

const columns: ColumnsType<DataType> = [
  {
    title: "Id",
    dataIndex: "Id",
  },
  {
    title: "Name",
    dataIndex: "Name",
  },
  {
    title: "Cost",
    dataIndex: "Cost",
    sorter: (a, b) => a.Cost - b.Cost,
  },
  {
    title: "Image",
    dataIndex: "Image",
  },
  {
    title: "Stock",
    dataIndex: "Stock",
    sorter: (a, b) => a.Stock - b.Stock,
  },
  {
    title: "Price",
    dataIndex: "Price",
    sorter: (a, b) => a.Price - b.Price,
  },
  {
    title: "Action",
    dataIndex: "Action",
    render() {
      return (
        <>
          <div className="action-btn">
            <div className="btn-edit">
              <MdModeEditOutline />
            </div>
            <div className="btn-delete">
              <MdDeleteForever />
            </div>
          </div>
        </>
      );
    },
  },
];

const data: DataType[] = [
  {
    key: "1",
    Id: 1,
    Name: "John Brown",
    Cost: 32,
    Image: "New York No. 1 Lake Park",
    Stock: 100,
    Price: 10200,
    Status: 1,
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
const Setting = () => {
  return (
    <div className="table-booking">
      {" "}
      <Table columns={columns} dataSource={data} onChange={onChange} />
      <Outlet />
    </div>
  );
};
export default Setting;
