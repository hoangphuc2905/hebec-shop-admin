import { Form, FormInstance, FormItemProps, Input, Select } from "antd";
import { Rule } from "antd/lib/form";
import { useAddress } from "hooks/useAddress";
import { uniqBy } from "lodash";
import { toJS } from "mobx";
import React, { useEffect, useImperativeHandle, useState } from "react";
import { AddressData, City, District, Ward } from "types/address";
import { Order } from "types/order";

const rules: Rule[] = [{ required: true, message: "Bắt buộc nhập!" }];

export interface AddressParam {
  parentCode?: string;
}

export interface AddressSelect {
  setValue: (data: IAddress) => void;
}

export interface IAddress {
  district: District;
  city: City;
  ward: Ward;

  // address: string;
}

export const AddressSelect = React.forwardRef(
  (
    {
      formItemProps,
      form,
      onChange,
      isRequired = true,
      defaultValue,
    }: {
      defaultValue?: IAddress;
      form: FormInstance<any>;
      isRequired?: boolean;
      onChange: (data: any) => void;
      formItemProps?: FormItemProps;
    },
    ref
  ) => {
    const [queryWard, setQueryWard] = useState<AddressParam>();
    const [queryDistrict, setQueryDistrict] = useState<AddressParam>();
    const {
      cities,
      districts,
      loading,
      wards,
      fetchCity,
      fetchDistrict,
      fetchWard,
      clearDistrict,
      clearWard,
      updateCity,
      updateDistrict,
      updateWard,
    } = useAddress();

    useImperativeHandle(
      ref,
      () => {
        return {
          setValue(data: IAddress) {
            if (data?.city) {
              const cityData = uniqBy(
                [...cities, data.city],
                (item) => item.id
              ).filter(Boolean);
              updateCity(cityData);
            }
            if (data?.district) {
              const districtData = uniqBy(
                [...districts, data.district],
                (item) => item.id
              ).filter(Boolean);
              updateDistrict(districtData);
            }
            if (data?.ward) {
              const wardData = uniqBy(
                [...wards, data.ward],
                (item) => item.id
              ).filter(Boolean);
              updateWard(wardData);
            }

            form.setFieldsValue({
              cityId: data?.city?.id,
              wardId: data?.ward?.id,
              districtId: data?.district?.id,
            });
          },
        };
      },
      [cities, wards, districts]
    );

    useEffect(() => {
      if (queryDistrict?.parentCode) {
        fetchDistrict(queryDistrict);
      }
    }, [queryDistrict]);

    useEffect(() => {
      if (queryWard?.parentCode) {
        fetchWard(queryWard);
      }
    }, [queryWard]);

    useEffect(() => {
      fetchCity().then((data) => {
        if (defaultValue) {
          if (defaultValue.city) {
            updateCity([...data, defaultValue.city]);
            setQueryDistrict({ parentCode: defaultValue.city.code });
          }
          if (defaultValue.district) {
            setQueryWard({ parentCode: defaultValue.district.code });
          }
          if (defaultValue.ward) {
            updateWard([...wards, defaultValue.ward]);
          }
          form.setFieldsValue({
            cityId: defaultValue?.city?.id,
            wardId: defaultValue?.ward?.id,
            districtId: defaultValue?.district?.id,
          });
        }
      });
    }, []);

    const handleChangeCity = (cityId: number) => {
      form.resetFields(["wardId", "districtId"]);
      if (cityId) {
        const code = cities.find((e) => e.id == cityId)?.code;
        setQueryDistrict({ parentCode: code });
      } else {
        clearDistrict();
      }
    };

    const handleChangeDistrict = (districtId: number) => {
      form.resetFields(["wardId"]);
      if (districtId) {
        const parentCode = districts.find((e) => e.id == districtId)?.code;
        setQueryWard({ parentCode });
      } else {
        clearWard();
      }
    };

    const handleSubmitAddress = (value: number) => {
      if (value) {
        const { districtId, cityId, wardId, receiverPhone, receiverName } =
          form.getFieldsValue();
        const data = {
          receiverName,
          receiverPhone,
          district: districts.find((e) => e.id == districtId),
          ward: wards.find((e) => e.id == wardId),
          city: cities.find((e) => e.id == cityId),
        };
        onChange(data);
      } else {
        onChange(undefined);
      }
    };
    console.log(defaultValue);

    return (
      <>
        {/* <Form.Item
          {...formItemProps}
          name="receiverName"
          rules={rules}
          label="Tên người nhận"
        >
          <Input placeholder="Nhập tên người nhận"></Input>
        </Form.Item>
        <Form.Item
          {...formItemProps}
          name="receiverPhone"
          rules={rules}
          label="Số điện thoại"
        >
          <Input placeholder="Nhập số điện thoại người nhận"></Input>
        </Form.Item> */}
        <Form.Item
          {...formItemProps}
          rules={isRequired ? rules : []}
          required={isRequired}
          label="Tỉnh/Thành phố"
          name={"cityId"}
        >
          <Select
            onChange={handleChangeCity}
            style={{ width: "100%" }}
            onClear={() => {
              clearDistrict();
              clearWard();
            }}
            allowClear
            placeholder="Nhập tên tỉnh/thành phố"
            showSearch
            filterOption={(input, option) =>
              option?.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {cities?.map((item) => (
              <Select.Option value={item.id} key={item.id}>
                {item.nameWithType}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          {...formItemProps}
          rules={isRequired ? rules : []}
          required={isRequired}
          label="Quận/Huyện"
          name={"districtId"}
        >
          <Select
            disabled={!districts.length}
            onClear={clearWard}
            onChange={handleChangeDistrict}
            style={{ width: "100%" }}
            allowClear
            placeholder="Nhập tên Quận/Huyện"
            showSearch
            filterOption={(input, option) =>
              option?.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {districts?.map((item) => (
              <Select.Option value={item.id} key={item.id}>
                {item.nameWithType}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          {...formItemProps}
          rules={isRequired ? rules : []}
          required={isRequired}
          label="Xã/Phường"
          name={"wardId"}
        >
          <Select
            disabled={!wards.length}
            style={{ width: "100%" }}
            allowClear
            onChange={handleSubmitAddress}
            placeholder="Nhập tên Xã/Thị trấn"
            showSearch
            filterOption={(input, option) =>
              option?.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {wards?.map((item) => (
              <Select.Option value={item.id} key={item.id}>
                {item.nameWithType}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* </Form> */}
      </>
    );
  }
);
