import "./login-form-data.css";
import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { onLogin } from "../../../store/reducer/user";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../../common/loading";
import ForgotPassword from "../../forgot-password/forgot-password";
export interface Login {
  email: string;
  password: string;
}
interface Props {
  handelClickPopUpLogin: Function;
}
const FormLogin: React.FC<Props> = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleForGotPassword = (status: boolean) => {
    setIsForgotPassword(status);
  };
  const [dataLogin, setDataLogin] = useState<Login>({
    email: "",
    password: "",
  });
  const [errorFormLogin, setErrorFormLogin] = useState<Login>({
    email: "",
    password: "",
  });
  const validateLogin = (name: any, value: string) => {
    let isValid = true;
    let errorMessage = "";
    switch (name) {
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
    }
    setErrorFormLogin((prev: Login) => ({
      ...prev,
      [name]: errorMessage,
    }));
  };
  const handelFormLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setDataLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateLogin(name, value);
  };
  const handelSubmitLogin = async () => {
    setLoading(true);
    try {
      if (errorFormLogin.email === "" && errorFormLogin.password === "") {
        const res = await dispatch(onLogin(dataLogin) as any).unwrap();
        if (res?.status === 201 || res?.status === 200) {
          setLoading(false);
          navigate("/");
          props.handelClickPopUpLogin();
          return;
        } else {
          setLoading(false);
          toast(res?.response?.data);
          return;
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Tài khoản không tồn tại");
    }
  };
  return (
    <div className="box-login-left">
      <Toaster position="top-center" reverseOrder={false} />
      {loading ? <Loading /> : null}
      <div className="logo-login">
        <img
          src="/asset/image-header-home/image-header-home-3.svg"
          alt="logo login"
        ></img>
      </div>
      <div className="title-login-box">
        <p>Please sign in.</p>
      </div>
      <div className="email-login">
        <label>Email or member number</label>
        <input
          name="email"
          type="email"
          placeholder="email"
          onChange={handelFormLogin}
          value={dataLogin.email}
        ></input>
        <span className="error-login">{errorFormLogin.email}</span>
      </div>
      <div className="password-login">
        <label>PIN/Password</label>
        <input
          name="password"
          type="password"
          placeholder="password"
          onChange={handelFormLogin}
          value={dataLogin.password}
        ></input>
        <span className="error-login">{errorFormLogin.password}</span>
      </div>
      <div className="btn-login-submit">
        <button onClick={handelSubmitLogin}>Đăng nhập</button>
      </div>
      <span
        className="forgot-password-login"
        onClick={() => handleForGotPassword(true)}
      >
        Forgot password!
      </span>
      {isForgotPassword ? (
        <ForgotPassword handleForGotPassword={handleForGotPassword} />
      ) : null}
    </div>
  );
};
export default memo(FormLogin);
