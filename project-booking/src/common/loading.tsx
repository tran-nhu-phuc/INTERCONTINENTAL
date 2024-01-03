import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import "./loading.css";
const Loading = () => {
  return (
    <div className="box-loading">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} />
    </div>
  );
};

export default Loading;
