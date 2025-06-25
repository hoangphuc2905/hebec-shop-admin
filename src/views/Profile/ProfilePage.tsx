import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  message,
  Row,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { authApi } from "api/auth.api";
import { useEffect, useState } from "react";
import { userStore } from "store/userStore";
import { getTitle } from "utils";

export const ProfilePage = ({ title }: { title: string }) => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = getTitle(title);
  }, []);

  //handle submit form
  const onFinish = async (values: any) => {
    const oldPassword = form.getFieldValue("oldPassword");
    const newPassword = form.getFieldValue("newPassword");
    setLoading(true);

    try {
      const res = await authApi.passwordUpdate({
        oldPassword,
        newPassword,
      });
      form.resetFields();
      message.success("Update password successfully!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {" "}
      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          <Card title="Thông tin">
            <div
              className="card-avatar"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Avatar
                icon={userStore.info.name?.[0]}
                style={{
                  color: "#f56a00",
                  backgroundColor: "#fde3cf",
                  verticalAlign: "middle",
                  margin: "auto",
                }}
                size={100}
              />
            </div>

            <Divider orientation="left" orientationMargin="0">
              Thông tin khác
            </Divider>
            <p>
              <b>Họ tên:</b> {userStore.info.name}
            </p>
            <p>
              <b>Số điện thoại:</b> {userStore.info.phone}
            </p>
            <p>
              <b>Email: </b> {userStore.info.email}
            </p>
          </Card>
        </Col>
        <Col className="gutter-row" span={18}>
          <Card title="Đổi mật khẩu">
            <Form
              form={form}
              onFinish={onFinish}
              //   onFinishFailed={onFinishFailed}
              layout="vertical"
            >
              <Form.Item
                label="Mật khẩu cũ"
                name="oldPassword"
                required
                rules={[
                  {
                    required: true,
                    message: "Bắt buộc",
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
                    message: "Bắt buộc",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="renewPassword"
                label="Nhập lại mật khẩu mới"
                required
                rules={[
                  {
                    required: true,
                    message: "Bắt buộc",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Mật khẩu mới không khớp!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button
                  loading={loading}
                  type="primary"
                  style={{ background: "black", borderColor: "black" }}
                  htmlType="submit"
                >
                  Đổi mật khẩu
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};
