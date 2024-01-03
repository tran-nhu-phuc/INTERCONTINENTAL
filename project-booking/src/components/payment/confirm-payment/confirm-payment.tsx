import "./confirm-payment.css";
const ConFirmPayment = () => {
  const getSes = JSON.parse(sessionStorage.getItem("data_payment") as string);
  return (
    <div className="box-confirm-payment">
      <h2>Guest details</h2>
      <div className="box-confirm-details">
        <div className="name-country-confirm-payment">
          <span>
            {getSes.firstNameUserOrder} {getSes.lastNameUserOrder}{" "}
          </span>
        </div>
        <div className="name-country-confirm-payment">
          <span>
            {getSes.cityTown},{getSes.address} {getSes.postalCode}{" "}
            {getSes.country}
          </span>
        </div>
        <div className="name-email-confirm-payment">
          <span>{getSes.emailAddress}</span>
        </div>
        <div className="name-phone-confirm-payment">
          <span>
            {getSes.codePhoneCountry} {getSes.phoneUserOrder}
          </span>
        </div>
      </div>
    </div>
  );
};
export default ConFirmPayment;
