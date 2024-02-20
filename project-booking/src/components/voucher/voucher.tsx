import React, { useEffect, useState } from "react";
import "./voucher.css";
import UserService from "../../services/user-service";
import VoucherService from "../../services/voucher.services";
import toast, { Toaster } from "react-hot-toast";
interface Props {
  handleOpenVoucher: Function;
  handleVoucherDiscount: Function;
}
const Voucher: React.FC<Props> = (props: Props) => {
  const [userId] = useState<any>(localStorage.getItem("tokenId"));
  const [dataUser, setDataUser] = useState<any>();
  const [dataVoucher, setDataVoucher] = useState<any>();
  const handleUseVoucher = async (id: number, discount: number) => {
    try {
      const voucherService = new VoucherService();
      const newData = {
        userId,
      };
      const result = await voucherService.useVoucher(id, newData);
      if (result?.data === 1) {
        toast.success("Used Voucher");
        props.handleVoucherDiscount(discount);
      }
      setTimeout(() => {
        props.handleOpenVoucher(false);
      }, 1000);
    } catch (error) {
      toast.error("Not Voucher Enough");
      props.handleVoucherDiscount(0);
      console.log(error);
    }
  };
  useEffect(() => {
    const handleCallApi = async () => {
      try {
        const userService = new UserService();
        const result = await userService.getInformation(userId);
        setDataUser(result?.data);
      } catch (error) {
        console.log(error);
      }
    };
    handleCallApi();
  }, []);
  useEffect(() => {
    const handleCallApiVoucher = async () => {
      try {
        const voucherService = new VoucherService();
        const result = await voucherService.getAll();
        setDataVoucher([...result?.data]);
      } catch (error) {
        console.log(error);
      }
    };
    handleCallApiVoucher();
  }, []);
  return (
    <div className="box-voucher-card">
      <Toaster />
      <div
        className="table-voucher-left-click"
        onClick={() => props.handleOpenVoucher(false)}
      ></div>
      <div className="table-voucher-card">
        <div className="coin-of-user-use-voucher">
          <div>
            <span>{dataUser?.point?.pointNumber}</span>
            <span>Xu hiện có</span>
          </div>
          <img
            src="https://res.cloudinary.com/diezj3seu/image/upload/v1708234532/booking_hotel/voucher/e6xgqko8cjcc0tg63hay.jpg"
            alt=""
          />
        </div>
        {dataVoucher?.map((item: any) => {
          return (
            <div className="card-voucher">
              <img className="image-percent-voucher" src={item?.image} alt="" />
              <div>
                <p>Giảm {item?.discount}% cho tất cả sản phẩm</p>
                <div>
                  <span style={{ color: "orange" }}>{item?.pointsNumber}</span>
                  <img
                    className="image-coin-in-voucher"
                    src="https://res.cloudinary.com/diezj3seu/image/upload/v1708234532/booking_hotel/voucher/yjct3ycq9qrmpropkif7.jpg"
                    alt=""
                  />
                  <span>Đổi xu</span>
                </div>
              </div>
              <button
                className="btn-use-voucher"
                onClick={() => handleUseVoucher(item?.id, item?.discount)}
              >
                Dùng ngay
              </button>
            </div>
          );
        })}
        <button
          className="close-model-voucher"
          onClick={() => props.handleOpenVoucher(false)}
        >
          X
        </button>
      </div>
    </div>
  );
};
export default Voucher;
