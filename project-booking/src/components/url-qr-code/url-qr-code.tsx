import "./url-qr-code.css";
const UrlQrCode = () => {
  const dataBooking: any = JSON.parse(
    localStorage.getItem("data_booking") as string
  );
  return (
    <div className="content-data-qr-code">
      <div>
        <p>Code : </p> <p>{dataBooking?.code}</p>
      </div>
      <div>
        <p>Count Room : </p>
        {""}
        <p> {dataBooking?.numberRooms}</p>
      </div>
      <div>
        <p>Name Room : </p>
        <p> {dataBooking?.nameRoom} </p>
      </div>
    </div>
  );
};
export default UrlQrCode;
