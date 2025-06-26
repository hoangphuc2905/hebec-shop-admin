import { Modal, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { cityApi } from "api/city.api";
import { districtApi } from "api/district.api";
import { wardApi } from "api/ward.api";

export const UpdateReceiverModal = ({
  visible,
  initialValues,
  onCancel,
  onOk,
}: {
  visible: boolean;
  initialValues: any;
  onCancel: () => void;
  onOk: (values: any) => void;
}) => {
  const [form] = Form.useForm();
  const [cityList, setCityList] = useState<any[]>([]);
  const [districtList, setDistrictList] = useState<any[]>([]);
  const [wardList, setWardList] = useState<any[]>([]);
  const [selectedCityCode, setSelectedCityCode] = useState<string>();
  const [selectedDistrictCode, setSelectedDistrictCode] = useState<string>();

  // Load city list khi mở modal
  useEffect(() => {
    if (visible) {
      cityApi.findAll().then((res: any) => {
        setCityList(res.data?.items || res.data?.cities || []);
      });
    }
  }, [visible]);

  // Set form values và load district/ward nếu có initialValues
  useEffect(() => {
    if (visible && initialValues) {
      form.setFieldsValue(initialValues);

      if (initialValues.cityId) {
        // Tìm code từ id nếu initialValues.cityId là id
        const city = cityList.find(
          (c) => c.id === initialValues.cityId || c.code === initialValues.cityId
        );
        const cityCode = city?.code || initialValues.cityId;
        setSelectedCityCode(cityCode);
        districtApi
          .findAll({ parentCode: cityCode })
          .then((res: any) => {
            setDistrictList(res.data?.items || res.data?.districts || []);
          });
      }
      if (initialValues.districtId) {
        const district = districtList.find(
          (d) => d.id === initialValues.districtId || d.code === initialValues.districtId
        );
        const districtCode = district?.code || initialValues.districtId;
        setSelectedDistrictCode(districtCode);
        wardApi
          .findAll({ parentCode: districtCode })
          .then((res: any) => {
            setWardList(res.data?.items || res.data?.wards || []);
          });
      }
    }
  }, [visible, initialValues, form]);

  // Khi chọn tỉnh/thành phố
  const handleCityChange = (cityId: string) => {
    form.setFieldsValue({ districtId: undefined, wardId: undefined });
    setDistrictList([]);
    setWardList([]);
    const city = cityList.find((c) => c.id === cityId || c.code === cityId);
    const cityCode = city?.code || cityId;
    setSelectedCityCode(cityCode); // Lưu lại code
    if (cityCode) {
      districtApi.findAll({ parentCode: cityCode }).then((res: any) => {
        setDistrictList(res.data?.items || res.data?.districts || []);
      });
    }
  };

  // Khi chọn quận/huyện
  const handleDistrictChange = (districtId: string) => {
    form.setFieldsValue({ wardId: undefined });
    setWardList([]);
    const district = districtList.find((d) => d.id === districtId || d.code === districtId);
    const districtCode = district?.code || districtId;
    setSelectedDistrictCode(districtCode); // Lưu lại code
    if (districtCode) {
      wardApi.findAll({ parentCode: districtCode }).then((res: any) => {
        setWardList(res.data?.items || res.data?.wards || []);
      });
    }
  };

  return (
    <Modal
      visible={visible}
      title="Cập nhật thông tin người nhận"
      onCancel={onCancel}
      onOk={() => {
        form.validateFields().then(
          onOk({
            ...form.getFieldsValue(),
            cityCode: selectedCityCode,
            districtCode: selectedDistrictCode,
          })
        );
      }}
      okText="OK"
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Tỉnh/Thành phố"
          name="cityId"
          rules={[{ required: true, message: "Nhập tên tỉnh/thành phố" }]}
        >
          <Select
            placeholder="Nhập tên tỉnh/thành phố"
            showSearch
            optionFilterProp="children"
            onChange={handleCityChange}
            filterOption={(input, option) =>
              (option?.children as string)
                ?.toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            {cityList.map((c) => (
              <Select.Option key={c.id || c.code} value={c.id || c.code}>
                {c.nameWithType || c.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Quận/Huyện"
          name="districtId"
          rules={[{ required: true, message: "Nhập tên Quận/Huyện" }]}
        >
          <Select
            placeholder="Nhập tên Quận/Huyện"
            showSearch
            optionFilterProp="children"
            onChange={handleDistrictChange}
            disabled={!form.getFieldValue("cityId")}
            filterOption={(input, option) =>
              (option?.children as string)
                ?.toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            {districtList.map((d) => (
              <Select.Option key={d.id || d.code} value={d.id || d.code}>
                {d.nameWithType || d.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Xã/Phường"
          name="wardId"
          rules={[{ required: true, message: "Nhập tên Xã/Thị trấn" }]}
        >
          <Select
            placeholder="Nhập tên Xã/Thị trấn"
            showSearch
            optionFilterProp="children"
            disabled={!form.getFieldValue("districtId")}
            filterOption={(input, option) =>
              (option?.children as string)
                ?.toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            {wardList.map((w) => (
              <Select.Option key={w.id || w.code} value={w.id || w.code}>
                {w.nameWithType || w.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Số nhà, đường" name="receiverAddress">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
