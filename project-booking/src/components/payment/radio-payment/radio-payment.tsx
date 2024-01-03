import { Select, Space } from "antd";
import "./radio-payment.css";
import React from "react";
interface Props {
  handleChangeSelected: Function;
}
const RadioPayment: React.FC<Props> = (props: Props) => {
  return (
    <div className="box-radio-payment">
      <h2>How would you like to pay?</h2>
      <Space wrap>
        <Select
          defaultValue="Select Payment"
          style={{ width: 300, height: 50 }}
          onChange={(value) => props.handleChangeSelected(value)}
          className="select-payment-radio-card"
          options={[
            { value: "payCash", label: "Cash" },
            { value: "payCard", label: "Master Card" },
          ]}
          size="large"
        />
      </Space>
    </div>
  );
};
export default RadioPayment;
