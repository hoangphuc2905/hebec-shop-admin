import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Spin, Table, Tag } from "antd";
import Modal from "antd/lib/modal/Modal";
import Column from "antd/lib/table/Column";
import { Pagination } from "components/Pagination";
import moment from "moment";
import { useEffect } from "react";
import { News } from "types/news";
import { useHandlerNews } from "views/News/handler/useHandlerNews";

export interface NewsModalProps {
  visible?: boolean;
  onSelect: (data: News) => void;
  onCancel?: () => void;
}

const NewsModal = (props: NewsModalProps) => {
  const {
    data,
    total,
    loading,
    fetchData,
    query,
    endData: deleteData,
  } = useHandlerNews({
    initQuery: {
      page: 1,
      limit: 50,
      search: "",
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Modal
      maskClosable={false}
      title={"Chọn tin tức"}
      style={{ top: 20 }}
      width={1000}
      cancelText="Đóng"
      okText="Lưu"
      onCancel={props.onCancel}
      visible={props.visible}
    >
      <div className="filter-container">
        <Space>
          <div className="filter-item">
            <label htmlFor="">Tìm kiếm</label>
            <Input
              onKeyDown={(ev) => {
                if (ev.code == "Enter") {
                  fetchData();
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
              onClick={() => fetchData(query)}
              type="primary"
              icon={<SearchOutlined />}
            >
              Tìm kiếm
            </Button>
          </div>
        </Space>
      </div>

      <Spin spinning={loading}>
        <Table pagination={false} rowKey="id" dataSource={data}>
          <Column
            title="Tiêu đề"
            dataIndex="title"
            key="title"
            render={(text, record: News) => text}
          />

          <Column
            title="Thời gian tạo"
            dataIndex="createdAt"
            sorter
            key="createdAt"
            render={(text, record: News) =>
              moment.unix(text).format("DD/MM/YYYY")
            }
          />

          <Column
            title="Nội dung"
            dataIndex="content"
            key="content"
            render={(text, record: News) => (
              <div
                className="text-one-line"
                dangerouslySetInnerHTML={{ __html: text }}
              />
            )}
          />
          <Column
            title="Nổi bật"
            dataIndex="isHighlight"
            key="isHighlight"
            render={(text, record: News) => (
              <span>
                <Tag color={text ? "green" : "red"}>{text ? "Bật" : "Tắt"}</Tag>
              </span>
            )}
          />
          <Column
            title="Trạng thái"
            dataIndex="isVisible"
            key="isVisible"
            render={(text, record: News) => (
              <span>
                <Tag color={text ? "green" : "red"}>
                  {text ? "Hiển thị" : "Bị ẩn"}
                </Tag>
              </span>
            )}
          />

          <Column
            title="Thao tác"
            key="action"
            render={(text, record: News) => (
              <span>
                <Space>
                  <Button
                    type="primary"
                    onClick={() => {
                      props?.onSelect(record);
                    }}
                  >
                    Chọn
                  </Button>
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
    </Modal>
  );
};

export default NewsModal;
