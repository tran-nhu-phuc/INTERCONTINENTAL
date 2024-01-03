import "./content-payment.css";
import React, { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { CountryDropdown } from "react-country-region-selector";
import { Booking, Room } from "../../../type/type";
import { useParams } from "react-router-dom";
interface Props {
  dataRoom: Room;
}
const ContentPayment: React.FC<Props> = (props: Props) => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const fulDay = `${day}/${month}/${year}`;
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const { v4: uuidv4 } = require("uuid");
  const { id } = useParams();
  const curDate = new Date();
  const idUser = localStorage.getItem("tokenId");
  const getDataSes = JSON.parse(
    sessionStorage.getItem("data_search") as string
  );
  const [dataPayment, setDataPayment] = useState<Booking>({
    phoneUserOrder: "",
    firstNameUserOrder: "",
    lastNameUserOrder: "",
    codeOrder: "",
    countRoom: NaN,
    idRoom: NaN,
    idUser: NaN,
    timeBooking: "",
    emailAddress: "",
    totalPrice: NaN,
    address: "",
    cityTown: "",
    postalCode: "",
    statusBooking: 1,
    codePhoneCountry: "",
    dateStartRoom: "",
    dateEndRoom: "",
    country: "",
    countUser: NaN,
    countChild: NaN,
    pay: 2,
    getDateNow: fulDay,
  });
  const handelGetDataInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setDataPayment((prev: any) => ({
      ...prev,
      [name]: value,
      codePhoneCountry: phone,
      country: country,
      codeOrder: uuidv4(),
      idRoom: id,
      idUser: idUser,
      countChild: getDataSes.countChild,
      countRoom: getDataSes.numberRoom,
      timeBooking: curDate.getHours() + ":" + curDate.getMinutes(),
      countUser: getDataSes.countUser,
      dateEndRoom: getDataSes.dateEnd,
      dateStartRoom: getDataSes.dataStart,
      totalPrice: Number(getDataSes.numberRoom) * Number(props.dataRoom.cost),
    }));
  };
  sessionStorage.setItem(
    "data_payment",
    JSON.stringify({
      ...dataPayment,
    })
  );
  return (
    <div className="content-payment-step-2">
      <div className="content-header-payment">
        <h2>You selected an IHG® One Rewards member rate.</h2>
      </div>
      <div className="input-name-payment">
        <div className="first-name-payment">
          <label>First Name</label>
          <input
            type="text"
            name="firstNameUserOrder"
            value={dataPayment.firstNameUserOrder}
            onChange={handelGetDataInput}
          ></input>
        </div>
        <div className="last-name-payment">
          <label>Last Name</label>
          <input
            type="text"
            name="lastNameUserOrder"
            onChange={handelGetDataInput}
            value={dataPayment.lastNameUserOrder}
          ></input>
        </div>
      </div>
      <div className="input-email-payment">
        <label>Email Address</label>
        <input
          type="email"
          name="emailAddress"
          onChange={handelGetDataInput}
          value={dataPayment.emailAddress}
        ></input>
      </div>
      <div className="input-country-payment">
        <label>Country/Region</label>
        <CountryDropdown
          value={country}
          onChange={(val) => setCountry(val)}
          classes="select-country-payment"
        />
      </div>
      <div className="address-guest-payment">
        <label>Address</label>
        <input
          type="text"
          name="address"
          onChange={handelGetDataInput}
          value={dataPayment.address}
        ></input>
      </div>
      <div className="input-city-town">
        <label>City/Town</label>
        <input
          type="text"
          name="cityTown"
          onChange={handelGetDataInput}
          value={dataPayment.cityTown}
        ></input>
      </div>
      <div className="input-postal-code">
        <label>Postal Code</label>
        <input
          type="text"
          name="postalCode"
          onChange={handelGetDataInput}
          value={dataPayment.postalCode}
        ></input>
      </div>
      <div className="input-phone-payment">
        <div className="phone-number-country-payment">
          <label>Country/Region code</label>
          <PhoneInput
            className="select-flag-country"
            defaultCountry="ua"
            value={phone}
            onChange={(phone) => setPhone(phone)}
            inputClassName="input-phone-number-country-payment"
          />
        </div>
        <div className="phone-number-payment">
          <label>Phone Number</label>
          <input
            type="number"
            name="phoneUserOrder"
            onChange={handelGetDataInput}
            value={dataPayment.phoneUserOrder}
          ></input>
        </div>
      </div>
    </div>
  );
};
export default ContentPayment;
