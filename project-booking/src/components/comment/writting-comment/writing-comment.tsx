import React, { useState } from "react";
import "./writing-comment.css";
import { Form, Button, Input } from "antd";
const CommentWriting = () => {
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const onChange = (e: any) => {
    setValue(e.target.value);
  };
  const onSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setValue("");
    }, 1000);
  };
  return (
    <div className="input-writing-comment">
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

export default CommentWriting;
