import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Select, Space, Spin, Table, Tag } from "antd";
import RefAutoComplete from "antd/lib/auto-complete";
import { productApi } from "api/product.api";
import { Pagination } from "components/Pagination";
import { QueryParams } from "hooks/useFetchData";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Product } from "types/product";
import { Store } from "types/store";
import { formatVND } from "utils";
import { useHandlerProduct } from "views/Product/handler/useHandlerProduct";
import { getFinalPriceToShow } from "views/PromotionCampaign/components/PromotionProductModal";

interface FlashSaleProductModalProps {
  visible?: boolean;
  isGift?: boolean;
  onCancel: () => void;
  onOk: (selectedProduct: Product[]) => void;

  initialQuery?: QueryParams;
  selectedStore?: Store;
}

type EditableTableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

const defaultColumns: (ColumnTypes[number] & {
  editable?: boolean;
  dataIndex: string;
})[] = [
  {
    title: "Ảnh SP",
    dataIndex: "image",
    width: 70,
    render: (text) => <img width={46} src={text}></img>,
  },
  {
    title: "Mã SP",
    dataIndex: "code",
  },
  {
    title: "Tên SP",
    dataIndex: "name",
  },
  {
    title: "Giá",
    dataIndex: "unitPrice",
    align: "right",
    render: (text, record: any) => getFinalPriceToShow(record),
  },

  {
    title: "Danh mục sản phẩm",
    dataIndex: "productCategory",
    align: "right",
    render: (text, record: any) => <span>{record.productCategory?.name}</span>,
  },
  {
    title: "Nổi bật",
    dataIndex: "isHighlight",
    render: (text) => (
      <span>
        <Tag color={text ? "green" : "red"}>{text ? "Bật" : "Tắt"}</Tag>
      </span>
    ),
  },
  {
    title: "Trạng thái",
    dataIndex: "isActive",
    render: (text) => (
      <span>
        <Tag color={text ? "green" : "red"}>{text ? "Hiển thị" : "Bị ẩn"}</Tag>
      </span>
    ),
  },
];

export interface ISelectProductsPromotionModalInterface {
  open: (
    query: { startAt: number; endAt: number; isVariantProduct?: boolean },
    selectedProducts: Product[]
  ) => void;
  close: () => void;
  fetch: () => void;
  query: () => void;
}

const initQuery = {
  page: 1,
  limit: 10,
  search: "",
};

