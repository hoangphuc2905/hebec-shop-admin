import { DeleteTwoTone } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Space,
} from "antd";
import { Rule } from "antd/lib/form";
import { customerFilterApi } from "api/customer-filter.api";
import { customerRankApi } from "api/customer-rank.api";
import { customerApi } from "api/customer.api";
import { productApi } from "api/product.api";
import { InputNumber } from "components/Input/InputNumber";
import useFetchData from "hooks/useFetchData";
import moment from "moment";
import React, { useEffect, useImperativeHandle, useState } from "react";
import { ECustomerResourceTrans } from "types/customer";
import {
  CustomerFilter,
  CustomerFilterTrans,
  ECustomterFilter,
  OperationCustomerFilter,
} from "types/customer-filter";
import { CustomerRank } from "types/customer-rank";
import { ModalStatus } from "types/modal";
import { Product } from "types/product";
import { QueryObject } from "types/queryObject";

const rules: Rule[] = [{ required: true }];

export interface CustomerFilterModal {
  handleCreate: () => void;
  handleUpdate: (customerFilter: CustomerFilter) => void;
}
interface CustomerFilterModalProps {
  onClose: () => void;
  onSubmitOk: () => void;
}

export const CustomerFilterModal = React.forwardRef(
  ({ onClose, onSubmitOk }: CustomerFilterModalProps, ref) => {
    const [form] = Form.useForm<any>();
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [status, setStatus] = useState<ModalStatus>("create");
    const [arrayFilter, setArrayFilter] = useState([]);

    const { data: productData, fetchData: fetchProduct } = useFetchData<{
      products: Product[];
      total: number;
    }>({
      initialQuery: {
        page: 1,
        limit: 20,
      },
      api: productApi.findAll,
      autoFetch: false,
    });

    const { data: rankData, fetchData: fetchRank } = useFetchData<{
      customerRanks: CustomerRank[];
      total: number;
    }>({
      initialQuery: {
        page: 1,
        limit: 20,
      },
      api: customerRankApi.findAll,
      autoFetch: false,
    });

    const { data: sourceData, fetchData: fetchSource } = useFetchData<any>({
      initialQuery: {
        page: 1,
        limit: 1000,
      },
      api: customerApi.source,
      autoFetch: false,
    });

    useEffect(() => {
      fetchProduct();
      fetchRank();
      fetchSource();
    }, []);

    useImperativeHandle<any, CustomerFilterModal>(
      ref,
      () => ({
        handleCreate() {
          form.resetFields();
          setVisible(true);
          setStatus("create");
        },
        handleUpdate(customerFilter: CustomerFilter) {
          const query: QueryObject[] = JSON.parse(
            String(customerFilter.queryObject)
          );
          form.resetFields();
          form.setFieldsValue({
            ...customerFilter,
            queryObject: query.map((item: any) => {
              // set value for "Ngày tạo khách hàng"
              let value;
              if (
                item.field === ECustomterFilter.customerCreatedAt ||
                item.field === ECustomterFilter.rangeTimeOfOrders
              ) {
                const fromDate = moment.unix(item.value1);
                const toDate = moment.unix(item.value2);
                value = {
                  value: [fromDate, toDate],
                  value1: fromDate,
                  value2: toDate,
                };
              } else {
                value = { value: item.value };
              }

              let operator = "";
              if (
                item.field === ECustomterFilter.numOfOrders ||
                item.field === ECustomterFilter.totalMoneyOfOrders
              ) {
                operator = item.operator;
              } else {
                operator = "=";
              }

              return {
                ...value,
                type: CustomerFilterTrans[item.field as ECustomterFilter].type,
                field: item.field,
                operator: operator,
              };
            }),
          });
          setVisible(true);
          setStatus("update");
        },
      }),
      []
    );

    const renderInputValue = (name: any) => {
      if (!form.getFieldValue("queryObject")[name].field) return <></>;
      switch (form.getFieldValue("queryObject")[name].field) {
        case ECustomterFilter.numOfOrders:
          return (
            <InputNumber
              placeholder="Nhập số lượng đơn"
              addonAfter="Đơn hàng"
              style={{ width: "100%" }}
            />
          );

        case ECustomterFilter.totalMoneyOfOrders:
          return <InputNumber placeholder="Nhập số tiền" addonAfter="VNĐ" />;
        case ECustomterFilter.product:
          return (
            <Select
              style={{ width: 330 }}
              allowClear
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              placeholder="Chọn sản phẩm"
              mode="multiple"
              options={productData?.products.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            ></Select>
          );

        case ECustomterFilter.customerRank:
          return (
            <Select
              style={{ width: 330 }}
              allowClear
              showSearch
              placeholder="Chọn rank"
              mode="multiple"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={rankData?.customerRanks.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            ></Select>
          );
        case ECustomterFilter.source:
          return (
            <Select
              style={{ width: 330 }}
              allowClear
              showSearch
              placeholder="Chọn nguồn khách hàng"
              options={sourceData?.map((item: any) => ({
                label:
                  // @ts-ignore
                  ECustomerResourceTrans[item.source]?.title,
                value:
                  // @ts-ignore
                  ECustomerResourceTrans[item.source]?.value,
              }))}
            ></Select>
          );

        default:
          return (
            <DatePicker.RangePicker
              style={{ width: 330 }}
              format="DD/MM/YYYY"
              allowClear
            />
          );
      }
    };

    const createData = async () => {
      const valid = await form.validateFields();
      const queryObject: any[] = form
        .getFieldValue("queryObject")
        .map((item: any) => {
          // set value for "Ngày tạo khách hàng"
          let value;
          if (
            item.field === ECustomterFilter.customerCreatedAt ||
            item.field === ECustomterFilter.rangeTimeOfOrders
          ) {
            const fromDate = item.value[0]?.startOf("day").unix();
            const toDate = item.value[1]?.endOf("day").unix();
            value = { value1: fromDate, value2: toDate };
          } else {
            value = { value: item.value };
          }

          let operator = "";
          if (
            item.field === ECustomterFilter.numOfOrders ||
            item.field === ECustomterFilter.totalMoneyOfOrders
          ) {
            operator = item.operator;
          } else {
            operator = "=";
          }

          return {
            ...value,
            type: CustomerFilterTrans[item.field as ECustomterFilter].type,
            field: item.field,
            operator: operator,
          };
        });
      const data = {
        customerFilter: {
          ...form.getFieldsValue(),
          queryObject: JSON.stringify(queryObject),
        },
      };
      setLoading(true);
      try {
        const res = await customerFilterApi.create(data);
        message.success("Tạo bộ lọc khách hàng thành công!");
        setVisible(false);
        onClose();
        onSubmitOk();
      } finally {
        setLoading(false);
      }
    };

    const updateData = async () => {
      const valid = await form.validateFields();
      const queryObject: any[] = form
        .getFieldValue("queryObject")
        .map((item: any) => {
          // set value cho đối tượng khoảng ngày
          let value;
          if (
            item.field === ECustomterFilter.customerCreatedAt ||
            item.field === ECustomterFilter.rangeTimeOfOrders
          ) {
            const fromDate = item.value[0]?.startOf("day").unix();
            const toDate = item.value[1]?.endOf("day").unix();
            value = { value1: fromDate, value2: toDate };
          } else {
            value = { value: item.value };
          }

          let operator = "";
          if (
            item.field === ECustomterFilter.numOfOrders ||
            item.field === ECustomterFilter.totalMoneyOfOrders
          ) {
            operator = item.operator;
          } else {
            operator = "=";
          }

          return {
            ...value,
            type: CustomerFilterTrans[item.field as ECustomterFilter].type,
            field: item.field,
            operator: operator,
          };
        });
      const data = {
        customerFilter: {
          ...form.getFieldsValue(),
          queryObject: JSON.stringify(queryObject),
        },
      };
      setLoading(true);
      try {
        const res = await customerFilterApi.update(
          data.customerFilter.id || 0,
          data
        );

        message.success("Cập nhật bộ lọc khách hàng thành công!");
        setVisible(false);
        onClose();
        onSubmitOk();
      } finally {
        setLoading(false);
      }
    };

    const queryObject = [
      {
        type: undefined,
        field: undefined,
        value: undefined,
        operator: undefined,
      },
    ];

    return (
      <Modal
        onCancel={() => {
          onClose?.();
          setVisible(false);
        }}
        visible={visible}
        title={
          status == "create"
            ? "Tạo bộ lọc khách hàng"
            : "Cập nhật bộ lọc khách hàng"
        }
        style={{ top: 20 }}
        width={600}
        confirmLoading={loading}
        onOk={() => {
          status == "create" ? createData() : updateData();
        }}
      >
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item hidden name="id">
                <Input></Input>
              </Form.Item>
              <Form.Item label="Tên bộ lọc" name="name" rules={rules}>
                <Input placeholder="" />
              </Form.Item>
              <Form.Item label="Mô tả" name="description" rules={rules}>
                <Input placeholder="" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item shouldUpdate noStyle label="bộ lọc">
                {({ getFieldValue }) => {
                  console.log(getFieldValue("queryObject"));

                  return (
                    <>
                      <Form.List
                        name={"queryObject"}
                        initialValue={queryObject}
                      >
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map(({ key, name }) => (
                              <Space
                                key={name}
                                direction="vertical"
                                style={{ width: "100%" }}
                              >
                                <Space>
                                  <span>Điều kiện lọc</span>
                                  {fields.length > 1 && (
                                    <DeleteTwoTone
                                      onClick={() => remove(name)}
                                      twoToneColor={"#da1515"}
                                    />
                                  )}
                                </Space>
                                <Space align="start">
                                  <Form.Item
                                    name={[name, "field"]}
                                    initialValue={undefined}
                                  >
                                    <Select
                                      allowClear
                                      showSearch
                                      placeholder="Chọn điều kiện lọc"
                                      style={{ width: 200 }}
                                      onChange={(e) => {
                                        //reset fields
                                        const queryObject =
                                          form.getFieldValue("queryObject");
                                        Object.assign(queryObject[key], {
                                          ...queryObject[key],
                                          value: undefined,
                                        });
                                        form.setFieldsValue({
                                          queryObject: queryObject,
                                        });
                                      }}
                                    >
                                      {Object.keys(CustomerFilterTrans).map(
                                        (item, index) => (
                                          <Select.Option
                                            key={index}
                                            value={
                                              // @ts-ignore
                                              CustomerFilterTrans[item].value
                                            }
                                          >
                                            {/* @ts-ignore */}
                                            {CustomerFilterTrans[item].title}
                                          </Select.Option>
                                        )
                                      )}
                                    </Select>
                                  </Form.Item>
                                  <Form.Item
                                    hidden={
                                      !form.getFieldValue("queryObject")[name]
                                        .field ||
                                      (getFieldValue("queryObject")[name]
                                        .field !==
                                        ECustomterFilter.numOfOrders &&
                                        getFieldValue("queryObject")[name]
                                          .field !==
                                          ECustomterFilter.totalMoneyOfOrders)
                                    }
                                    name={[name, "operator"]}
                                  >
                                    <Select
                                      allowClear
                                      placeholder="Chọn điều kiện"
                                      style={{ width: 135 }}
                                    >
                                      {OperationCustomerFilter.map(
                                        (o, index) => (
                                          <Select.Option
                                            key={index}
                                            value={o.value}
                                          >
                                            {o.title}
                                          </Select.Option>
                                        )
                                      )}
                                    </Select>
                                  </Form.Item>
                                  <Form.Item
                                    hidden={
                                      !form.getFieldValue("queryObject")[name]
                                        .field
                                    }
                                    name={[name, "value"]}
                                    style={{ width: 200 }}
                                  >
                                    {renderInputValue(name)}
                                  </Form.Item>
                                </Space>
                              </Space>
                            ))}
                            <Button type="default" onClick={add}>
                              Thêm điều kiện
                            </Button>
                          </>
                        )}
                      </Form.List>
                    </>
                  );
                }}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
);
