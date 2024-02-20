import { useState } from "react";
import { User } from "../../type/type";
import "./register.css";
import RegisterFormData from "./register_form_data/register_form_data";
import UserService from "../../services/user-service";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onRegister } from "../../store/reducer/user";
const RegisterBooking = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [checkFormRegister, setCheckFormRegister] = useState<boolean>(false);
  const [dataFormUser, setDataFormUser] = useState<any>({
    firstName: "",
    lastName: "",
    email: "",
    phone: NaN,
    password: "",
  });
  const handelButtonRegister = (dataRegister: boolean) => {
    setCheckFormRegister(dataRegister);
  };
  const getInputFormData = (data: User) => {
    setDataFormUser({ ...data });
  };
  const joinDataRegister = async () => {
    try {
      if (checkFormRegister) {
        const res = await dispatch(onRegister(dataFormUser) as any).unwrap();
        if (!res.data.errors) {
          navigate("/");
          return;
        } else {
          toast.error("email đã tồn tại");
          return;
        }
      } else {
        toast.error("Vui lòng nhập đúng");
        return;
      }
    } catch {
      toast.error("register error");
      return;
    }
  };
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <main className="content-register">
        <div className="box-register-form">
          <div className="table-content-register">
            <p>
              Đăng ký ngay để hưởng giá thấp hơn và các lợi ích khác cho hội
              viên
            </p>
            <span>* Cho biết một ô là bắt buộc điền</span>
          </div>
          <RegisterFormData
            getInputFormData={getInputFormData}
            dataFormUser={dataFormUser}
            handelButtonRegister={handelButtonRegister}
          />
          <div className="alert-content-register">
            <p>
              Vui lòng chọn mật khẩu có ít nhất tám ký tự, bao gồm ít nhất ba ký
              tự sau: ký tự viết hoa, ký tự thường, số, ký tự đặc biệt.
            </p>
          </div>
          <div className="btn-submit-register">
            <button onClick={joinDataRegister}>Tham gia ngay</button>
          </div>
        </div>
      </main>
    </div>
  );
};
export default RegisterBooking;
