import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Popconfirm, Space, Spin, Table, Tooltip } from "antd";
import Column from "antd/lib/table/Column";
import { useEffect, useRef } from "react";
import { getTitle } from "utils";
import { CustomerFilterModal } from "./components/CustomerFilterModal";
import { CustomerFilter } from "types/customer-filter";
import { useHandlerCustomerFilter } from "./handler/useHandlerCustomerFilter";
import { Pagination } from "components/Pagination";

export const CustomerFilterPage = ({ title = "" }) => {
  useEffect(() => {
    document.title = getTitle(title);
    fetchData();
  }, []);

  const {
    data,
    loading,
    total,
    query,
    fetchData,
    endData: deleteData,
  } = useHandlerCustomerFilter({
    initQuery: { page: 1, limit: 10, search: "" },
  });
  const modalRef = useRef<CustomerFilterModal>(null);

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
                  fetchData();
                }
              }}
              size="middle"
              onChange={(ev) => {
                query.search = ev.currentTarget.value;
                ev.target.value.trim().length === 0 && fetchData();
              }}
              placeholder="Nhập tên"
            />
          </div>

          <div className="filter-item btn">
            <Button
              onClick={() => {
                fetchData({ page: 1 });
              }}
              type="primary"
              icon={<SearchOutlined />}
            >
              Tìm kiếm
            </Button>
          </div>
          {
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
          }
        </Space>
      </div>

      <Spin spinning={loading}>
        <Table
          pagination={false}
          rowKey="id"
          dataSource={data}
          onRow={(r: CustomerFilter) => {
            return {
              onClick: () => {
                modalRef.current?.handleUpdate(r);
              },
            };
          }}
        >
          <Column
            title="Tên"
            dataIndex={"name"}
            key={"name"}
            render={(text) => (
              <span className="line-clamp-2" style={{ maxWidth: 300 }}>
                {text}
              </span>
            )}
          />
          <Column
            key={"description"}
            dataIndex={"description"}
            title="Mô tả"
            render={(text, record: CustomerFilter) => (
              <Tooltip title={text}>
                <span className="line-clamp-2" style={{ maxWidth: 300 }}>
                  {text}
                </span>
              </Tooltip>
            )}
          />

          <Column
            title="Thao tác"
            key="action"
            render={(text, record: CustomerFilter) => (
              <span>
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
                    onConfirm={(e) => {
                      e?.stopPropagation();
                      deleteData(record.id);
                    }}
                    onCancel={(e) => e?.stopPropagation()}
                    placement="top"
                    title="Xác nhận xóa?"
                  >
                    <Button onClick={(e) => e.stopPropagation()} danger>
                      Xóa
                    </Button>
                  </Popconfirm>
                </Space>
              </span>
            )}
          />
        </Table>

        <Pagination
          currentPage={query.page}
          total={total}
          onChange={fetchData}
        />
      </Spin>

      <CustomerFilterModal
        ref={modalRef}
        onSubmitOk={fetchData}
        onClose={fetchData}
      />
    </div>
  );
};
