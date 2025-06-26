import { Modal, Table, Input, Button } from "antd";
import React, { useEffect, useState } from "react";
import { productApi } from "api/product.api";

export const ProductSelectModal = ({ visible, onSelect, onCancel }: any) => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!visible) return;
    setLoading(true);
    productApi
      .findAll({ search, page: 1, limit: 50 })
      .then((res: any) => {
        setProducts(res.data.products || res.data.items || []);
      })
      .finally(() => setLoading(false));
  }, [visible, search]);

  return (
    <Modal
      visible={visible}
      title="Chọn sản phẩm"
      onCancel={onCancel}
      footer={null}
      width={900}
    >
      <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
        <Input
          allowClear
          placeholder="Nhập tên sản phẩm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 250 }}
        />
      </div>
      <Table
        dataSource={products}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 50, showTotal: (t) => `Tổng ${t} dòng` }}
        bordered
      >
        <Table.Column
          title="Tên SP"
          key="name"
          render={(_, r: any) => (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <img
                src={r.image || r.thumbnail || r.avatar || ""}
                alt=""
                style={{ width: 40, height: 40 }}
              />
              <span>{r.name}</span>
            </div>
          )}
        />
        <Table.Column
          title="Giá gốc"
          dataIndex="unitPrice"
          key="unitPrice"
          render={(v) => v?.toLocaleString("vi-VN")}
        />
        <Table.Column
          title="Thao tác"
          key="action"
          render={(_, r: any) => (
            <Button type="primary" onClick={() => onSelect(r)}>
              Chọn
            </Button>
          )}
        />
      </Table>
    </Modal>
  );
};