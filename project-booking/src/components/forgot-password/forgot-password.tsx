import VerificationInput from "react-verification-input";
import "./forgot-password.css";
import { MdMarkEmailUnread } from "react-icons/md";
const ForgotPassword = () => {
  return (
    <div className="table-forgot-password">
      <div className="box-forgot-password">
        <img
          className="image-header-forgot-password"
          src="/asset/image-header-home/image-header-home-3.svg"
          alt="image intercom"
        />
        {/* <div className="box-send-code-forgot-password">
          <div className="header-forgot-password">
            Please check your email and enter the code
          </div>
          <MdMarkEmailUnread className="icon-email-forgot-password" />
          <VerificationInput
            length={5}
            classNames={{
              character: "character",
            }}
          />
        </div> */}
        <div className="change-forgot-password">
          <div className="first-forgot-password">
            <label>Nhập password</label>
            <input type="password" placeholder="password" />
          </div>
          <div className="enter-back-forgot-password">
            <label>Nhập lại password</label>
            <input type="password" placeholder="password" />
          </div>
          <div className="btn-save-change-forgot-password">
            <button>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
