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
  console.log(dataBooking);

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
        <img
          src="https://th.bing.com/th/id/R.dac6ac7b9b93ade37f386b44c27fa8e0?rik=7fkA4FhB0QWV8g&pid=ImgRaw&r=0"
          alt=""
        />
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
          {dataBooking?.paymentType == 1 ? (
            <button
              className="btn-out-booking-item"
              onClick={handleRemoveBooking}
            >
              Cancel the room
            </button>
          ) : (
            <span></span>
          )}
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
