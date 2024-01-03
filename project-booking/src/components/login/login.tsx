import React, { memo, useState } from "react";
import "./login.css";
import FormLogin from "./login-form-data/login-form-data";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
interface Props {
  handelClickPopUpLogin: Function;
  openPopUp: boolean;
}
const Login: React.FC<Props> = (props: Props) => {
  const navigate = useNavigate();
  return (
    <>
      {props.openPopUp ? (
        <div className="login">
          <div className="box-login">
            <FormLogin handelClickPopUpLogin={props.handelClickPopUpLogin} />
            <div className="box-login-right">
              <p>Not an IHG® One Rewards Member?</p>
              <p>
                Experience travel the way it should be: personal and rewarding.
                Enjoy low member-exclusive rates and included Wi-Fi. Plus, earn
                points on every stay and redeem for Reward Nights, gift cards,
                and more.
              </p>
              <p>Learn about IHG® One Rewards</p>
              <button onClick={() => navigate("/register")}>Đăng ký</button>
            </div>
            <div className="btn-close-login">
              <button onClick={() => props.handelClickPopUpLogin()}>x</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default memo(Login);
