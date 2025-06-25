import { Space } from "antd";
import moment from "moment";
import {
  CouponCampaign,
  CouponCampaignType,
  CouponConditionType,
  couponCampaignTrans,
  couponConditionTypeTrans,
} from "types/coupon-campaign";
import { formatVND } from "utils";
import { CouponItem } from "views/CreateOrder/components/PromotionItem";

export const CouponDetailItem = ({
  bordered = false,
  coupon,
  expiredAt,
  showExpiredAt = true,
  hiddenProductList,
}: {
  bordered?: boolean;
  coupon: CouponCampaign;
  showExpiredAt?: boolean;
  expiredAt?: number;
  hiddenProductList?: boolean;
}) => {
  return (
    <div
      className="my-white-bg"
      style={{
        border: bordered ? "1px solid #efefef" : "unset",
        width: "fit-content",
      }}
    >
      <div className="card-body">
        <div className="my-light-pink-bg p-8px w-100">
          <div className="coupon__name secondary-font">
            <h3 className={"mb-0px text-center"} style={{ color: "#ef0000" }}>
              {coupon?.type == CouponCampaignType.Gift || !coupon?.type //case chi tiết promotion
                ? coupon?.name
                : couponCampaignTrans[coupon?.type]?.title}
            </h3>
          </div>
        </div>
        <div
          className="coupon-conditions p-20px my-grey-text"
          style={{ textAlign: "left" }}
        >
          <p className="fw-600 my-black-text" style={{ marginBottom: 0 }}>
            Điều kiện sử dụng
          </p>

          <p className="mb-1px">
            <CouponItem couponCampaign={coupon}></CouponItem>
          </p>
          <p className="mb-1px">
            Áp dụng cho đơn từ {formatVND(coupon?.conditionValue || 0)} VNĐ
          </p>
          <div className="divider dotted mt-8px"></div>
          <p></p>
          <p className="fw-600 my-black-text" style={{ marginBottom: 0 }}>
            Sản phẩm áp dụng
          </p>
          <p className="mb-1px">
            {couponConditionTypeTrans[coupon?.conditionType]?.title}
          </p>

          {coupon?.conditionType === CouponConditionType.SomeProduct &&
            hiddenProductList && (
              <div
                style={{
                  maxHeight: 200,
                  overflow: "auto",
                  overscrollBehavior: "contain",
                }}
              >
                {coupon?.couponCampaignDetails?.map((product) => (
                  <p className="mb-1px" key={product.id}>
                    <Space>
                      <img
                        src={product?.product?.image}
                        width={20}
                        height={20}
                        alt=""
                      />
                      <span className="fz-10">{product?.product?.name}</span>
                    </Space>
                  </p>
                ))}
              </div>
            )}

          {showExpiredAt && <div className="divider dotted mt-8px"></div>}
        </div>
        {showExpiredAt && (
          <div className="coupon-expried  my-grey-text p-8px">
            <p className="fw-600 my-black-text mb-1px">Hạn dùng</p>
            {expiredAt && (
              <> Trước ngày: {moment.unix(expiredAt).format("DD/MM/YYYY")}</>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
