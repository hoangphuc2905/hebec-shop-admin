import {
  ClockCircleOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Input,
  message,
  Popconfirm,
  Select,
  Space,
  Spin,
  Table,
  Tag,
} from "antd";
import { Modal } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import { leadApi } from "api/lead.api";

import { Pagination } from "components/Pagination";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { areaStore } from "store/areaStore";
import { Lead, LeadStatus } from "types/lead";
import { ModalStatus } from "types/modal";
import { News } from "types/news";
import { QueryParam } from "types/query";
import { getTitle } from "utils";
import { formatDate } from "utils/date";
import { $url } from "utils/url";
import { NewsModal } from "views/News/components/NewsModal";
// import { StaffModal } from "./components/StaffModal";

const { Column } = Table;

interface NewsQuery extends QueryParam {
  areaId: number | null;
  status?: LeadStatus;
}

export const LeadPage = observer(({ title = "" }) => {
  const [query, setQuery] = useState<NewsQuery>({
    page: 1,
    limit: 50,
    search: "",
    areaId: null,
  });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<News[]>([]);
  const [total, setTotal] = useState(0);
  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState<Partial<News>>({});
  const [modalStatus, setModalStatus] = useState<ModalStatus>("create");

  useEffect(() => {
    document.title = getTitle(title);
    areaStore.fetchList();
  }, []);

  useEffect(() => {
    fetchData();
  }, [query]);

  const fetchData = async () => {
    setLoading(true);
    const res = await leadApi.findAll(query);
    setLoading(false);
    setData(res.data.leads);
    setTotal(res.data.total);
  };

  const handleProcess = async (news: News) => {
    setLoading(true);
    try {
      await leadApi.processing(news.id);
      fetchData();
      message.info("Đã đánh dấu thành đang xử lý");
    } finally {
      setLoading(false);
      fetchData();
    }
  };

  const handleComplete = async (news: News) => {
    setLoading(true);
    try {
      await leadApi.complete(news.id);
      fetchData();
      message.info("Đã đánh dấu là đã hoàn thành");
    } finally {
      setLoading(false);
      fetchData();
    }
  };

  const handleToggle = async (news: News) => {
    setLoading(true);
    try {
      if (news.isVisible) {
        await leadApi.update(news.id, {
          news: {
            isVisible: false,
          },
        });
        message.info("Ẩn thành công!");
      } else {
        await leadApi.update(news.id, {
          news: {
            isVisible: true,
          },
        });
        message.info("Hiển thị thành công!");
      }
    } finally {
      fetchData();
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="filter-container">
        <Space>
          <div className="filter-item">
            <label htmlFor="">Tìm kiếm</label>
            <Input
              onKeyDown={(ev) => {
                if (ev.code == "Enter") {
                  setQuery({ ...query, page: 1 });
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
                setQuery({ ...query, page: 1 });
              }}
              type="primary"
              icon={<SearchOutlined />}
            >
              Tìm
            </Button>
          </div>
          <div className="filter-item ">
            <label htmlFor="">Trạng thái</label>
            <br />
            <Select
              style={{ width: "150px" }}
              allowClear
              filterOption={false}
              onChange={(value) => setQuery({ ...query, status: value })}
            >
              <Select.Option value={LeadStatus.complete}>
                Hoàn thành
              </Select.Option>
              <Select.Option value={LeadStatus.processing}>
                Đang xử lý
              </Select.Option>
            </Select>
          </div>
        </Space>
      </div>

      <Spin spinning={loading}>
        <Table pagination={false} rowKey="id" dataSource={data}>
          <Column
            title="Người dùng"
            dataIndex="name"
            render={(text, record: Lead) => (
              <>
                <p>
                  <b>Tên:</b> {record.name}
                </p>
                <p>
                  <b>Số điện thoại:</b> {record.phone}
                </p>
                <p>
                  <b>Email:</b> {record.email}
                </p>
              </>
            )}
          />

          <Column
            title="Nội dung"
            dataIndex="shortDescription"
            key="shortDescription"
            render={(text, record: Lead) => (
              <>
                <Paragraph
                  ellipsis={{
                    rows: 3,
                    expandable: true,

                    onEllipsis: (ellipsis) => {},
                  }}
                >
                  {record.content}
                </Paragraph>
              </>
            )}
          />
          <Column
            title="Trạng thái"
            dataIndex="shortDescription"
            key="shortDescription"
            render={(text, record: Lead) => (
              <>
                {record.status == LeadStatus.complete && (
                  <Tag color="success">Đã hoàn thành</Tag>
                )}
                {record.status == LeadStatus.processing && (
                  <Tag color="blue">Đang xử lý</Tag>
                )}
              </>
            )}
          />
          <Column
            title="Ngày gửi"
            dataIndex="shortDescription"
            key="shortDescription"
            render={(text, record: Lead) => <>{formatDate(record.createdAt)}</>}
          />

          {/* <Column
            title="Trạng thái"
            dataIndex="isVisible"
            key="isVisible"
            render={(text) => (
              <Tag color={text ? "green" : "red"}>
                {text ? "Hiển thị" : "Bị ẩn"}
              </Tag>
            )}
          /> */}

          <Column
            title="Thao tác"
            width={200}
            key="action"
            render={(text, record: News) => (
              <span>
                <Space>
                  {/* <Button
                    type="primary"
                    onClick={() => {
                      setSelectedNews(record);
                      setVisibleModal(true);
                      setModalStatus("update");
                    }}
                  >
                    Cập nhật
                  </Button>

                  <Popconfirm
                    placement="topLeft"
                    title={`Xác nhận ${
                      record.isVisible ? "ẩn" : "hiển thị"
                    } tin tức này?`}
                    onConfirm={() => handleToggle(record)}
                    okText="Ok"
                    cancelText="Không"
                  >
                    <Button style={{ width: "80px" }}>
                      {record.isVisible ? "Ẩn" : "Hiển thị"}
                    </Button>
                  </Popconfirm> */}
                  <Space direction="vertical">
                    <Popconfirm
                      placement="top"
                      title={"Đánh dấu lead này thành đang xử lý?"}
                      onConfirm={() => handleProcess(record)}
                      okText="Đồng ý"
                      cancelText="Không"
                    >
                      <Button block type="primary">
                        Đánh dấu là đang xử lý
                      </Button>
                    </Popconfirm>
                    <Popconfirm
                      placement="top"
                      title={"Đánh dấu lead này thành đã hoàn thành?"}
                      onConfirm={() => handleComplete(record)}
                      okText="Đồng ý"
                      cancelText="Không"
                    >
                      <Button block type="primary">
                        Đánh dấu là đã hoàn thành
                      </Button>
                    </Popconfirm>
                  </Space>
                </Space>
              </span>
            )}
          />
        </Table>

        <Pagination
          total={total}
          currentPage={query.page}
          onChange={({ limit, page }) => {
            query.page = page;
            query.limit = limit;
            setQuery({ ...query });
          }}
        />
      </Spin>
      {visibleModal && (
        <NewsModal
          onClose={() => setVisibleModal(false)}
        />
      )}
    </div>
  );
});
