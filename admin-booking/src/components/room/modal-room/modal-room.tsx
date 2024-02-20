import { useState } from "react";
import Loading from "../../loading/loading";
import "./modal-room.css";
import RoomSerVices from "../../../services/room-services";
import toast from "react-hot-toast";
interface Props {
  handelCancelEdit: Function;
  dataIndexRoom: any;
  handelCallBackApi: Function;
}
const ModalRoom: React.FC<Props> = (props: Props) => {
  console.log(props.dataIndexRoom);

  const [loading, setLoading] = useState<boolean>(false);
  const [getValueRoom, setGetValueRoom] = useState<any>();
  const [selectedFile, setSelectedFile] = useState<any>();
  const [previewImage, setPreviewImage] = useState<any>(null);
  const [statusPreview, setStatusPreview] = useState<boolean>(false);
  const [dataKey, setDataKey] = useState<string>("");
  const handelGetValueInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setGetValueRoom({
      ...getValueRoom,
      [name]: value,
    });
  };
  const handleFile = async (event: any) => {
    const file = event?.target?.files[0];
    setDataKey(event.target.name);
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
    const roomService = new RoomSerVices();
    if (selectedFile) {
      const formData = new FormData();
      formData.append(`file`, selectedFile);
      formData.append(`key`, dataKey);
      setLoading(true);
      try {
        const result = await roomService.uploadRoom(
          formData,
          Number(props.dataIndexRoom.id),
          dataKey
        );
        if (result?.data === 1) {
          props.handelCallBackApi();
          setStatusPreview(false);
          setLoading(false);
          setPreviewImage(null);
          setSelectedFile(null);
          props.handelCancelEdit(false);
          toast.success("Success Edit Image");
        } else {
          toast.error("fail upload");
          setStatusPreview(false);
          setLoading(false);
          setPreviewImage(null);
          setSelectedFile(null);
          props.handelCancelEdit(false);
        }
      } catch (error) {
        console.error("Error uploading avatar:", error);
        setLoading(false);
        setPreviewImage(null);
        setSelectedFile(null);
        props.handelCancelEdit(false);
      }
    } else {
      console.warn("No file selected");
      setPreviewImage(null);
      setSelectedFile(null);
      props.handelCancelEdit(false);
    }
  };
  const handleEditDataRoom = async () => {
    try {
      setLoading(true);
      const roomService = new RoomSerVices();
      if (getValueRoom) {
        const result = await roomService.update(
          Number(props?.dataIndexRoom?.id),
          getValueRoom
        );
        if (result.data[0] !== 0) {
          toast.success("Success Edit Data Room");
          props.handelCancelEdit(false);
          setLoading(false);
          props.handelCallBackApi();
        } else {
          props.handelCancelEdit(false);
          toast.error("Not Found Data");
          setLoading(false);
        }
      } else {
        props.handelCancelEdit(false);
        toast.error("please fill up");
        setLoading(false);
      }
    } catch (error) {
      props.handelCancelEdit(false);
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="modal-admin-room">
      {loading ? <Loading styleLoading="white" /> : null}
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
      <div className="box-modal-room">
        <h2>Edit Room</h2>
        <div className="box-input-room-admin">
          <div className="box-input-edit-room">
            <input
              type="text"
              placeholder={props?.dataIndexRoom?.name}
              className="input-room-admin"
              onChange={handelGetValueInput}
              name={"name"}
            />
            <input
              type="text"
              placeholder={props?.dataIndexRoom?.price + " USD"}
              className="input-room-admin"
              onChange={handelGetValueInput}
              name={"price"}
            />
          </div>
          <div className="box-edit-image-room">
            <div className="box-edit-image-room-link-1">
              <img
                src={props?.dataIndexRoom?.imageRooms[0]?.linkImage1}
                alt=""
              />
              <input
                type="file"
                name={"linkImage1"}
                placeholder="a"
                onChange={handleFile}
              />
            </div>
            <div className="box-edit-image-room-link-1">
              <img
                src={props.dataIndexRoom?.imageRooms[0]?.linkImage2}
                alt=""
              />
              <input
                type="file"
                name={"linkImage2"}
                onChange={handleFile}
                placeholder="."
              />
            </div>
            <div className="box-edit-image-room-link-1">
              <img
                src={props.dataIndexRoom?.imageRooms[0]?.linkImage3}
                alt=""
              />
              <input
                type="file"
                name={"linkImage3"}
                placeholder="."
                onChange={handleFile}
              />
            </div>
            <div className="box-edit-image-room-link-1">
              <img
                src={props.dataIndexRoom?.imageRooms[0]?.linkImage4}
                alt=""
              />
              <input
                type="file"
                name={"linkImage4"}
                placeholder="."
                onChange={handleFile}
              />
            </div>
            <div className="box-edit-image-room-link-1">
              <img
                src={props.dataIndexRoom?.imageRooms[0]?.linkImage5}
                alt=""
              />
              <input
                type="file"
                name={"linkImage5"}
                placeholder="."
                onChange={handleFile}
              />
            </div>
          </div>
        </div>
        <button className="save-edit-room" onClick={handleEditDataRoom}>
          Save
        </button>
      </div>
      <button
        className="close-modal-edit-room"
        onClick={() => props.handelCancelEdit()}
      >
        x
      </button>
    </div>
  );
};
export default ModalRoom;
