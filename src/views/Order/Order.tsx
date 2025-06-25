import {
  PlusOutlined,
  SearchOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Button, Input, Select, Space, Spin, Table, Tag } from "antd";
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
import { OrderModal, OrderDetailModal } from "./components/OrderModal";
import { Link } from "react-router-dom";

const { ColumnGroup, Column } = Table;

export const Order = ({ title = "" }) => {
  const [query, setQuery] = useState<QueryParam>({
    page: 1,
    limit: 10,
    search: "",
  });
  const [searchInput, setSearchInput] = useState(""); // Thêm state này
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TypeOrder[]>([]);
  const [total, setTotal] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState<Partial<TypeOrder>>({});
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedOrderDetail, setSelectedOrderDetail] =
    useState<TypeOrder | null>(null);
  const modalRef = useRef<OrderModal>(null);

  useEffect(() => {
    document.title = getTitle(title);
  }, []);

  useEffect(() => {
    fetchData();
  }, [query]);

  useEffect(() => {
    setSearchInput(query.search ?? "");
  }, [query.search]);

  const fetchData = async () => {
    setLoading(true);
    const res = await orderApi.findAll(query);
    setLoading(false);
    setData(res.data.orders);
    setTotal(res.data.total);
  };

  // Lấy danh sách trạng thái từ OrderStatusTrans
  const orderStatusOptions = Object.entries(OrderStatusTrans).map(
    ([key, value]) => ({
      value: key,
      label: value.title,
    })
  );

  return (
    <div>
      <div className="filter-container">
        <Space>
          <div className="filter-item">
            <label htmlFor="">Tìm kiếm</label>
            <Input
              value={searchInput}
              allowClear
              onKeyDown={(ev) => {
                if (ev.code == "Enter") {
                  setQuery({ ...query, search: searchInput, page: 1 });
                }
              }}
              size="middle"
              onChange={(ev) => {
                setSearchInput(ev.currentTarget.value);
              }}
              placeholder="Tìm kiếm"
            />
          </div>
          <div className="filter-item">
            <label htmlFor="">Trạng thái đơn</label>
            <Select
              allowClear
              style={{ width: 180 }}
              placeholder="Chọn trạng thái"
              value={query.status}
              onChange={(value) =>
                setQuery({ ...query, status: value, page: 1 })
              }
              options={orderStatusOptions}
            />
          </div>

          <div className="filter-item btn">
            <Button
              onClick={() =>
                setQuery({ ...query, search: searchInput, page: 1 })
              }
              type="primary"
              icon={<SearchOutlined />}
            >
              Tìm kiếm
            </Button>
          </div>

          <div className="filter-item btn">
            <Button
              onClick={() => {
                modalRef.current?.handleCreate();
              }}
              type="primary"
              icon={<PlusOutlined />}
            >
              Thêm mới
            </Button>
          </div>
        </Space>
      </div>

      <Spin spinning={loading}>
        <Table
          rowKey="id"
          dataSource={data}
          pagination={{
            current: query.page,
            pageSize: query.limit,
            total: total,
            showSizeChanger: true,
            onChange: (page, pageSize) => {
              setQuery({ ...query, page, limit: pageSize });
            },
            showTotal: (total) => `Tổng ${total} đơn hàng`,
          }}
        >
          <Column
            title="Mã giao dịch"
            dataIndex="code"
            key="code"
            render={(text, record: TypeOrder) => (
              <Link
                to={`/admin/orders/${record.id}`}
                className="order-code-link"
              >
                {text}
              </Link>
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

      <OrderModal onSubmitOk={fetchData} onClose={() => {}} ref={modalRef} />

      {/* Modal chi tiết đơn hàng */}
      <OrderDetailModal
        visible={detailModalVisible}
        order={selectedOrderDetail}
        onClose={() => setDetailModalVisible(false)}
        onConfirm={() => {
          /* xử lý xác nhận đơn hàng nếu cần */
        }}
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
