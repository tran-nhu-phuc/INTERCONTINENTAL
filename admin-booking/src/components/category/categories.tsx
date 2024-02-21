import "./categories.css";
import { useEffect, useRef, useState } from "react";
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
import { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import CategoryServices from "../../services/category-services";
import { MdDelete } from "react-icons/md";
import { SearchOutlined } from "@ant-design/icons";
import ModelCategory from "./model-category/model-category";
import toast from "react-hot-toast";
const Category = () => {
  const [dataCategory, setDataCategory] = useState<any>();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [isOpenModel, setIsOpenModel] = useState<boolean>(false);
  const searchInput = useRef<InputRef>(null);
  const [callBackApi, setCallBackApi] = useState<boolean>(false);
  const [dataIndex, setDataIndex] = useState<any>();
  const handleDeleteCategory = async (id: number) => {
    try {
      if (dataIndex) {
        const categoryService = new CategoryServices();
        const result = await categoryService.removeCategory(id);
        if (result?.status === 204) {
          handleCallBackApi();
        } else {
          toast.error("Fail Delete");
        }
      } else {
        toast.error("Error Data");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleRowClick = (dataIndex: any) => {
    setDataIndex(dataIndex);
  };
  const handleCallBackApi = () => {
    setCallBackApi(!callBackApi);
  };
  const handleOpenPopUp = (status: boolean) => {
    setIsOpenModel(status);
  };
  useEffect(() => {
    const handleCallApi = async () => {
      try {
        const categoryService = new CategoryServices();
        const result = await categoryService.getAll();
        setDataCategory([...result?.data]);
      } catch (error) {
        console.log(error);
      }
    };
    handleCallApi();
  }, [callBackApi]);
  const confirm = () => {
    message.success("Click on Yes");
    handleDeleteCategory(dataIndex?.id);
  };

  const cancel = () => {
    message.error("Click on No");
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
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: "7%",
      ...getColumnSearchProps("id"),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Time Create",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "20%",
      ...getColumnSearchProps("createdAt"),
      sorter: (a, b) => a.createdAt - b.createdAt,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Time Update",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: "20%",
      ...getColumnSearchProps("updatedAt"),
      sorter: (a, b) => a.updatedAt - b.updatedAt,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Action",
      dataIndex: "Action",
      width: "10%",
      render(dataIndex, record) {
        return (
          <>
            <div className="action-btn">
              <div className="btn-edit">
                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this task?"
                  onConfirm={confirm}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    danger
                    style={{
                      border: "none",
                      boxShadow: "none",
                    }}
                  >
                    <MdDelete
                      style={{
                        cursor: "pointer",
                        fontSize: "25px",
                      }}
                    />
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
    <div className="table-order-admin">
      <div className="search-order-admin">
        <h1 className="header-admin">Category</h1>
        <span></span>
        <button
          className="create-category"
          onClick={() => handleOpenPopUp(true)}
        >
          Create
        </button>
      </div>
      {isOpenModel ? (
        <ModelCategory
          handleOpenPopUp={handleOpenPopUp}
          handleCallBackApi={handleCallBackApi}
        />
      ) : null}
      <Table
        columns={column}
        dataSource={dataCategory}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />
    </div>
  );
};
export default Category;