export const SelectProductsPromotionModal = forwardRef(
  (
    {
      isGift,
      initialQuery,
      onOk,
      selectedStore,
    }: Omit<FlashSaleProductModalProps, "onCancel">,
    ref
  ) => {
    const [visible, setVisible] = useState(false);
    const [queryFilter, setQueryFilter] = useState<any>(initQuery);
    const {
      query,
      total,
      loading,
      fetchProductCategories,
      fetchData,
      fetchProductPromotionAvailable,
      productCategory,
      productPromotionAvailable,
      data,
      totalAvailable,
    } = useHandlerProduct({
      initQuery: {
        ...initialQuery,
        search: "",
        page: 1,
        limit: 10,
        storeId: selectedStore?.id,
      },
      api: productApi.findAll,
    });
    const [selectedRowsTemp, setSelectedRowsTemp] = useState<Product[]>([]);

    const onCancel = () => {
      setVisible(false);
    };

    useImperativeHandle(
      ref,
      () => ({
        open: (
          newQuery: { startAt: number; endAt: number },
          selectedProducts: Product[]
        ) => {
          setVisible(true);
          query.limit = initQuery.limit;
          query.page = initQuery.page;
          query.search = initQuery.search;
          setQueryFilter({
            ...query,
            ...newQuery,
          });
          if (isGift) {
            fetchData({
              ...query,
              page: 1,
            });
          } else {
            fetchProductPromotionAvailable({
              ...query,
              ...newQuery,
              page: 1,
              search: "",
            });
          }
          setSelectedRowsTemp(selectedProducts);
        },
        close: onCancel,
        fetch: fetchProductPromotionAvailable,
        query: query,
      }),
      [productPromotionAvailable, data]
    );

    useEffect(() => {
      fetchProductCategories();
    }, []);

    return (
      <Modal
        style={{ top: 5 }}
        onCancel={onCancel}
        visible={visible}
        destroyOnClose={true}
        width={1000}
        onOk={() => onOk(selectedRowsTemp)}
        cancelText="Đóng"
      >
        <Spin spinning={loading}>
          <div className="filter-container">
            <Space>
              <div className="filter-item">
                <label htmlFor="">Tìm kiếm</label>
                <Input
                  onKeyDown={(ev) => {
                    if (ev.code == "Enter") {
                      if (isGift) {
                        fetchData({
                          ...queryFilter,
                          search: ev.currentTarget.value,
                        });
                      } else {
                        fetchProductPromotionAvailable({
                          ...queryFilter,
                          search: ev.currentTarget.value,
                        });
                      }
                    }
                  }}
                  size="middle"
                  onChange={(ev) => {
                    setQueryFilter({
                      ...queryFilter,
                      search: ev.currentTarget.value,
                    });
                  }}
                  placeholder="Tìm kiếm"
                />
              </div>
              <div className="filter-item">
                <label htmlFor="">Loại SP</label>
                <Select
                  allowClear
                  onClear={() => {
                    fetchProductPromotionAvailable({
                      ...queryFilter,
                      productCategoryId: undefined,
                    });
                  }}
                  onChange={(value) => {
                    query.productCategoryId = value;
                    fetchProductPromotionAvailable({
                      ...queryFilter,
                      productCategoryId: value,
                    });
                  }}
                  style={{ width: "100%", minWidth: "150px" }}
                  options={productCategory}
                  fieldNames={{
                    value: "id",
                    label: "name",
                  }}
                />
              </div>
              <div className="filter-item btn">
                <Button
                  onClick={() =>
                    fetchProductPromotionAvailable({
                      ...queryFilter,
                    })
                  }
                  type="primary"
                  icon={<SearchOutlined />}
                >
                  Tìm kiếm
                </Button>
              </div>
            </Space>
          </div>
          <Table
            pagination={false}
            rowKey={"id"}
            columns={defaultColumns}
            dataSource={isGift ? data : productPromotionAvailable}
            rowSelection={{
              type: "checkbox",
              preserveSelectedRowKeys: true,
              getCheckboxProps: (record: any) => ({
                // disabled: selecteds.some((sl) => sl.id === record.id), // Column configuration not to be checked
                name: record.name,
                className: "error",
              }),
              onSelect: (record) => {},
              onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
                setSelectedRowsTemp(selectedRows);
              },
              selectedRowKeys: selectedRowsTemp.map((item) => item?.id),
            }}
            onRow={(r: any) => {
              return {
                onClick: () => {
                  console.log(selectedRowsTemp);

                  const check = !selectedRowsTemp.find((e) => e.id === r.id);
                  if (check) {
                    setSelectedRowsTemp([...selectedRowsTemp, r]);
                  } else {
                    setSelectedRowsTemp(
                      selectedRowsTemp.filter((e) => e.id !== r.id)
                    );
                  }
                },
              };
            }}
          ></Table>

          <Pagination
            currentPage={query.page}
            defaultPageSize={query.limit}
            total={isGift ? total : totalAvailable}
            onChange={(pagination) => {
              query.page = pagination.page;
              query.limit = pagination.limit;

              if (isGift) {
                fetchData({ ...queryFilter, ...pagination });
              } else {
                fetchProductPromotionAvailable({
                  ...queryFilter,
                  ...pagination,
                });
              }
            }}
          />
        </Spin>
      </Modal>
    );
  }
);
