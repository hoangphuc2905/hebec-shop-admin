import {
  PlusOutlined,
  SearchOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Input,
  Select,
  Space,
  Spin,
  Table,
  Tag,
  Tabs,
  Badge,
} from "antd";
import { orderApi } from "api/order.api";
import React, { useEffect, useState, useRef } from "react";
import { ModalStatus } from "types/modal";
import { QueryParam } from "types/query";
import {
  Order as TypeOrder,
  OrderStatusTrans,
  OrderStatus,
  PaymentMethodTrans,
} from "types/order";
import { PaymentStatusTrans } from "types/paymentStatus";
import { getTitle } from "utils";
import { $url } from "utils/url";
import { OrderModal } from "./components/OrderModal";
import { OrderDetailModal } from "./components/OrderDetailModal";
import { Link } from "react-router-dom";
import { useOrder } from "hooks/useOrder";
import { useOrderStatusCounts } from "hooks/useOrderStatusCounts";

const { ColumnGroup, Column } = Table;

export const Order = ({ title = "" }) => {
  // Sử dụng custom hook
  const {
    orders,
    totalOrder,
    fetchOrder,
    loadingOrder,
    setQueryOrder,
    queryOrder,
  } = useOrder({
    initQuery: {
      page: 1,
      limit: 1000,
      search: "",
    },
  });

  const { statusCounts, totalAll } = useOrderStatusCounts();

  const [searchInput, setSearchInput] = useState(""); // vẫn giữ state này nếu cần
  const [selectedOrder, setSelectedOrder] = useState<TypeOrder | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedOrderDetail, setSelectedOrderDetail] =
    useState<TypeOrder | null>(null);
  const modalRef = useRef<OrderModal>(null);
  const [statusCountsAll, setStatusCountsAll] = useState<
    Record<string, number>
  >({});
  const [totalAllState, setTotalAll] = useState(0);

  useEffect(() => {
    document.title = getTitle(title);
  }, []);

  useEffect(() => {
    fetchOrder();
    // eslint-disable-next-line
  }, [queryOrder]);

  useEffect(() => {
    setSearchInput(queryOrder.search ?? "");
  }, [queryOrder.search]);

  // Lấy danh sách trạng thái từ OrderStatusTrans
  const orderStatusOptions = Object.entries(OrderStatusTrans).map(
    ([key, value]) => ({
      value: key,
      label: value.title,
    })
  );

  // Đếm số lượng đơn theo từng trạng thái
  const statusCountsLocal = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Danh sách tab trạng thái
  const tabItems = [
    {
      key: "",
      label: (
        <span>
          Tất cả{" "}
          <Badge
            count={totalOrder}
            style={{ backgroundColor: "#52c41a", marginLeft: 4 }}
            showZero
          />
        </span>
      ),
    },
    ...Object.entries(OrderStatusTrans).map(([key, value]) => ({
      key,
      label: (
        <span>
          {value.title}{" "}
          <Badge
            count={statusCounts[key] || 0}
            style={{ backgroundColor: value.color, marginLeft: 4 }}
            showZero
          />
        </span>
      ),
    })),
  ];

  return (
    <div>
      {/* Tabs trạng thái */}
      <Tabs
        activeKey={queryOrder.status || ""}
        onChange={(key) =>
          setQueryOrder({ ...queryOrder, status: key || undefined, page: 1 })
        }
        style={{ marginBottom: 16 }}
      >
        <Tabs.TabPane
          tab={
            <span>
              Tất cả{" "}
              <Badge
                count={totalAll}
                style={{ backgroundColor: "#52c41a", marginLeft: 4 }}
                showZero
              />
            </span>
          }
          key=""
        />
        {Object.entries(OrderStatusTrans).map(([key, value]) => (
          <Tabs.TabPane
            tab={
              <span>
                {value.title}{" "}
                <Badge
                  count={statusCounts[key] || 0}
                  style={{ backgroundColor: value.color, marginLeft: 4 }}
                  showZero
                />
              </span>
            }
            key={key}
          />
        ))}
      </Tabs>

      <div className="filter-container">
        <Space>
          <div className="filter-item">
            <label htmlFor="">Tìm kiếm</label>
            <Input
              value={searchInput}
              allowClear
              onKeyDown={(ev) => {
                if (ev.code === "Enter") {
                  setQueryOrder({
                    ...queryOrder,
                    search: searchInput,
                    page: 1,
                  });
                }
              }}
              size="middle"
              onChange={(ev) => {
                setSearchInput(ev.currentTarget.value);
                if (ev.currentTarget.value === "") {
                  setQueryOrder({ ...queryOrder, search: "", page: 1 });
                }
              }}
              placeholder="Tìm kiếm"
            />
          </div>

          <div
            className="filter-item btn"
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Button
              onClick={() => {
                setQueryOrder({ ...queryOrder, search: searchInput, page: 1 });
              }}
              type="primary"
              style={{ height: 35, width: 100 }}
            >
              Tìm kiếm
            </Button>

            <Button
              onClick={() => {
                modalRef.current?.handleCreate();
              }}
              type="primary"
              style={{ height: 35, width: 100 }}
            >
              Thêm mới
            </Button>
          </div>
        </Space>
      </div>

      <Spin spinning={loadingOrder}>
        <Table
          rowKey="id"
          dataSource={orders}
          pagination={{
            current: queryOrder.page,
            pageSize: queryOrder.limit,
            total: totalOrder,
            showSizeChanger: true,
            onChange: (page, pageSize) => {
              setQueryOrder({ ...queryOrder, page, limit: pageSize });
            },
            showTotal: (total) => `Tổng ${total} đơn hàng`,
          }}
        >
          <Column
            title="Mã giao dịch"
            dataIndex="code"
            key="code"
            render={(text, record: TypeOrder) => (
              <a
                className="order-code-link"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSelectedOrderDetail(record);
                  setDetailModalVisible(true);
                }}
              >
                {text}
              </a>
            )}
          />
          <Column
            title="Khách hàng"
            dataIndex="customerName"
            key="customerName"
            render={(text, record: TypeOrder) => (
              <div>{record.customer?.fullName || record.receiverName}</div>
            )}
          />
          <Column
            title="Số điện thoại"
            dataIndex="phone"
            key="phone"
            render={(text, record: TypeOrder) => (
              <div>{record.customer?.phone || record.receiverPhone}</div>
            )}
          />
          <Column
            title="Thanh toán"
            dataIndex="paymentMethod"
            key="paymentMethod"
            render={(text, record: TypeOrder) => (
              <div>
                <div style={{ marginBottom: "4px" }}>
                  <strong>Hình thức:</strong>
                </div>
                <Tag color={record.paymentMethod === "COD" ? "blue" : "pink"}>
                  {PaymentMethodTrans[
                    record.paymentMethod as unknown as keyof typeof PaymentMethodTrans
                  ] || record.paymentMethod}
                </Tag>
                <div style={{ marginTop: "4px" }}>
                  <Tag
                    color={
                      PaymentStatusTrans[record.paymentStatus]?.color ||
                      "default"
                    }
                  >
                    {PaymentStatusTrans[record.paymentStatus]?.title ||
                      record.paymentStatus}
                  </Tag>
                </div>
                <div style={{ marginTop: "4px" }}>
                  <strong>Số tiền tổng:</strong>{" "}
                  {record.moneyFinal.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
              </div>
            )}
          />
          <Column
            title="Trạng thái đơn"
            dataIndex="status"
            key="status"
            render={(status: OrderStatus, record: TypeOrder) => {
              const statusInfo = OrderStatusTrans[status];
              return (
                <Tag color={statusInfo?.color || "default"}>
                  {statusInfo?.title || status}
                </Tag>
              );
            }}
          />
          <Column
            title="Ngày tạo đơn hàng"
            dataIndex="createdAt"
            key="createdAt"
            render={(createdAt, record: TypeOrder) => {
              // Nếu updatedAt là số giây, cần nhân 1000
              if (!createdAt || createdAt === 0) return "-";
              const date = new Date(
                typeof createdAt === "number" && createdAt < 10000000000
                  ? createdAt * 1000
                  : createdAt
              );
              if (isNaN(date.getTime())) return "-";
              return date.toLocaleString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              });
            }}
          />
          <Column
            key="action"
            render={(text, record: TypeOrder) => (
              <span>
                <Button
                  type="primary"
                  onClick={() => {
                    setSelectedOrderDetail(record);
                    setDetailModalVisible(true);
                  }}
                >
                  Chi tiết
                </Button>
              </span>
            )}
          />
        </Table>
      </Spin>

      <OrderModal onSubmitOk={fetchOrder} onClose={() => {}} ref={modalRef} />

      {/* Modal chi tiết đơn hàng */}
      <OrderDetailModal
        visible={detailModalVisible}
        order={selectedOrderDetail}
        onClose={() => setDetailModalVisible(false)}
        onConfirm={fetchOrder} // <-- truyền fetchData vào đây
        onCancelOrder={() => {
          /* xử lý hủy đơn hàng nếu cần */
        }}
        onDownloadInvoice={() => {
          /* xử lý tải hóa đơn nếu cần */
        }}
      />
    </div>
  );
};
