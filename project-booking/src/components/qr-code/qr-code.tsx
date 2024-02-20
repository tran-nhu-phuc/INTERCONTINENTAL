import React from "react";
import { Button, QRCode } from "antd";
import "./qr-code.css";
import OrderService from "../../services/order-service";
import toast from "react-hot-toast";
const downloadQRCode = () => {
  const canvas = document
    .getElementById("myqrcode")
    ?.querySelector<HTMLCanvasElement>("canvas");
  if (canvas) {
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.download = "QRCode.png";
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};
interface Props {
  handleModelQrCode: Function;
  handleCallApiBooking: Function;
}
const QrCode: React.FC<Props> = (props: Props) => {
  const dataBooking = JSON.parse(
    localStorage.getItem("data_booking") as string
  );
  const handleRemoveBooking = async () => {
    try {
      const bookingService = new OrderService();
      const result = await bookingService.removeBooking(
        Number(dataBooking?.bookingId)
      );
      if (result?.data[0] === 1) {
        toast.success("Success Cancel Room");
        props.handleCallApiBooking();
        props.handleModelQrCode(false);
      } else {
        toast.error("Fail Cancel Room");
      }
    } catch (error) {
      toast.error("Error Cancel");
      console.log(error);
    }
  };
  return (
    <div className="box-qr-code">
      <div className="table-qr-code">
        <img src="/asset/image-header-home/image-header-home-3.svg" alt="" />
        <h5>Show QR to check in</h5>
        <div id="myqrcode">
          <QRCode
            value="https://localhost:3000/qr-code"
            bgColor="#ffff"
            style={{ marginBottom: 16 }}
            size={250}
          />
          <Button type="primary" onClick={downloadQRCode}>
            Download
          </Button>
          <button
            className="btn-out-booking-item"
            onClick={handleRemoveBooking}
          >
            Cancel the room
          </button>
        </div>
        <button
          className="close-model-qr-code"
          onClick={() => props.handleModelQrCode(false)}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default QrCode;
