import React, { memo, useState } from "react";
import "./writing-comment.css";
import { Form, Button, Input } from "antd";
import CommentService from "../../services/comment-services";
import toast, { Toaster } from "react-hot-toast";
import useSocket from "../../hooks/useSocket";
interface Props {
  userId: number;
  idRoom: number;
}
const CommentWriting: React.FC<Props> = (props: Props) => {
  const socket = useSocket();
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const onChange = (e: any) => {
    setValue(e.target.value);
  };
  const onSubmit = async () => {
    try {
      if (value !== "") {
        const newData = {
          roomId: props.idRoom,
          userId: props.userId,
          content: value,
        };
        const commentServices = new CommentService();
        const result = await commentServices.addNewComment(newData);
        if (result.data) {
          toast.success("thank you for your comment");
          socket.emit(`commentNew`, {
            roomId: props?.idRoom,
          });
          setSubmitting(true);
          setTimeout(() => {
            setSubmitting(false);
            setValue("");
          }, 1000);
        } else {
          toast.error("fail comment");
        }
      } else {
        toast.error("please fill up");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="input-writing-comment">
      <Toaster />
      <Form>
        <Form.Item>
          <Input.TextArea
            rows={6}
            cols={120}
            onChange={onChange}
            value={value}
          />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="button"
            loading={submitting}
            onClick={onSubmit}
            type="primary"
          >
            Add Comment
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default memo(CommentWriting);
