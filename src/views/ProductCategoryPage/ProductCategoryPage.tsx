import { Button, Input, message, Popconfirm, Space, Spin, Table } from "antd";
import { Pagination } from "components/Pagination";
import { useProductCategory } from "hooks/useProductCategory";
import { useEffect, useRef, useState } from "react";
import { ProductCategory } from "types/product-category";
import { getTitle } from "utils";
import { $url } from "utils/url";
import { ProductCategoryModal } from "./ProductCategoryModal";
import { productCategoryApi } from "api/productCategory.api";

const { ColumnGroup, Column } = Table;

export const ProductCategoryPage = ({ title = "" }) => {
  const { fetchData, loading, productCategories, query, setQuery, total } =
    useProductCategory({ initQuery: { limit: 10, page: 1 } });

  const [loadingDelete, setLoadingDelete] = useState(false);
  const [productModalVisible, setProductModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategory | null>(null);

  const modalRef = useRef<ProductCategoryModal>();

  useEffect(() => {
    document.title = getTitle(title);
  }, []);

  useEffect(() => {
    fetchData();
  }, [query]);

  const handleDelete = async (id: number) => {
    try {
      setLoadingDelete(true);
      await productCategoryApi.delete(id);
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
      <div className="filter-container">
        <Space>
          <div className="filter-item">
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
              placeholder="Tìm kiếm"
            />
          </div>

          <div className="filter-item btn">
            <Button
              onClick={() => {
                fetchData();
                setQuery({ ...query });
              }}
              type="primary"
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
            >
              Thêm mới
            </Button>
          </div>
        </Space>
      </div>

      <Spin spinning={loading}>
        <Table
          expandable={{
            expandedRowRender: () => <></>,
            expandIcon: () => <></>,
          }}
          pagination={false}
          rowKey="id"
          dataSource={productCategories}
        >
          <Column title="Tên" dataIndex="name" key="name" />
          <Column title="Mô tả" dataIndex="description" key="description" />
          <Column
            width={180}
            title="Thao tác"
            key="action"
            render={(text, record: ProductCategory) => (
              <Space>
                <Button
                  type="primary"
                  onClick={() => {
                    setSelectedCategory(record);
                    setProductModalVisible(true);
                  }}
                >
                  Sản phẩm
                </Button>
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

      {/* Modal hiển thị sản phẩm theo danh mục */}
      {/* <ProductListModal
        visible={productModalVisible}
        category={selectedCategory}
        onClose={() => setProductModalVisible(false)}
      /> */}

      <ProductCategoryModal
        onSubmitOk={fetchData}
        onClose={() => {}}
        ref={modalRef}
      />
    </div>
  );
};
