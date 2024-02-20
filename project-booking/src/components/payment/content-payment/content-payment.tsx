import "./content-payment.css";
import React, { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { CountryDropdown } from "react-country-region-selector";
import { Booking } from "../../../type/type";
import moment from "moment";
interface Props {
  dataRoom: any;
}
const ContentPayment: React.FC<Props> = (props: Props) => {
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const idUser = localStorage.getItem("tokenId");
  const getDataSes = JSON.parse(
    sessionStorage.getItem("data_search") as string
  );
  const [dataPayment, setDataPayment] = useState<Booking>({
    roomId: NaN,
    timeCheckIn: "",
    timeCheckOut: "",
    nameRoom: "",
    numberRooms: NaN,
    totalPrice: NaN,
    userId: NaN,
    firstName: "",
    lastName: "",
    email: "",
    phone: NaN,
    countryCode: "",
    address: "",
    country: "",
    city: "",
    numberUser: NaN,
    numberChild: NaN,
    cityCode: NaN,
  });
  const handelGetDataInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setDataPayment((prev: any) => ({
      ...prev,
      [name]: value,
      roomId: props.dataRoom.id,
      timeCheckIn: moment(getDataSes.timeCheckIn, "D/M/YYYY").format(
        "YYYY-MM-DD"
      ),
      timeCheckOut: moment(getDataSes.timeCheckOut, "D/M/YYYY").format(
        "YYYY-MM-DD"
      ),
      nameRoom: props.dataRoom.name,
      countryCode: phone,
      country: country,
      userId: Number(idUser),
      numberChild: getDataSes.numberChild,
      numberRooms: getDataSes.numberRooms,
      numberUser: getDataSes.numberUser,
      totalPrice:
        Number(getDataSes?.numberRooms) * Number(props.dataRoom?.price),
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
            name="firstName"
            value={dataPayment?.firstName}
            onChange={handelGetDataInput}
          ></input>
        </div>
        <div className="last-name-payment">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            onChange={handelGetDataInput}
            value={dataPayment?.lastName}
          ></input>
        </div>
      </div>
      <div className="input-email-payment">
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          onChange={handelGetDataInput}
          value={dataPayment?.email}
        ></input>
        <span className="confirm-additional-email">
          Please make sure this is your email. Because we will send check-in
          information through this email !
        </span>
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
          value={dataPayment?.address}
        ></input>
      </div>
      <div className="input-city-town">
        <label>City/Town</label>
        <input
          type="text"
          name="city"
          onChange={handelGetDataInput}
          value={dataPayment?.city}
        ></input>
      </div>
      <div className="input-postal-code">
        <label>Postal Code</label>
        <input
          type="text"
          name="cityCode"
          onChange={handelGetDataInput}
          value={dataPayment?.cityCode}
          placeholder="."
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
            name="phone"
            onChange={handelGetDataInput}
            value={dataPayment?.phone}
          ></input>
        </div>
      </div>
    </div>
  );
};
export default ContentPayment;
