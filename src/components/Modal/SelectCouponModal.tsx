import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Spin, Table } from "antd";
import Modal from "antd/lib/modal/Modal";
import Column from "antd/lib/table/Column";
import { Pagination } from "components/Pagination";
import { useEffect } from "react";
import { CouponCampaign, CouponCampaignType } from "types/coupon-campaign";
import { formatDateTime } from "utils/date";
import { useHandlerCouponCampaign } from "views/CouponCampaign/handler/useHandlerCouponCampaign";

export interface CouponCampaignModalProps {
  visible?: boolean;
  onSelect: (data: CouponCampaign) => void;
  onCancel?: () => void;
  storeId?: number;
}

const SelectCouponCampaignModal = (props: CouponCampaignModalProps) => {
  const {
    data,
    total,
    loading,
    fetchData,
    query,
    endData: deleteData,
  } = useHandlerCouponCampaign({
    initQuery: {
      page: 1,
      limit: 50,
      search: "",
      type: CouponCampaignType.Gift,
    },
  });

  useEffect(() => {
    if (props.visible) {
      fetchData({
        // storeId: props.storeId,
      });
    }
  }, [props.visible]);

  return (
    <Modal
      maskClosable={false}
      title={"Chọn coupon"}
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
            title="Tên"
            dataIndex="name"
            key="name"
            render={(text, record: CouponCampaign) => text}
          />

          <Column
            title="Bắt đầu"
            dataIndex="startAt"
            key="startAt"
            render={(text, record: CouponCampaign) => formatDateTime(text)}
          />
          <Column
            title="Kết thúc"
            dataIndex="endAt"
            key="endAt"
            render={(text, record: CouponCampaign) => formatDateTime(text)}
          />

          <Column
            title="Thao tác"
            key="action"
            render={(text, record: CouponCampaign) => (
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

export default SelectCouponCampaignModal;
