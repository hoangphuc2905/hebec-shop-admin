import { Col, Form, Input, message, Modal, Row } from "antd";
import { Rule } from "antd/lib/form";
import { productCategoryApi } from "api/productCategory.api";
import { SingleImageUpload } from "components/Upload/SingleImageUpload";
import React, { useEffect, useImperativeHandle, useState } from "react";
import { ModalStatus } from "types/modal";
import { ProductCategory } from "types/product-category";

const rules: Rule[] = [{ required: true }];

export interface ProductCategoryModal {
  handleCreate: () => void;
  handleUpdate: (productCategory: ProductCategory) => void;
}
interface ProductCategoryModalProps {
  onClose: () => void;
  onSubmitOk: () => void;
}

export const ProductCategoryModal = React.forwardRef(
  ({ onClose, onSubmitOk }: ProductCategoryModalProps, ref) => {
    const [form] = Form.useForm<ProductCategory>();
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [status, setStatus] = useState<ModalStatus>("create");

    useImperativeHandle<any, ProductCategoryModal>(
      ref,
      () => ({
        handleCreate() {
          form.resetFields();
          setVisible(true);
          setStatus("create");
        },
        handleUpdate(productCategory: ProductCategory) {
          form.setFieldsValue({ ...productCategory });
          setVisible(true);
          setStatus("update");
        },
      }),
      []
    );

    const createData = async () => {
      const valid = await form.validateFields();
      const data = { productCategory: form.getFieldsValue() };

      setLoading(true);
      try {
        const res = await productCategoryApi.create(data);
        message.success("Tạo thành công");
        handleClose();
        onSubmitOk();
      } finally {
        setLoading(false);
      }
    };

    const updateData = async () => {
      const valid = await form.validateFields();
      const data = { productCategory: form.getFieldsValue() };
      setLoading(true);
      try {
        const res = await productCategoryApi.update(
          data.productCategory.id || 0,
          data
        );
        message.success("Cập nhật thành công");
        handleClose();
        onSubmitOk();
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
        title={status == "create" ? "Tạo danh mục" : "Cập nhật danh mục"}
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
              <Form.Item label="Tên sản phẩm" name="name" rules={rules}>
                <Input placeholder="" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Mô tả" name="description">
                <Input.TextArea placeholder="" rows={3} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
);
