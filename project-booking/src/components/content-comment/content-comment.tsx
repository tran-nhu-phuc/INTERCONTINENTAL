import "./content-comment.css";
import { Avatar, Dropdown, MenuProps, Space } from "antd";
import { Rating } from "react-simple-star-rating";
import { MdDone } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import React, { memo, useEffect, useMemo, useState } from "react";
import ShowImage from "../show-image/show-image";
import LikeService from "../../services/like-services";
import toast from "react-hot-toast";
import CommentService from "../../services/comment-services";
import useSocket from "../../hooks/useSocket";
interface Props {
  item: any;
  statusCallComment: any;
}
const ContentComment: React.FC<Props> = (props: Props) => {
  const socket = useSocket();
  const rate = Number(props.item?.user?.rattings[0]?.rate);
  const [isOpenImage, setIsOpenImage] = useState<boolean>(false);
  const [userId] = useState<any>(localStorage.getItem("tokenId"));
  const [isDeleteComment, setIsDeleteComment] = useState<boolean>(false);
  const [dataComment, setDataComment] = useState<any>();
  const [currentIdComment, setCurrentIdComment] = useState<number>(NaN);
  const handleShowImage = (status: boolean) => {
    setIsOpenImage(status);
  };
  const handleFindUser = () => {
    const findUser = dataComment?.findIndex((item: any) => {
      return item?.userId == Number(userId) && item?.id === props.item?.id;
    });
    if (findUser !== -1) {
      setIsDeleteComment(true);
      return;
    }
    setIsDeleteComment(false);
    return;
  };
  const handleRemoveComment = async (idComment: number) => {
    try {
      const commentServices = new CommentService();
      const result = await commentServices.removeComment(idComment);
      if (result?.status === 204) {
        toast.success("ok delete");
        socket.emit(`commentDelete`, {
          commentId: props?.item?.id,
        });
        return;
      } else {
        toast.error("fail delete");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleLike = async () => {
    try {
      const likeServices = new LikeService();
      const result = await likeServices.addNewLike(
        Number(userId),
        Number(props.item?.id)
      );
      if (result.status === 201) {
        socket.emit(`commentLike`, {
          commentId: props?.item?.id,
        });
        return;
      } else {
        toast.error("fail like");
        return;
      }
    } catch (error) {
      toast.error("fail like");
      console.log(error);
      return;
    }
  };
  useEffect(() => {
    const handleCallComment = async () => {
      try {
        const commentServices = new CommentService();
        const result = await commentServices.getAllByRoom(props.item?.roomId);
        setDataComment([...result.data]);
      } catch (error) {
        console.log(error);
      }
    };
    handleCallComment();
  }, []);
  useEffect(() => {
    const handleCallComment = async () => {
      try {
        const commentServices = new CommentService();
        const result = await commentServices.getAllByRoom(props.item?.roomId);
        setDataComment([...result.data]);
      } catch (error) {
        console.log(error);
      }
    };
    socket.on(`comment`, (roomId: any) => {
      if (props?.item?.roomId == roomId?.roomId) {
        handleCallComment();
      }
    });
  }, [socket]);
  const items: MenuProps["items"] = [
    {
      label: (
        <button
          style={{ color: "red", outline: "none", border: "none" }}
          onClick={() => handleRemoveComment(currentIdComment)}
        >
          Delete
        </button>
      ),
      key: "0",
    },
  ];
  const isUserLiked = useMemo(() => {
    return props.item?.likes?.findIndex((item: any) => {
      return item?.userId == userId;
    });
  }, [props.item?.likes, userId]);

  return (
    <div
      className="box-content-comment-ratting"
      onMouseOver={handleFindUser}
      onMouseOut={() => setIsDeleteComment(false)}
    >
      <div className="avatar-user-comment">
        <Space direction="vertical" size={16}>
          <Space wrap size={16}>
            <Avatar
              size="large"
              icon={<img src={props.item?.user?.avatar} alt="icon user" />}
              className="icon-comment-user-avatar"
              onClick={() => handleShowImage(true)}
            />
          </Space>
        </Space>
        <p>
          {props.item?.user?.firstName} {""} {props.item?.user?.lastName}
        </p>
        {isOpenImage ? (
          <ShowImage
            handleShowImage={handleShowImage}
            avatar={props.item?.user?.avatar}
          />
        ) : null}
      </div>
      <div className="content-user-comment">
        <div className="star-rated-user">
          <p className="star-icon-ratting">
            <Rating initialValue={rate} readonly={true} size={35} />
            <p>
              <MdDone className="done-icon-user-comment" />
              <span>Verified purchase</span>
            </p>
          </p>
          <div className="custom-comment-user">
            <p>Price</p>
            <p>Punctuality & Speed</p>
          </div>
        </div>
        <div className="date-comment">
          <span>{props.item?.createdAt}</span>
        </div>
        <div className="text-comment">
          <p>{props.item?.content}</p>
        </div>
        <div className="click-like-comment">
          <div className="count-like-comment">
            <div>{props.item?.likes?.length} like</div>
          </div>
          <button onClick={handleLike}>
            .
            <AiOutlineLike
              className="icon-like-comment-user-clicked"
              style={{ color: isUserLiked !== -1 ? "blue" : "#848282" }}
            />
          </button>
          <p>Report</p>
        </div>
      </div>
      {isDeleteComment ? (
        <div className="dot-delete-comment">
          <Dropdown menu={{ items }} trigger={["click"]}>
            <button onClick={() => setCurrentIdComment(props.item?.id)}>
              <Space>...</Space>
            </button>
          </Dropdown>
        </div>
      ) : null}
    </div>
  );
};
export default memo(ContentComment);
