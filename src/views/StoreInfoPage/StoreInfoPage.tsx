import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Tabs,
  Tooltip,
} from "antd";
import { Rule } from "antd/lib/form";
import { useForm } from "antd/lib/form/Form";
import { authApi } from "api/auth.api";
import { SingleImageUpload } from "components/Upload/SingleImageUpload";
import { observer } from "mobx-react";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { userStore } from "store/userStore";
import { Store } from "types/store";
import { getTitle } from "utils";
import { phoneNumberRule } from "utils/validate-rules";

const rules: Rule[] = [{ required: true, message: "Bắt buộc nhập!" }];

export interface Props {
  title: string;
}

export interface AccountPage {
  handleCreate: () => void;
  handleUpdate: (data: Store) => void;
  handleClose: () => void;
}

export const StoreInfoPage = observer(({ title }: Props) => {
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
    const dataPost = { store: data };

    let res;
    try {
      res = await authApi.update({
        ...dataPost,
      });
      message.success("Đã cập nhật thông tin này");
      userStore.getProfile();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    form.setFieldsValue({ ...userStore.info.store });
  }, [userStore.info]);

  return (
    <>
      {" "}
      <Form layout="vertical" form={form}>
        <Row gutter={12}>
          <Col span={6} lg={6} xs={24}>
            <Card
              title="Thông tin cửa hàng"
              style={{ margin: "auto" }}
              bodyStyle={{ textAlign: "center" }}
            >
              <Form.Item shouldUpdate={true} style={{ marginBottom: 0 }}>
                {() => {
                  return (
                    <Form.Item
                      className="text-center"
                      name="avatar"
                      style={{ marginBottom: 0 }}
                    >
                      <img
                        width={150}
                        height={150}
                        src={form.getFieldValue("avatar")}
                        alt=""
                      />
                    </Form.Item>
                  );
                }}
              </Form.Item>
              <Tooltip title="Namespace">
                <span className="text-primary">
                  {userStore?.info?.store?.namespace}
                </span>
              </Tooltip>
              <h3 style={{ marginBottom: 2, marginTop: 5 }}>
                {userStore?.info?.store?.name}
              </h3>
            </Card>
          </Col>
          <Col lg={18} xs={24}>
            <Card style={{ height: "100%" }} bodyStyle={{ paddingTop: 12 }}>
              <Tabs defaultActiveKey="1" type="line">
                <Tabs.TabPane tab="Thông tin" key="1">
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="Tên" name="name">
                        <Input readOnly bordered={false} placeholder="" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Số điện thoại" name="phone">
                        <Input readOnly bordered={false} placeholder="" />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item label="Địa chỉ">
                        <Form.Item noStyle name="address">
                          <Input
                            style={{ paddingRight: 105 }}
                            readOnly
                            bordered={false}
                            placeholder=""
                          />
                        </Form.Item>
                      </Form.Item>
                    </Col>
                    <Form.Item name="lat">
                      <Input type="hidden" />
                    </Form.Item>{" "}
                    <Form.Item name="lng">
                      <Input type="hidden" />
                    </Form.Item>
                  </Row>
                </Tabs.TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </Form>
    </>
  );
});
