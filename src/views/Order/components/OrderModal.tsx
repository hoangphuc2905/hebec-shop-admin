import { Col, Form, Input, message, Modal, Row } from "antd";
import { Rule } from "antd/lib/form";
import { orderApi } from "api/order.api";
import { SingleImageUpload } from "components/Upload/SingleImageUpload";
import React, { useEffect, useImperativeHandle, useState } from "react";
import { ModalStatus } from "types/modal";
import { Order } from "types/order";
import { Modal as AntdModal, Tag, Table, Button } from "antd";
import { PaymentMethodTrans, OrderStatusTrans } from "types/order";

const rules: Rule[] = [{ required: true }];

export interface OrderModal {
  handleCreate: () => void;
  handleUpdate: (order: Order) => void;
}
interface OrderModalProps {
  onClose: () => void;
  onSubmitOk: () => void;
}

export const OrderModal = React.forwardRef(
  ({ onClose, onSubmitOk }: OrderModalProps, ref) => {
    const [form] = Form.useForm<Order>();
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [status, setStatus] = useState<ModalStatus>("create");

    useImperativeHandle<any, OrderModal>(
      ref,
      () => ({
        handleCreate() {
          form.resetFields();
          setVisible(true);
          setStatus("create");
        },
        handleUpdate(order: Order) {
          form.setFieldsValue({ ...order });
          setVisible(true);
          setStatus("update");
        },
      }),
      []
    );

    const createData = async () => {
      const valid = await form.validateFields();
      const data = { order: form.getFieldsValue() };

      setLoading(true);
      try {
        const res = await orderApi.create(data);
        message.success("Create Order successfully!");
        onClose();
        onSubmitOk();
      } finally {
        setLoading(false);
      }
    };

    const updateData = async () => {
      const valid = await form.validateFields();
      const data = { order: form.getFieldsValue() };
      setLoading(true);
      try {
        const res = await orderApi.update(data.order.id || 0, data);
        message.success("Update Order successfully!");
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
        title={status == "create" ? "Create Order" : "Update Order"}
        style={{ top: 20 }}
        width={700}
        confirmLoading={loading}
        onOk={() => {
          status == "create" ? createData() : updateData();
        }}
      >
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Username" name="username" rules={rules}>
                <Input placeholder="" />
              </Form.Item>
            </Col>

            {status == "create" && (
              <Col span={12}>
                <Form.Item label="Password" name="password" rules={rules}>
                  <Input placeholder="" />
                </Form.Item>
              </Col>
            )}

            <Col span={12}>
              <Form.Item label="Name" name="name" rules={rules}>
                <Input placeholder="" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Phone" name="phone" rules={rules}>
                <Input placeholder="" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Email" name="email">
                <Input placeholder="" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item shouldUpdate={true}>
            {() => {
              return {
                /* Avatar upload removed because 'avatar' is not a property of Order */
              };
            }}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
);

interface OrderDetailModalProps {
  visible: boolean;
  order: Order | null;
  onClose: () => void;
  onConfirm: () => void;
  onCancelOrder: () => void;
  onDownloadInvoice: () => void;
}

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  visible,
  order,
  onClose,
  onConfirm,
  onCancelOrder,
  onDownloadInvoice,
}) => {
  if (!order) return null;

  // Format date
  const formatDate = (date: number | string) => {
    if (!date) return "-";
    let d: Date;
    if (typeof date === "number") {
      d = new Date(date < 10000000000 ? date * 1000 : date);
    } else {
      d = new Date(date);
    }
    if (isNaN(d.getTime())) return "-";
    return (
      d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }) +
      ", " +
      d.toLocaleDateString("vi-VN")
    );
  };

  // Table columns for products
  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={record.product?.image || ""}
            alt=""
            style={{ width: 40, height: 40, marginRight: 8 }}
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "finalPrice",
      key: "finalPrice",
      render: (price: number, record: any) => (
        <>
          {record.price !== price && (
            <span
              style={{
                textDecoration: "line-through",
                color: "#aaa",
                marginRight: 4,
              }}
            >
              {record.price?.toLocaleString("vi-VN")}đ
            </span>
          )}
          <span>{price?.toLocaleString("vi-VN")}đ</span>
        </>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Thành tiền",
      key: "total",
      render: (_: any, record: any) => (
        <span>
          {(record.finalPrice * record.quantity).toLocaleString("vi-VN")}đ
        </span>
      ),
    },
  ];

  const handleConfirm = () => {
    Modal.confirm({
      title: "Xác nhận đơn hàng",
      content: "Bạn có chắc chắn muốn xác nhận đơn hàng này không?",
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk: async () => {
        if (!order) return;
        try {
          await orderApi.update(order.id, {
            order: { ...order, status: "CONFIRM" },
          });
          onConfirm?.();
          onClose();
          window.location.reload();
        } catch (e) {}
      },
    });
  };

  return (
    <AntdModal
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={900}
      title={
        <span>
          Chi tiết đơn hàng{" "}
          <span style={{ color: "#169c9f" }}>{order.code}</span>
        </span>
      }
    >
      <Row gutter={24}>
        <Col span={12}>
          <h3>Thông tin đơn hàng</h3>
          <div>
            <b>Đơn hàng:</b>{" "}
            <span style={{ color: "#169c9f" }}>{order.code}</span>
          </div>
          <div>
            <b>Thời gian tạo:</b> <span>{formatDate(order.createdAt)}</span>
          </div>
          <div>
            <b>Tạo bởi:</b> Khách hàng
          </div>
          <div>
            <b>Thời gian giao hàng:</b>{" "}
            <span>{formatDate(order.createdAt)}</span>
          </div>
          <div>
            <b>Phương thức thanh toán:</b>{" "}
            <Tag color={order.paymentMethod === "COD" ? "blue" : "pink"}>
              {PaymentMethodTrans[
                order.paymentMethod as unknown as keyof typeof PaymentMethodTrans
              ] || order.paymentMethod}
            </Tag>
          </div>
          <div>
            <b>Trạng thái đơn hàng:</b>{" "}
            <Tag color={OrderStatusTrans[order.status]?.color || "default"}>
              {OrderStatusTrans[order.status]?.title || order.status}
            </Tag>
          </div>
          <div>
            <b>Ghi chú:</b> {order.note || "-"}
          </div>
        </Col>
        <Col span={12}>
          <h3>
            Thông tin người nhận{" "}
            <a href="#" style={{ fontSize: 12, marginLeft: 8 }}>
              ✎ Chỉnh sửa
            </a>
          </h3>
          <div>
            <b>Khách hàng:</b> Khách hàng mới - {order.customer?.phone}
          </div>
          <div>
            <b>Người nhận:</b> {order.receiverName}
          </div>
          <div>
            <b>Số điện thoại:</b> {order.receiverPhone}
          </div>
          <div>
            <b>Địa chỉ nhận hàng:</b> {order.receiverAddress}
          </div>
        </Col>
      </Row>

      <div style={{ marginTop: 24 }}>
        <Table
          columns={columns}
          dataSource={order.details}
          pagination={false}
          rowKey="id"
          bordered
          title={() => null}
        />
      </div>

      <Row style={{ marginTop: 16 }}>
        <Col span={12}></Col>
        <Col span={12}>
          <div style={{ textAlign: "right" }}>
            <div>
              <b>Tiền hàng:</b> {order.moneyProduct?.toLocaleString("vi-VN")}đ
            </div>
            <div>
              <b>Phí ship:</b> {order.shipFee?.toLocaleString("vi-VN")}đ
            </div>
            <div style={{ fontSize: 18, fontWeight: 600, marginTop: 8 }}>
              Tổng cộng:{" "}
              <span style={{ color: "#169c9f" }}>
                {order.moneyFinal?.toLocaleString("vi-VN")}đ
              </span>
            </div>
          </div>
        </Col>
      </Row>

      <div style={{ marginTop: 24, textAlign: "right" }}>
        <Button danger onClick={onCancelOrder} style={{ marginRight: 8 }}>
          Hủy đơn
        </Button>
        <Button type="primary" onClick={handleConfirm}>
          Xác nhận
        </Button>
      </div>
    </AntdModal>
  );
};
