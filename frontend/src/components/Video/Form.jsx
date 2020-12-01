import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import TagGroup from "./TagGroup";
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const buttonItemLayout = {
  wrapperCol: { span: 20, offset: 4 },
};

const VideoForm = () => {
  const [form] = Form.useForm();
  return (
    <>
      <Form
        {...formItemLayout}
        layout={"horizontal"}
        form={form}
        // initialValues={{ layout: formLayout }}
      >
       
        <div style={{marginTop: "16px"}}>
          <Form.Item>
            <Button type="primary">Start</Button>
          </Form.Item>
        </div>
        <TagGroup />
      </Form>
    </>
  );
};
export default VideoForm;
