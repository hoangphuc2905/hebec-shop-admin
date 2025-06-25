import {
  Button,
  Input,
  message,
  Popconfirm,
  Space,
  Spin,
  Table,
  Select,
} from "antd";
import { Pagination } from "components/Pagination";
import { useProductCategory } from "hooks/useProductCategory";
import { useEffect, useRef, useState } from "react";
import { ProductCategory } from "types/product-category";
import { formatVND, getTitle } from "utils";
import { $url } from "utils/url";
import { ProductModal } from "./ProductModal";
import { productCategoryApi } from "api/productCategory.api";
import { useProduct } from "hooks/useProduct";
import { Product } from "types/product";
import { productApi } from "api/product.api";
import { settings } from "settings";

const { ColumnGroup, Column } = Table;

export const ProductPage = ({ title = "" }) => {
  const { fetchData, loading, products, query, setQuery, total } = useProduct({
    initQuery: { limit: 10, page: 1 },
  });

  // Thay thế useProductCategory bằng gọi trực tiếp API
  const [productCategories, setProductCategories] = useState<ProductCategory[]>(
    []
  );
  const [loadingCategories, setLoadingCategories] = useState(false);

  useEffect(() => {
    setLoadingCategories(true);
    productCategoryApi
      .findAll({ limit: 100, page: 1 })
      .then((res) => {
        setProductCategories(res.data?.productCategories || []);
      })
      .finally(() => setLoadingCategories(false));
  }, []);

  const [loadingDelete, setLoadingDelete] = useState(false);

  const modalRef = useRef<ProductModal>();

  useEffect(() => {
    document.title = getTitle(title);
  }, []);

  useEffect(() => {
    fetchData();
  }, [query]);

  const handleDelete = async (id: number) => {
    try {
      setLoadingDelete(true);
      await productApi.delete(id);
      message.success("Xóa thành công");
      fetchData();
    } catch (e) {
      console.log({ e });
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <div>
      <div
        className="filter-container"
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 16,
        }}
      >
        <div
          className="filter-item"
          style={{ display: "flex", flexDirection: "column", gap: 4 }}
        >
          <label htmlFor="">Tìm kiếm</label>
          <Input
            allowClear
            onKeyDown={(ev) => {
              if (ev.code == "Enter") {
                query.page = 1;
                setQuery({ ...query });
              }
            }}
            size="middle"
            onChange={(ev) => {
              query.search = ev.currentTarget.value;
            }}
            placeholder="Nhập tên sản phẩm"
          />
        </div>

        <div
          className="filter-item"
          style={{ display: "flex", flexDirection: "column", gap: 4 }}
        >
          <label>Loại sản phẩm</label>
          <Select
            allowClear
            loading={loadingCategories}
            style={{ width: 220 }}
            placeholder="Chọn loại sản phẩm"
            value={query.productCategoryId}
            onChange={(value) => {
              query.productCategoryId = value;
              query.page = 1;
              setQuery({ ...query });
            }}
            options={[
              { label: "Tất cả", value: undefined },
              ...productCategories.map((cat: ProductCategory) => ({
                label: cat.name,
                value: cat.id,
              })),
            ]}
          />
        </div>

        <Button
          onClick={() => {
            fetchData();
            setQuery({ ...query });
          }}
          type="primary"
          style={{ height: 35 }}
        >
          Tìm kiếm
        </Button>

        <Button
          onClick={() => {
            modalRef.current?.handleCreate();
          }}
          type="primary"
          style={{ height: 35 }}
        >
          Thêm mới
        </Button>
      </div>

      <Spin spinning={loading}>
        <Table
          expandable={{
            expandedRowRender: () => <></>,
            expandIcon: () => <></>,
          }}
          pagination={false}
          rowKey="id"
          dataSource={products}
        >
          <Column
            title="Tên"
            dataIndex="name"
            key="name"
            render={(name, record: Product) => {
              return (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <img
                    src={record.image || settings.productDefault}
                    width={50}
                    height={50}
                    style={{ objectFit: "contain" }}
                  />
                  <div>{name}</div>
                </div>
              );
            }}
          />
          <Column title="Mô tả" dataIndex="description" key="description" />
          <Column
            title="Danh mục"
            dataIndex="productCategory"
            key="productCategory"
            render={(productCategory) => {
              return productCategory?.name;
            }}
          />
          <Column
            width={200}
            align="right"
            title="Giá"
            dataIndex="unitPrice"
            key="unitPrice"
            render={(unitPrice) => {
              return formatVND(unitPrice);
            }}
          />
          <Column
            width={100}
            title="Action"
            key="action"
            render={(text, record: Product) => (
              <Space>
                <Button
                  type="primary"
                  onClick={() => {
                    modalRef.current?.handleUpdate(record);
                  }}
                >
                  Cập nhật
                </Button>
                <Popconfirm
                  title="Xác nhận xóa"
                  onConfirm={() => {
                    handleDelete(record.id);
                  }}
                >
                  <Button
                    style={{ width: "100%" }}
                    danger
                    loading={loadingDelete}
                  >
                    Xóa
                  </Button>
                </Popconfirm>
              </Space>
            )}
          />
        </Table>

        <Pagination
          defaultPageSize={query.limit}
          currentPage={query.page}
          total={total}
          onChange={({ limit, page }) => {
            query.page = page;
            query.limit = limit;
            setQuery({ ...query });
          }}
        />
      </Spin>

      <ProductModal onSubmitOk={fetchData} onClose={() => {}} ref={modalRef} />
    </div>
  );
};
