import {
  Modal as AntdModal,
  Row,
  Col,
  Tag,
  Table,
  Button,
  message,
} from "antd";
import { Order, PaymentMethod } from "types/order";
import { orderApi } from "api/order.api";
import { PaymentMethodTrans, OrderStatusTrans } from "types/order";
import React, { useState } from "react";
import { UpdateReceiverModal } from "./UpdateReceiverModal";
import { formatDateTimeToString } from "utils/date";

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
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editAddress, setEditAddress] = useState<any>(null);

  if (!order) return null;

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
      title: "Đơn giá (đ)",
      dataIndex: "finalPrice",
      key: "finalPrice",
      align: "right",
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
              {record.price?.toLocaleString("vi-VN")}
            </span>
          )}
          <span>{price?.toLocaleString("vi-VN")}</span>
        </>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      align: "right",
    },
    {
      title: "Thành tiền (đ)",
      key: "total",
      align: "right",
      render: (_: any, record: any) => (
        <span>
          {(record.finalPrice * record.quantity).toLocaleString("vi-VN")}
        </span>
      ),
    },
  ];

  const handleConfirm = () => {
    AntdModal.confirm({
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

  // Khi bấm chỉnh sửa
  const handleEditClick = () => {
    setEditAddress({
      receiverName: order.receiverName,
      receiverPhone: order.receiverPhone,
      receiverAddress: order.receiverAddress,
      cityId: order.cityId,
      districtId: order.districtId,
      wardId: order.wardId,
      // ...các trường khác nếu cần...
    });
    setEditModalVisible(true);
  };

  // Khi cập nhật xong
  const handleEditOk = async (newAddress: any) => {
    if (!order) return;
    try {
      await orderApi.updateReceiverAddress(order.id, {
        receiverAddress: [
          newAddress.receiverAddress,
          typeof newAddress.wardId === "object"
            ? newAddress.wardId.nameWithType
            : "",
          typeof newAddress.districtId === "object"
            ? newAddress.districtId.nameWithType
            : "",
          typeof newAddress.cityId === "object"
            ? newAddress.cityId.nameWithType
            : "",
        ]
          .filter(Boolean)
          .join(" "),
        receiverCityId: newAddress.cityId?.id || newAddress.cityId,
        receiverDistrictId: newAddress.districtId?.id || newAddress.districtId,
        receiverWardId: newAddress.wardId?.id || newAddress.wardId,
        isReceiveAtStore: false,
      });
      message.success("Cập nhật địa chỉ thành công!");
      setEditModalVisible(false); // chỉ đóng modal cập nhật địa chỉ
      onConfirm?.(); // gọi fetchData ở cha để cập nhật lại thông tin đơn hàng
    } catch (e) {
      message.error("Cập nhật địa chỉ thất bại!");
    }
  };

  // Định nghĩa trạng thái tiếp theo và tiêu đề nút
  const getNextAction = (status: string) => {
    switch (status) {
      case "PENDING":
        return { label: "Xác nhận đơn hàng", nextStatus: "CONFIRM" };
      case "CONFIRM":
        return { label: "Chuyển sang đang xử lý", nextStatus: "PROCESSING" };
      case "PROCESSING":
        return {
          label: "Chuyển sang đang vận chuyển",
          nextStatus: "DELIVERING",
        };
      case "DELIVERING":
        return { label: "Hoàn tất đơn hàng", nextStatus: "COMPLETE" };
      default:
        return null;
    }
  };

  const handleNextStatus = () => {
    const action = getNextAction(order.status);
    if (!action) return;
    AntdModal.confirm({
      title: action.label,
      content: `Bạn có chắc chắn muốn chuyển đơn hàng sang trạng thái "${
        OrderStatusTrans[action.nextStatus]?.title || action.nextStatus
      }" không?`,
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await orderApi.updateStatus(order.id, action.nextStatus);
          message.success("Cập nhật trạng thái thành công!");
          onConfirm?.();
          onClose();
        } catch (e) {
          message.error("Có lỗi xảy ra, vui lòng thử lại!");
          console.error(e);
        }
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
            <b>Thời gian tạo:</b>{" "}
            <span>{formatDateTimeToString(order.createdAt)}</span>
          </div>
          <div>
            <b>Tạo bởi:</b> Khách hàng
          </div>
          <div>
            <b>Thời gian giao hàng:</b>{" "}
            <span>{formatDateTimeToString(order.createdAt)}</span>
          </div>
          <div style={{ marginBottom: 8 }}>
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
            <a
              href="#"
              style={{ fontSize: 12, marginLeft: 8 }}
              onClick={(e) => {
                e.preventDefault();
                handleEditClick();
              }}
            >
              ✎ Chỉnh sửa
            </a>
          </h3>
          <div>
            <b>Khách hàng:</b> {order.customer?.fullName} -{" "}
            {order.customer?.phone}
          </div>
          <div>
            <b>Người nhận:</b> {order.receiverName}
          </div>
          <div>
            <b>Số điện thoại:</b> {order.receiverPhone}
          </div>
          <div>
            <b>Địa chỉ nhận hàng:</b>{" "}
            {[
              order.receiverAddress,
              order.receiverWard?.nameWithType,
              order.receiverDistrict?.nameWithType,
              order.receiverCity?.nameWithType,
            ]
              .filter(Boolean)
              .join(", ")}
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
        {/* Ẩn nút Hủy đơn nếu đơn đã hoàn tất */}
        {order.status !== "COMPLETE" && (
          <Button danger onClick={onCancelOrder} style={{ marginRight: 8 }}>
            Hủy đơn
          </Button>
        )}
        {getNextAction(order.status) && (
          <Button type="primary" onClick={handleNextStatus}>
            {getNextAction(order.status)?.label}
          </Button>
        )}
      </div>

      {/* Popup cập nhật địa chỉ */}
      {editModalVisible && (
        <UpdateReceiverModal
          visible={editModalVisible}
          initialValues={editAddress}
          onCancel={() => setEditModalVisible(false)}
          onOk={handleEditOk}
        />
      )}
    </AntdModal>
  );
};
