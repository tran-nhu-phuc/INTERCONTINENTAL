import React, { useState } from "react";
import Login, { Submit } from "@react-login-page/page4";
import { useDispatch } from "react-redux";
import { onLogin } from "../../store/reducer/user-reducer";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export interface Login {
  email: string;
  password: string;
}
const LoginComponent = () => {
  // Khai báo state để lưu trữ giá trị của password và email
  const [getDataInput, setGetDataInput] = useState<any>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handelFormLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setGetDataInput((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handelSubmitLogin = async () => {
    try {
      if (getDataInput.email !== "" && getDataInput.password !== "") {
        const res = await dispatch(onLogin(getDataInput) as any).unwrap();
        if (res?.response?.status == 400) {
          toast.error("400");
          return;
        }
        if (
          res?.status == 201 ||
          (res?.status == 200 && res.data.user.role === 2)
        ) {
          toast.success("ok login");
          navigate("/");
        } else {
          toast.error("Bạn không có quyền truy cập");
        }
      }
    } catch (error) {
      toast.error("404");
    }
  };
  return (
    <Login style={{ height: 1000, overflow: "hidden" }}>
      <Toaster />
      <Login.Password
        onChange={handelFormLogin}
        name="password"
      ></Login.Password>
      <Login.Email onChange={handelFormLogin} name="email" />
      <Submit onClick={handelSubmitLogin}></Submit>
    </Login>
  );
};

export default LoginComponent;
