import { Col, Form, Input, message, Modal, Row, Select } from "antd";
import { Rule } from "antd/lib/form";
import { productApi } from "api/product.api";
import { InputNumber } from "components/Input/InputNumber";
import { SingleImageUpload } from "components/Upload/SingleImageUpload";
import { useProductCategory } from "hooks/useProductCategory";
import React, { useEffect, useImperativeHandle, useState } from "react";
import { ModalStatus } from "types/modal";
import { Product } from "types/product";

const rules: Rule[] = [{ required: true }];
const priceRules: Rule[] = [
  { required: true, message: "Vui lòng nhập giá" },
  {
    type: "number",
    min: 1,
    message: "Giá phải lớn hơn 0",
    transform: (value) => Number(value),
  },
];

export interface ProductModal {
  handleCreate: () => void;
  handleUpdate: (product: Product) => void;
}
interface ProductModalProps {
  onClose: () => void;
  onSubmitOk: () => void;
}

interface ProductForm extends Product {
  productCategoryId: number;
  importPrice?: number;
  unitPrice: number;
}

export const ProductModal = React.forwardRef(
  ({ onClose, onSubmitOk }: ProductModalProps, ref) => {
    const [form] = Form.useForm<ProductForm>();
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [status, setStatus] = useState<ModalStatus>("create");

    const { fetchData, productCategories, setQuery } = useProductCategory({
      initQuery: { limit: 100, page: 1 },
    });

    useImperativeHandle<any, ProductModal>(
      ref,
      () => ({
        handleCreate() {
          form.resetFields();
          setVisible(true);
          setStatus("create");
        },
        async handleUpdate(product: Product) {
          await fineOneProduct(product.id);
          setVisible(true);
          setStatus("update");
        },
      }),
      []
    );

    const fineOneProduct = async (id: number) => {
      try {
        const { data } = await productApi.findOne(id);
        form.setFieldsValue({
          ...data,
          productCategoryId: data.productCategory?.id,
        });
      } catch (e) {
        console.log({ e });
      }
    };

    useEffect(() => {
      visible && fetchData();
    }, [visible]);

    const createData = async () => {
      const valid = await form.validateFields();
      const { productCategoryId, importPrice, ...product } =
        form.getFieldsValue();
      const data = {
        product: {
          ...product,
          importPrice: Number(importPrice),
          unitPrice: Number(importPrice), // Lưu cả importPrice và unitPrice
          // KHÔNG truyền finalPrice
        },
        productCategoryId,
      };

      setLoading(true);
      try {
        const res = await productApi.create(data);
        message.success("Tạo thành công");
        onSubmitOk();
        handleClose();
      } finally {
        setLoading(false);
      }
    };

    const updateData = async () => {
      const valid = await form.validateFields();
      const { productCategoryId, importPrice, ...product } =
        form.getFieldsValue();
      const data = {
        product: {
          ...product,
          importPrice: Number(importPrice),
          unitPrice: Number(importPrice), // Lưu cả importPrice và unitPrice
          // KHÔNG truyền finalPrice
        },
        productCategoryId,
      };
      setLoading(true);
      try {
        const res = await productApi.update(data.product.id || 0, data);
        message.success("Cập nhật thành công");
        onSubmitOk();
        handleClose();
      } finally {
        setLoading(false);
      }
    };

    const handleClose = () => {
      onClose?.();
      setVisible(false);
    };

    return (
      <Modal
        onCancel={() => {
          handleClose();
        }}
        visible={visible}
        title={status == "create" ? "Tạo sản phẩm" : "Cập nhật sản phẩm"}
        style={{ top: 20 }}
        width={700}
        confirmLoading={loading}
        onOk={() => {
          status == "create" ? createData() : updateData();
        }}
      >
        <Form layout="vertical" form={form}>
          <Form.Item name={"id"} hidden></Form.Item>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item shouldUpdate={true}>
                {() => {
                  return (
                    <Form.Item label="Hình ảnh" name="image">
                      <SingleImageUpload
                        onUploadOk={(path: string) => {
                          form.setFieldsValue({
                            image: path,
                          });
                        }}
                        imageUrl={form.getFieldValue("image")}
                      />
                    </Form.Item>
                  );
                }}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Tên sản phẩm" name="name" rules={rules}>
                <Input placeholder="" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Danh mục"
                name="productCategoryId"
                rules={rules}
              >
                <Select
                  options={productCategories.map((it) => ({
                    label: it.name,
                    value: it.id,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Giá gốc" name="importPrice" rules={priceRules}>
                <InputNumber min={1} style={{ width: "100%" }} placeholder="" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Giá bán lẻ" name="unitPrice" rules={priceRules}>
                <InputNumber min={1} style={{ width: "100%" }} placeholder="" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Mô tả" name="description">
                <Input.TextArea rows={3} placeholder="" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
);
