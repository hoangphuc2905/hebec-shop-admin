import React from "react";
import {
  CouponCampaignType,
  couponDiscountTrans,
  CouponDiscountType,
} from "types/coupon-campaign";
import {} from "types/promotion-campaign";
import "./styles/style.scss";

type CustomFormItemProps = {
  value?: CouponDiscountType;
  disabled?: boolean;
  allowClear?: boolean;
  couponCampaignType?: CouponCampaignType;
  onChange?: (value: CouponDiscountType | undefined) => void;
};

export const CouponTypeRatio: React.FC<CustomFormItemProps> = ({
  value,
  disabled = false,
  allowClear = false,
  couponCampaignType = CouponCampaignType.Gift,
  onChange,
}) => {
  return (
    <>
      <div className="payment-type-container">
        {couponCampaignType === CouponCampaignType.Code
          ? Object.values(couponDiscountTrans)
              .filter((it) => it.value !== CouponDiscountType.Gift)
              .map((item) => (
                <div
                  key={item.value}
                  className={`payment-type-item box ${
                    //@ts-ignore
                    item.value == value ? "active" : ""
                  }
            ${disabled ? "disabled" : ""}
            `}
                  onClick={() => {
                    if (disabled) return;
                    if (onChange) {
                      if (allowClear) {
                        //Cho phép bỏ chọn
                        if (item.value == value) {
                          onChange(undefined);
                        } else {
                          onChange(item.value);
                        }
                      } else {
                        onChange(item.value);
                      }
                    }
                  }}
                >
                  <img src={item.icon} width={25} alt="" />
                  <p> {item.title}</p>
                </div>
              ))
          : Object.values(couponDiscountTrans).map((item) => (
              <div
                key={item.value}
                className={`payment-type-item box ${
                  //@ts-ignore
                  item.value == value ? "active" : ""
                }
            ${disabled ? "disabled" : ""}
            `}
                onClick={() => {
                  if (disabled) return;
                  if (onChange) {
                    if (allowClear) {
                      //Cho phép bỏ chọn
                      if (item.value == value) {
                        onChange(undefined);
                      } else {
                        onChange(item.value);
                      }
                    } else {
                      onChange(item.value);
                    }
                  }
                }}
              >
                <img src={item.icon} width={25} alt="" />
                <p> {item.title}</p>
              </div>
            ))}
      </div>
    </>
  );
};
