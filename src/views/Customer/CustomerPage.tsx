import "./Customer.css";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Input,
  Select,
  Space,
  Spin,
  Table,
  Tag,
} from "antd";
import { customerApi } from "api/customer.api";
import React, { useEffect, useState, useRef } from "react";
import { ModalStatus } from "types/modal";
import { QueryParam } from "types/query";
import { Customer as CustomerType } from "types/customer";
import { getTitle } from "utils";
import { $url } from "utils/url";
import { CustomerModal } from "./components/CustomerModal";
import { useCustomer } from "hooks/useCustomer";

const { ColumnGroup, Column } = Table;
const { RangePicker } = DatePicker;

export const Customer = ({ title = "" }) => {
  const { query, setQuery, loading, data, total, fetchData } = useCustomer({
    page: 1,
    limit: 10,
    search: "",
  });
  const [selectedCustomer, setSelectedCustomer] = useState<
    Partial<CustomerType>
  >({});
  const modalRef = useRef<CustomerModal>(null);

  useEffect(() => {
    document.title = getTitle(title);
  }, []);

  useEffect(() => {
    fetchData();
  }, [query, fetchData]);

  return (
    <div>
      <div className="filter-container mb-4">
        {/* Hàng 1: Các filter + nút tìm kiếm + Thêm mới */}
        <div className="filter-row" style={{ alignItems: "end" }}>
          <div className="filter-item">
            <label className="block font-semibold mb-2">Tìm kiếm</label>
            <Input
              placeholder="Nhập tên hoặc sđt"
              allowClear
              onKeyDown={(ev) => {
                if (ev.code == "Enter") {
                  query.page = 1;
                  setQuery({ ...query });
                }
              }}
              onChange={(ev) => {
                query.search = ev.currentTarget.value;
                if (ev.currentTarget.value === "") {
                  query.page = 1;
                  setQuery({ ...query });
                }
              }}
            />
          </div>

          <div className="filter-item">
            <label className="block font-semibold mb-1">Ngày tạo</label>
            <RangePicker
              placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
              onChange={(dates) => {
                if (
                  dates &&
                  dates.length === 2 &&
                  dates[0] !== null &&
                  dates[1] !== null
                ) {
                  query.startDate = dates[0].unix();
                  query.endDate = dates[1].unix();
                } else {
                  delete query.startDate;
                  delete query.endDate;
                }
                query.page = 1;
                setQuery({ ...query });
              }}
            />
          </div>
          <div className="filter-action">
            <Button
              onClick={fetchData}
              type="primary"
              icon={<SearchOutlined />}
              style={{ minWidth: 110, marginRight: 8 }}
            >
              Tìm kiếm
            </Button>
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
        </div>
        {/* Hàng 2: tổng số lượng */}
        <div className="filter-bottom">
          <div className="filter-summary">
            <span>
              <b>Tổng số lượng:</b> {total} khách
            </span>
          </div>
        </div>
      </div>

      <Spin spinning={loading}>
        <Table
          rowKey="id"
          dataSource={data}
          pagination={{
            current: query?.page || 1,
            pageSize: query?.limit || 10,
            total: total,
            showSizeChanger: true,
            onChange: (page, pageSize) => {
              setQuery({ ...query, page, limit: pageSize });
            },
            showTotal: (total) => `Tổng ${total} khách hàng`,
          }}
        >
          <Column title="Họ tên" dataIndex="fullName" key="fullName" />
          <Column title="Số điện thoại" dataIndex="phone" key="phone" />
          <Column title="Email" dataIndex="email" key={"email"} />
          <Column
            title="Ngày tạo"
            dataIndex="createdAt"
            key="createdAt"
            render={(createdAt, record: CustomerType) => {
              if (!createdAt || createdAt === 0) return "-";
              const date = new Date(
                typeof createdAt === "number" && createdAt < 10000000000
                  ? createdAt * 1000
                  : createdAt
              );
              if (isNaN(date.getTime())) return "-";
              return date.toLocaleString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              });
            }}
          />
          <Column title="Nguồn" dataIndex="source" key="source" />
          <Column title="Điểm" dataIndex="points" key="points" />
          <Column
            title="Theo dõi OA"
            dataIndex="followOA"
            key="followOA"
            render={(followOA: boolean) => (
              <Tag color={followOA ? "green" : "red"} className="follow-tag">
                {followOA ? "Đã follow" : "Chưa follow"}
              </Tag>
            )}
          />
          <Column
            title="Thao tác"
            key="action"
            render={(text, record: CustomerType) => (
              <span>
                <Button
                  type="primary"
                  onClick={() => {
                    modalRef.current?.handleUpdate(record);
                  }}
                >
                  Cập nhật
                </Button>
              </span>
            )}
          />
        </Table>
      </Spin>

      <CustomerModal onSubmitOk={fetchData} onClose={() => {}} ref={modalRef} />
    </div>
  );
};
