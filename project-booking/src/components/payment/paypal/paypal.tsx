import { PayPalButtons } from "@paypal/react-paypal-js";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
type Props = {
  amount: number;
};
const PaypalComponent = (props: Props) => {
  const navigate = useNavigate();
  const { amount } = props;
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
