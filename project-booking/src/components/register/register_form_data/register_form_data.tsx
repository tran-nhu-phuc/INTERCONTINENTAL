import React, { useEffect, useState } from "react";
import { User } from "../../../type/type";
interface Props {
  getInputFormData: Function;
  dataFormUser: any;
  handelButtonRegister: Function;
}
interface ValidateData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  passwordAgain: string;
}
type InputName = keyof ValidateData;
const RegisterFormData: React.FC<Props> = (props: Props) => {
  const [dataPasswordAgain, setDataPasswordAgain] = useState("");
  const [validateForm, setValidateForm] = useState<ValidateData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    passwordAgain: "",
  });
  const [errorValidate, setErrorValidate] = useState<ValidateData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    passwordAgain: "",
  });
  const validateField = (name: InputName, value: string): boolean => {
    let isValid = true;
    let errorMessage = "";
    switch (name) {
      case "firstName":
      case "lastName":
      case "phone":
        isValid = value.trim() !== "";
        errorMessage = isValid ? "" : `Please enter a ${name}`;
        break;
      case "email":
        isValid = /^\S+@\S+\.\S+$/.test(value);
        errorMessage = isValid ? "" : "Invalid email address";
        break;
      case "password":
        isValid =
          value.trim() !== "" && value.length >= 6 && value.length <= 25;
        errorMessage = isValid
          ? ""
          : "Password must be between 6 and 25 characters";
        break;
      case "passwordAgain":
        isValid = value.trim() !== "" && value === validateForm.password;
        errorMessage = isValid ? "" : "Passwords do not match";
        break;
    }
    setErrorValidate((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));

    return isValid;
  };
  const handelFormRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    props.getInputFormData({
      ...props.dataFormUser,
      [name]: value,
    });
    setValidateForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateField(name as InputName, value);
  };
  useEffect(() => {
    validateField("passwordAgain", dataPasswordAgain);
  }, [dataPasswordAgain]);
  const statusErrorForm = () => {
    if (
      errorValidate.firstName === "" &&
      errorValidate.lastName === "" &&
      errorValidate.email === "" &&
      errorValidate.password === "" &&
      errorValidate.passwordAgain === ""
    ) {
      props.handelButtonRegister(true);
    } else {
      props.handelButtonRegister(false);
    }
  };
  statusErrorForm();
  return (
    <div className="input-register">
      <div className="fist-name-register">
        <label>Họ *</label>
        <input
          placeholder="."
          type="text"
          name="firstName"
          value={props.dataFormUser.firstName}
          onChange={handelFormRegister}
        />
        <span className="error-form-data">{errorValidate.firstName}</span>
      </div>
      <div className="last-name-register">
        <label>Tên *</label>
        <input
          placeholder="."
          type="text"
          name="lastName"
          value={props.dataFormUser.lastName}
          onChange={handelFormRegister}
        />
        <span className="error-form-data">{errorValidate.lastName}</span>
      </div>
      <div className="email-register">
        <label>Email *</label>
        <input
          placeholder="."
          type="mail"
          name="email"
          value={props.dataFormUser.email}
          onChange={handelFormRegister}
        />
        <span className="error-form-data">{errorValidate.email}</span>
      </div>
      <div className="phone-register">
        <label>Số điện thoại *</label>
        <input
          placeholder="."
          type="number"
          name="phone"
          value={props.dataFormUser.phone}
          onChange={handelFormRegister}
        />
        <span className="error-form-data">{errorValidate.phone}</span>
      </div>
      <div className="password-register">
        <label>Mật khẩu *</label>
        <input
          placeholder="."
          type="password"
          name="password"
          value={props.dataFormUser.password}
          onChange={handelFormRegister}
        />
        <span className="error-form-data">{errorValidate.password}</span>
      </div>
      <div className="password-again-register">
        <label>Nhập lại mật khẩu *</label>
        <input
          placeholder="."
          type="password"
          name="passwordAgain"
          value={dataPasswordAgain}
          onChange={(e) => setDataPasswordAgain(e.target.value)}
        />
        <span className="error-form-data">{errorValidate.passwordAgain}</span>
      </div>
    </div>
  );
};

export default RegisterFormData;
