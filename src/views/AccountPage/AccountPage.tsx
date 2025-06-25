import { Button, Card, Col, Form, Input, message, Row, Tabs } from "antd";
import { Rule } from "antd/lib/form";
import { useForm } from "antd/lib/form/Form";
import { observer } from "mobx-react";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { userStore } from "store/userStore";
import { Store } from "types/store";
import { getTitle } from "utils";
import { phoneNumberRule } from "utils/validate-rules";
import PasswordTab from "./PasswordTab";

const rules: Rule[] = [{ required: true, message: "Bắt buộc nhập!" }];

export interface Props {
  title: string;
}

export interface AccountPage {
  handleCreate: () => void;
  handleUpdate: (data: Store) => void;
  handleClose: () => void;
}

export const AccountPage = observer(({ title }: Props) => {
  const defaultCoordinates = {
    lat: 10.762622,
    lng: 106.660172,
  };
  const [form] = useForm();
  const [hotLine, setHotLine] = useState("");
  const [loading, setLoading] = useState(false);
  const [visibleChooseAddressModal, setVisibleChooseAddressModal] =
    useState(false);

  const storeCoordinates = useMemo(
    () => ({
      lat: userStore?.info?.store?.lat || 0,
      lng: userStore?.info?.store?.lng || 0,
    }),
    [userStore.info.store]
  );

  useEffect(() => {
    document.title = getTitle(title);
  }, [title]);

  const timeOptions = useMemo(() => {
    let options = [];
    const day = moment().startOf("day");
    for (let i = 0; i < 48; i++) {
      options.push({
        label: day.format("HH:mm"),
        value: day.format("HH:mm"),
      });
      day.add(30, "minute");
    }

    return options;
  }, []);

  const handleSubmitForm = async () => {
    await form.validateFields();
    setLoading(true);
    const { ...data } = form.getFieldsValue();
    const dataPost = { employee: data };

    let res;
    try {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    form.setFieldsValue({ ...userStore.info });
  }, [userStore.info]);

  return (
    <>
      {" "}
      <Form layout="vertical" form={form}>
        <Row gutter={12}>
          <Col lg={15} xs={24}>
            <Card bodyStyle={{ paddingTop: 12 }}>
              <Tabs defaultActiveKey="1" type="line">
                <Tabs.TabPane tab="Thông tin" key="1">
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item label="Tên" name="name" rules={rules}>
                        <Input placeholder="" />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[...rules, phoneNumberRule]}
                      >
                        <Input placeholder="" />
                      </Form.Item>
                    </Col>
                    <Form.Item name="lat">
                      <Input type="hidden" />
                    </Form.Item>{" "}
                    <Form.Item name="lng">
                      <Input type="hidden" />
                    </Form.Item>
                    <Col span={24}>
                      <Button
                        loading={loading}
                        onClick={handleSubmitForm}
                        type="primary"
                      >
                        Lưu thay đổi
                      </Button>
                    </Col>
                  </Row>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Đổi mật khẩu" key="2">
                  <PasswordTab />
                </Tabs.TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </Form>
    </>
  );
});
