import { PayPalButtons } from "@paypal/react-paypal-js";
import OrderRepository from "../../../repositories/order-repositories";
import { message } from "antd";
import { Booking, Room } from "../../../type/type";
import { useNavigate, useParams } from "react-router-dom";
import RoomService from "../../../services/room-service";
import { useEffect, useState } from "react";
type Props = {
  amount: number;
};
const PaypalComponent = (props: Props) => {
  const { id } = useParams() as number | any;
  const navigate = useNavigate();
  const [dataRoom, setDataRoom] = useState<any>();
  const { amount } = props;
  const dataSes: Booking = JSON.parse(
    sessionStorage.getItem("data_payment") as string
  );
  const handlePaymentSuccess = async () => {
    try {
      message.success("Processing complete!");
      navigate("/booking", { state: "history" });
    } catch (error) {
      return message.error("Error post");
    }
  };
  return (
    <PayPalButtons
      style={{
        layout: "vertical",
        height: 48,
        color: "silver",
      }}
      createOrder={(_data, actions) => {
        {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: String(amount),
                },
                description: `Purchase at ${new Date().toLocaleString()}`,
              },
            ],
          });
        }
      }}
      onApprove={(_, actions): any => {
        return actions.order?.capture().then(() => handlePaymentSuccess());
      }}
    />
  );
};
export default PaypalComponent;
