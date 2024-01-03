import { UserOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import "./content-comment.css";
import { Avatar, Space } from "antd";
import { Rating } from "react-simple-star-rating";
import { MdDone } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
const ContentComment = () => {
  return (
    <div className="box-content-comment">
      <div className="avatar-user-comment">
        <Space direction="vertical" size={16}>
          <Space wrap size={16}>
            <Avatar
              size="large"
              icon={<UserOutlined />}
              className="icon-comment-user-avatar"
            />
          </Space>
        </Space>
        <p>Trần như phúc</p>
      </div>
      <div className="content-user-comment">
        <div className="star-rated-user">
          <p>
            <Rating initialValue={1} readonly={true} size={35} />
          </p>
          <p>
            <MdDone className="done-icon-user-comment" />
          </p>
          <span>Verified purchase</span>
        </div>
        <div className="custom-comment-user">
          <p>Price</p>
          <p>Punctuality & Speed</p>
        </div>
        <div className="date-comment">
          <span>Reviewed Nov. 21, 2023</span>
        </div>
        <div className="text-comment">
          <p>
            My experience at CheapOair are very satisfy and their site very easy
            to used and you can find very cheap flights and they will call you
            after you booked a flight and staff is very good job. They will
            explained to you all clearly… and will recommend to families and
            friends…
          </p>
        </div>
        <div className="count-like-comment">
          <div>18 like</div>
        </div>
        <div className="click-like-comment">
          <button>
            <AiOutlineLike className="icon-like-comment-user-clicked" />
          </button>
          <p>Report</p>
        </div>
      </div>
    </div>
  );
};
export default ContentComment;
