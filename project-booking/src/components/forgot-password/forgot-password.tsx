import VerificationInput from "react-verification-input";
import "./forgot-password.css";
import { MdMarkEmailUnread } from "react-icons/md";
import React, { useEffect, useState } from "react";
import UserService from "../../services/user-service";
import toast from "react-hot-toast";
import Loading from "../../common/loading";
import TimeLater from "../time-later/time-later";
interface Props {
  handleForGotPassword: Function;
}
const ForgotPassword: React.FC<Props> = (props: Props) => {
  const [valuePin, setValuePin] = useState<number>(0);
  const [checkValueNumber, setCheckValueNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<any>({
    password: "",
    passwordAgain: "",
  });
  const [callTimeLater, setCallTimeLater] = useState<boolean>(false);
  const handleCallTime = () => {
    setCallTimeLater(!callTimeLater);
  };
  const handleGetPassword = (e: any) => {
    const { name, value } = e.target as HTMLInputElement;
    setPassword({
      ...password,
      [name]: value,
    });
  };
  const [dataInputEmail, setDataInputEmail] = useState<string>("");
  const handleCheckValueInput = (value: any) => {
    setValuePin(value);
  };
  const handleChangePassword = async () => {
    try {
      setLoading(false);
      const userServices = new UserService();
      if (password?.password !== password?.passwordAgain) {
        setIsErrorPassword(true);
      } else if (password?.password === password?.passwordAgain) {
        setIsErrorPassword(false);
        props.handleForGotPassword(false);
        const newData = {
          password: password?.password,
        };
        const result = await userServices.updatePassword(newData);
        if (result.status == 203) {
          toast.success("Success Change Password");
          setLoading(false);
          return;
        } else {
          toast.error("Fail Change Password");
          setLoading(false);
          return;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleInputEmail = async () => {
    try {
      setLoading(true);
      const userServices = new UserService();
      if (dataInputEmail !== "") {
        const result = await userServices.checkEmail(dataInputEmail);
        if (result.data === 2) {
          handleCallTime();
          setCheckValueNumber(2);
          setLoading(false);
          return;
        } else {
          setCheckValueNumber(1);
          setLoading(false);
          return;
        }
      } else {
        toast.error("please email");
        return;
      }
    } catch (error: any) {
      if (error.response.data === 1) {
        toast.error("Not Found Email");
        setLoading(false);
      }
      return error;
    }
  };
  useEffect(() => {
    const handleCheckPin = async () => {
      try {
        const userServices = new UserService();
        if (valuePin >= 10000) {
          setLoading(true);
          const result = await userServices.checkPin(valuePin);
          if (result.data === 1) {
            setCheckValueNumber(3);
          } else {
            setIsError(true);
          }
        }
        setLoading(false);
      } catch (error) {
        return error;
      }
    };
    handleCheckPin();
  }, [valuePin]);
  return (
    <div className="table-forgot-password">
      {loading ? <Loading /> : null}
      <div className="box-forgot-password">
        <img
          className="image-header-forgot-password"
          src="/asset/image-header-home/image-header-home-3.svg"
          alt="image intercom"
        />
        <button
          className="btn-close-forgot-password"
          onClick={() => props.handleForGotPassword(false)}
        >
          x
        </button>
        {checkValueNumber === 1 ? (
          <div className="box-check-email-forgot-password">
            <label>Please your email</label>
            <input
              type="email"
              placeholder="."
              onChange={(e) => {
                setDataInputEmail(e.target.value);
              }}
            />
            <button onClick={handleInputEmail}>Save</button>
          </div>
        ) : null}
        {checkValueNumber === 2 ? (
          <div className="box-send-code-forgot-password">
            <div className="header-forgot-password">
              Please check your email and enter the code
            </div>
            <div className="time-picker-later-forgot-password">
              <TimeLater callTimeLater={callTimeLater} />
            </div>
            <MdMarkEmailUnread className="icon-email-forgot-password" />
            <VerificationInput
              length={5}
              classNames={{
                character: "character",
              }}
              autoFocus={true}
              onChange={handleCheckValueInput}
            />
            {isError ? (
              <span className="error-pin-forgot-password">
                Mã pin không đúng
              </span>
            ) : null}
            <span className="send-mail-again-pin" onClick={handleInputEmail}>
              Send Again
            </span>
          </div>
        ) : null}
        {checkValueNumber === 3 ? (
          <div className="change-forgot-password">
            <div className="first-forgot-password">
              <label>Nhập password</label>
              <input
                type="password"
                onChange={handleGetPassword}
                placeholder="."
                name="password"
              />
            </div>
            <div className="enter-back-forgot-password">
              <label>Nhập lại password</label>
              <input
                type="password"
                onChange={handleGetPassword}
                placeholder="."
                name="passwordAgain"
              />
              {isErrorPassword ? (
                <span
                  style={{
                    fontSize: "12px",
                    color: "red",
                  }}
                >
                  Not Compare Password
                </span>
              ) : null}
            </div>
            <div className="btn-save-change-forgot-password">
              <button onClick={handleChangePassword}>Save</button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default ForgotPassword;
