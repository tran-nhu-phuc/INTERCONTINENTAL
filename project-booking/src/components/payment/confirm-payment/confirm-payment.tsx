import "./confirm-payment.css";
const ConFirmPayment = () => {
  const getSes = JSON.parse(sessionStorage.getItem("data_payment") as string);
  return (
    <div className="box-confirm-payment">
      <h2>Guest details</h2>
      <div className="box-confirm-details">
        <div className="name-country-confirm-payment">
          <span>
            {getSes.firstName} {getSes.lastName}{" "}
          </span>
        </div>
        <div className="name-country-confirm-payment">
          <span>
            {getSes.city},{getSes.address} {getSes.cityCode} {getSes.country}
          </span>
        </div>
        <div className="name-email-confirm-payment">
          <span>{getSes.email}</span>
        </div>
        <div className="name-phone-confirm-payment">
          <span>
            {getSes.countryCode} {getSes.phone}
          </span>
        </div>
      </div>
    </div>
  );
};
export default ConFirmPayment;
