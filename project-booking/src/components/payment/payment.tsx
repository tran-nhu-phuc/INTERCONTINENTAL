import "./payment.css";
import React, { useEffect, useState } from "react";
import { Button, message, Steps, theme } from "antd";
import SideBarPayment from "./sidebar-payment/sidebar-paymen";
import ContentPayment from "./content-payment/content-payment";
import TexJoinUs from "./text-join-us/text-join-us";
import SelectContent from "./select-content/select-content";
import ConFirmPayment from "./confirm-payment/confirm-payment";
import { useNavigate, useParams } from "react-router-dom";
import RoomService from "../../services/room-service";
import RadioPayment from "./radio-payment/radio-payment";
import PaypalComponent from "./paypal/paypal";
import { Booking } from "../../type/type";
import OrderService from "../../services/order-service";
import Voucher from "../voucher/voucher";
import toast from "react-hot-toast";
const Payment = () => {
  const navigate = useNavigate();
  const dataSes: Booking = JSON.parse(
    sessionStorage.getItem("data_payment") as string
  );
  const [current, setCurrent] = useState<number>(0);
  const [dataRoom, setDataRoom] = useState<any>();
  const [valueSelected, setValueSelected] = useState<string>("");
  const { id } = useParams() as string | any;
  const [isOpenVoucher, setIsOpenVoucher] = useState<boolean>(false);
  const [voucherDiscount, setVoucherDiscount] = useState<number>(0);
  const handleVoucherDiscount = (discount: number) => {
    setVoucherDiscount(discount);
  };
  const handleOpenVoucher = (status: boolean) => {
    setIsOpenVoucher(status);
  };
  const handelPostBooking = async () => {
    try {
      const postDataBooking = new OrderService();
      await postDataBooking.postBooking({
        ...dataSes,
        paymentType: 1,
      });
      message.success("Processing complete!");
      navigate("/booking");
    } catch (error) {
      toast.error("Error");
      console.log(message.error("Error post"));
    }
  };
  const handleChangeSelected = (value: string) => {
    setValueSelected(value);
  };
  const steps = [
    {
      title: "Your details",
      content: <ContentPayment dataRoom={dataRoom} />,
    },
    {
      title: "Your Confirm",
      content: <ConFirmPayment />,
    },
    {
      title: "Final step",
      content: <RadioPayment handleChangeSelected={handleChangeSelected} />,
    },
  ];
  const handelInputPayment = () => {
    window.scroll(0, 0);
  };
  const next = () => {
    handelInputPayment();
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const roomServices: RoomService = new RoomService();
  useEffect(() => {
    const getRoomById = async () => {
      try {
        const dataRoomService = await roomServices.getInformation(id);
        setDataRoom(dataRoomService?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRoomById();
  }, []);
  const items = steps.map((item) => ({ key: item?.title, title: item?.title }));
  return (
    <div className="payment-table">
      <Steps current={current} items={items} className="step-payment" />
      <div className="content-payment">
        <div className="content-payment-table-booking">
          {steps[current].content}
          <div className="pay-with-paypal">
            <h2>Payment with Paypal</h2>
            <strong>Reserve with Payment Card</strong>
            <p>
              Your room will be held until your arrival on the day of your
              check-in.
            </p>
            <div className="image-pay-with-payment">
              <img
                src="https://th.bing.com/th/id/R.c01292cdd7f51d3520c75031fc479c2b?rik=0qZxmR9AXGhBdw&pid=ImgRaw&r=0"
                alt="paypal"
              ></img>
            </div>
          </div>
          <div className="join-u-payments">
            <TexJoinUs />
          </div>
          <div className="select-payment-content">
            <SelectContent />
          </div>
        </div>
        <div className="side-payment">
          <SideBarPayment
            dataRoom={dataRoom}
            handleOpenVoucher={handleOpenVoucher}
            voucherDiscount={voucherDiscount}
          />
        </div>
      </div>
      <div style={{ marginTop: 24 }} className="next-payment">
        {current < steps?.length - 1 && (
          <Button
            type="primary"
            onClick={() => next()}
            className="done-complete-payment"
          >
            Continue
          </Button>
        )}
        {current === steps?.length - 1 &&
          (valueSelected === "payCard" ? (
            <PaypalComponent
              amount={
                (1 - Number(voucherDiscount) / 100) *
                Number(dataSes?.totalPrice)
              }
            />
          ) : (
            <Button
              type="primary"
              onClick={() => handelPostBooking()}
              className="done-complete-payment"
            >
              Complete payment
            </Button>
          ))}
        {current > 0 && (
          <Button onClick={() => prev()} className="come-back-payment">
            Back
          </Button>
        )}
      </div>
      {isOpenVoucher ? (
        <Voucher
          handleOpenVoucher={handleOpenVoucher}
          handleVoucherDiscount={handleVoucherDiscount}
        />
      ) : null}
    </div>
  );
};
export default Payment;
