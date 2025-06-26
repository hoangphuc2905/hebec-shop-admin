import { Col, Form, Input, message, Modal, Row, Select } from "antd";
import { Rule } from "antd/lib/form";
import { customerApi } from "api/customer.api";
import { cityApi } from "api/city.api";
import { districtApi } from "api/district.api";
import { wardApi } from "api/ward.api";
import { SingleImageUpload } from "components/Upload/SingleImageUpload";
import React, { useEffect, useImperativeHandle, useState } from "react";
import { ModalStatus } from "types/modal";
import { Customer } from "types/customer";

const rules: Rule[] = [{ required: true }];

export interface CustomerModal {
  handleCreate: () => void;
  handleUpdate: (customer: Customer) => void;
}
interface CustomerModalProps {
  onClose: () => void;
  onSubmitOk: () => void;
}

export const CustomerModal = React.forwardRef(
  ({ onClose, onSubmitOk }: CustomerModalProps, ref) => {
    const [form] = Form.useForm<Customer>();
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [status, setStatus] = useState<ModalStatus>("create");
    const [cities, setCities] = useState<any[]>([]);
    const [districts, setDistricts] = useState<any[]>([]);
    const [wards, setWards] = useState<any[]>([]);

    useImperativeHandle<any, CustomerModal>(
      ref,
      () => ({
        handleCreate() {
          form.resetFields();
          setVisible(true);
          setStatus("create");
        },
        handleUpdate: async (customer: Customer) => {
          // Reset form trước khi set dữ liệu mới
          form.resetFields();
          const res = await customerApi.findById(customer.id);
          const data = res.data.customer || customer;

          form.setFieldsValue({ ...data });
          setVisible(true);
          setStatus("update");

          // Load districts theo tỉnh đã chọn
          if (data.provinceId) {
            const selectedCity = cities.find((c) => c.id === data.provinceId);
            if (selectedCity) {
              districtApi
                .findAll({ parentCode: selectedCity.code })
                .then((res) => {
                  setDistricts(res.data.districts || []);
                  // Load wards theo quận đã chọn
                  if (data.districtId) {
                    const selectedDistrict = (res.data.districts || []).find(
                      (d: { id: any }) => d.id === data.districtId
                    );
                    if (selectedDistrict) {
                      wardApi
                        .findAll({ parentCode: selectedDistrict.code })
                        .then((res2) => {
                          setWards(res2.data.wards || []);
                        });
                    } else {
                      setWards([]);
                    }
                  } else {
                    setWards([]);
                  }
                });
            } else {
              setDistricts([]);
              setWards([]);
            }
          } else {
            setDistricts([]);
            setWards([]);
          }
        },
      }),
      []
    );

    useEffect(() => {
      cityApi.findAll().then((res) => {
        console.log("cityApi.findAll", res);
        setCities(res.data.cities || []);
      });
    }, []);

    const handleCityChange = (parentCode: string) => {
      districtApi
        .findAll({ parentCode })
        .then((res) => setDistricts(res.data.districts || []));
      setWards([]);
      // Reset districtId và wardId
      form.setFieldsValue({ districtId: undefined, wardId: undefined });
    };

    const handleDistrictChange = (parentCode: string) => {
      wardApi
        .findAll({ parentCode })
        .then((res) => setWards(res.data.wards || [])); // Sửa ở đây
      form.setFieldsValue({ ward: undefined });
    };

    const createData = async () => {
      const valid = await form.validateFields();
      const data = { customer: form.getFieldsValue() };

      setLoading(true);
      try {
        const res = await customerApi.create(data);
        message.success("Create Customer successfully!");
        setVisible(false); // Đóng modal sau khi tạo thành công
        onClose();
        onSubmitOk();
      } finally {
        setLoading(false);
      }
    };

    const updateData = async () => {
      const valid = await form.validateFields();
      const data = { customer: form.getFieldsValue() };
      setLoading(true);
      try {
        const res = await customerApi.update(data.customer.id || 0, data);
        message.success("Update Customer successfully!");
        setVisible(false); // Đóng modal sau khi cập nhật thành công
        onClose();
        onSubmitOk();
      } finally {
        setLoading(false);
      }
    };

    return (
      <Modal
        onCancel={() => {
          onClose?.();
          setVisible(false);
        }}
        visible={visible}
        title={status == "create" ? "Create Customer" : "Update Customer"}
        style={{ top: 20 }}
        width={700}
        confirmLoading={loading}
        onOk={() => {
          status == "create" ? createData() : updateData();
        }}
      >
        <Form layout="vertical" form={form}>
          {/* Thêm trường ẩn id để luôn giữ id trong form */}
          <Form.Item name="id" style={{ display: "none" }}>
            <Input type="hidden" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Họ và tên" name="fullName" rules={rules}>
                <Input placeholder="" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Số điện thoại" name="phone" rules={rules}>
                <Input placeholder="" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Email" name="email">
                <Input placeholder="" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Tỉnh/Thành phố" name="provinceId" rules={rules}>
                <Select
                  showSearch
                  placeholder="Chọn tỉnh/thành phố"
                  onChange={(value) => {
                    const selectedCity = cities.find(
                      (city) => city.id === value
                    );
                    if (selectedCity) {
                      handleCityChange(selectedCity.code);
                    }
                    // Reset districtId và wardId khi đổi tỉnh
                    form.setFieldsValue({
                      districtId: undefined,
                      wardId: undefined,
                    });
                    setDistricts([]);
                    setWards([]);
                  }}
                  options={cities.map((city) => ({
                    label: city.nameWithType,
                    value: city.id,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Quận/Huyện" name="districtId" rules={rules}>
                <Select
                  showSearch
                  placeholder="Chọn quận/huyện"
                  onChange={(_, option) =>
                    handleDistrictChange(
                      (option as { parentCode: string }).parentCode
                    )
                  }
                  options={districts.map((d) => ({
                    label: d.nameWithType,
                    value: d.id,
                    parentCode: d.code,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Xã/Phường" name="wardId" rules={rules}>
                <Select
                  showSearch
                  placeholder="Chọn xã/phường"
                  options={wards.map((w) => ({
                    label: w.nameWithType,
                    value: w.id,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>
          {/* Địa chỉ nằm ngoài Row để truyền dữ liệu dễ dàng */}
          <Form.Item label="Địa chỉ" name="address" rules={rules}>
            <Input placeholder="Số nhà, tên đường" />
          </Form.Item>
          <Form.Item shouldUpdate={true}>
            {() => (
              <Form.Item label="Avatar" name="avatar">
                <SingleImageUpload
                  onUploadOk={(path: string) => {
                    form.setFieldsValue({ avatar: path });
                  }}
                  imageUrl={form.getFieldValue("avatar")}
                />
              </Form.Item>
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
);
