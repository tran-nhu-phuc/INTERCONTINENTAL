import "./card-profile.css";
import React, { useEffect, useMemo, useState } from "react";
import UserService from "../../services/user-service";
import { FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import ShowImage from "../show-image/show-image";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../../common/loading";
interface Props {
  handleProfile: Function;
  handleCallApi: Function;
}
const ProfileUser: React.FC<Props> = (props: Props) => {
  const userId = JSON.parse(localStorage.getItem("tokenId") as string);
  const [getDataByUserSerVices, setGetDataByUserSerVices] = useState<any>();
  const [isOpenShow, setIsOpenShow] = useState<boolean>(false);
  const [isOpenShowImage, setIsOpenShowImage] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [previewImage, setPreviewImage] = useState<any>(null);
  const [statusPreview, setStatusPreview] = useState<boolean>(false);
  const [statusCallApi, setStatusCallApi] = useState<boolean>(false);
  const [dataProfile, setDataProfile] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleFile = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader: any = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setStatusPreview(true);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    } else {
      setPreviewImage(null);
      setSelectedFile(null);
      setStatusPreview(false);
    }
  };
  const handleUploadFile = async () => {
    const userService = new UserService();
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      setIsLoading(true);
      try {
        const result = await userService.uploadImage(formData, userId);
        if (result.status == 201) {
          setStatusCallApi(!statusCallApi);
          setStatusPreview(false);
          props.handleCallApi();
          setIsLoading(false);
        } else {
          toast.error("fail upload");
          setStatusPreview(false);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error uploading avatar:", error);
      }
    } else {
      console.warn("No file selected");
    }
  };
  const handleShowImage = (status: boolean) => {
    setIsOpenShowImage(status);
  };
  const handelFormProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setDataProfile((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handelSubmitProfile = async () => {
    try {
      setIsLoading(true);
      if (dataProfile !== undefined) {
        const dataUser = new UserService();
        await dataUser.updateUser(userId, dataProfile);
        props.handleCallApi();
        setIsLoading(false);
        return;
      }
      toast.error("vui lòng điền vào ô");
      setIsLoading(false);
      return;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getDataUserSerVices = new UserService();
    const getUserById = async () => {
      try {
        const dataUser = await getDataUserSerVices.getInformation(userId);
        setGetDataByUserSerVices(dataUser.data);
      } catch (error) {
        throw error;
      }
    };
    getUserById();
  }, [statusCallApi]);
  return (
    <>
      <div className="container rounded bg-white mt-5 mb-5">
        {isLoading ? <Loading /> : null}
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              {statusPreview ? (
                <div className="handle-upload-image">
                  <div className="box-handle-upload-image">
                    <img
                      src={previewImage}
                      alt="a"
                      style={{
                        width: "250px",
                        height: "250px",
                        objectFit: "contain",
                      }}
                    />
                    <button
                      onClick={() => handleUploadFile()}
                      className="btn-upload-image-user-profile"
                    >
                      Upload
                    </button>
                    <button
                      onClick={() => setStatusPreview(false)}
                      className="close-preview-profile"
                    >
                      X
                    </button>
                  </div>
                </div>
              ) : null}
              <div
                className="card-image-profile-user"
                onMouseOver={() => setIsOpenShow(true)}
                onMouseOut={() => setIsOpenShow(false)}
              >
                <img
                  className="rounded-circle mt-5"
                  width="150px"
                  src={getDataByUserSerVices?.avatar}
                  alt="image user"
                />
                {isOpenShow ? (
                  <div className="click-edit-profile-user">
                    <label htmlFor="file">
                      <FaEdit
                        className="edit-upload-image-profile"
                        title="Edit Image"
                      />
                      <input
                        type="file"
                        placeholder="file"
                        name="file"
                        id="file"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={handleFile}
                      />
                    </label>
                    <FaEye
                      className="show-image-user-profile"
                      onClick={() => handleShowImage(true)}
                      title="Show Image"
                    />
                  </div>
                ) : null}
                {isOpenShowImage ? (
                  <ShowImage
                    handleShowImage={handleShowImage}
                    avatar={getDataByUserSerVices?.avatar}
                  />
                ) : null}
              </div>
              <span className="font-weight-bold">
                {getDataByUserSerVices?.firstName}{" "}
                {getDataByUserSerVices?.lastName}
              </span>
              <span className="text-black-50">
                {getDataByUserSerVices?.email}
              </span>
              <span> </span>
            </div>
          </div>
          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile Settings</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    placeholder={getDataByUserSerVices?.firstName}
                    onChange={handelFormProfile}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    placeholder={getDataByUserSerVices?.lastName}
                    onChange={handelFormProfile}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Mobile Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    placeholder={getDataByUserSerVices?.phone}
                    onChange={handelFormProfile}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    placeholder={getDataByUserSerVices?.email}
                    onChange={handelFormProfile}
                  />
                </div>
              </div>
              <div className="mt-5 text-center">
                <button
                  className="btn btn-primary profile-button"
                  type="button"
                  onClick={() => {
                    handelSubmitProfile();
                  }}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 py-5">
              <img
                src="https://th.bing.com/th/id/R.dac6ac7b9b93ade37f386b44c27fa8e0?rik=7fkA4FhB0QWV8g&pid=ImgRaw&r=0"
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "contain",
                  cursor: "pointer",
                }}
                alt=""
                onClick={() => navigate("/")}
              ></img>
            </div>
            <button
              className="close-card-profile-user"
              onClick={() => props.handleProfile(false)}
            >
              X
            </button>
            <div className="box-coin-of-user-in-profile">
              <div className="count-coin-and-content">
                <img
                  className="image-coin-voucher"
                  src="https://res.cloudinary.com/diezj3seu/image/upload/v1708234532/booking_hotel/voucher/yjct3ycq9qrmpropkif7.jpg"
                  alt=""
                />
                <p className="count-coin-number">
                  {getDataByUserSerVices?.point?.pointNumber}
                </p>
                <p className="content-check-count">Xu hiện có</p>
              </div>
              <img
                className="image-large-coin"
                src="https://res.cloudinary.com/diezj3seu/image/upload/v1708234532/booking_hotel/voucher/e6xgqko8cjcc0tg63hay.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfileUser;
