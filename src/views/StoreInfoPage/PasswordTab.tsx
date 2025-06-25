import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import { authApi } from "api/auth.api";
import React, { useState } from "react";

const PasswordTab = () => {
  const [loading, setLoading] = useState(false);
  const [form] = useForm();

  const onFinish = async (values: any) => {
    await form.validateFields();
    const oldPassword = form.getFieldValue("oldPassword");
    const newPassword = form.getFieldValue("newPassword");
    setLoading(true);

    try {
      const res = await authApi.passwordUpdate({
        oldPassword,
        newPassword,
      });
      form.resetFields();
      message.success("Đã cập nhật mật khẩu của bạn!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        label="Mật khẩu cũ"
        name="oldPassword"
        required
        rules={[
          {
            required: true,
            message: "Vui lòng điền mật khẩu của bạn",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="newPassword"
        label="Mật khẩu mới"
        required
        rules={[
          {
            required: true,
            message: "Vui lòng điền mật khẩu mới của bạn",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="renewPassword"
        label="Nhập lại mật khẩu"
        required
        rules={[
          {
            required: true,
            message: "Vui lòng nhập lại mật khẩu mới của bạn",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPassword") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Mật khẩu không khớp"));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item style={{ marginBottom: 0 }}>
        <Button
          loading={loading}
          type="primary"
          size="middle"
          onClick={onFinish}
        >
          Cập nhật
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PasswordTab;
