import "./login.css";
import React, { useState } from "react";
import Login from "@react-login-page/page4";
import { useDispatch } from "react-redux";
import { onLogin } from "../../store/reducer/user-reducer";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
export interface Login {
  email: string;
  password: string;
}
const LoginComponent = () => {
  const [getDataInput, setGetDataInput] = useState<any>({
    email: "",
    password: "",
  });
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
          message.error(res?.data);
        }
        if (res?.status == 201 || res?.status == 200) {
          message.success("ok login");
          navigate("/");
        } else {
          message.error("Bạn không có quyền truy cập");
        }
      }
    } catch (error) {
      message.error("Not Found 404");
    }
  };
  return (
    <div className="table-login-admin">
      <div className="form-login-admin">
        <img
          className="image-header-login-admin"
          src="https://th.bing.com/th/id/R.dac6ac7b9b93ade37f386b44c27fa8e0?rik=7fkA4FhB0QWV8g&pid=ImgRaw&r=0"
          alt=""
        />
        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="."
            name="email"
            value={getDataInput?.email}
            onChange={handelFormLogin}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="."
            name="password"
            value={getDataInput?.password}
            onChange={handelFormLogin}
          />
        </div>
        <button onClick={handelSubmitLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginComponent;
