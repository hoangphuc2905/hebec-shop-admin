import React from "react";
import {
  PromotionConditionType,
  PromotionConditionTypeTrans,
} from "types/promotion-campaign";
import "./styles/style.scss";
import {
  CouponCampaignType,
  CouponConditionType,
  couponConditionTypeTrans,
} from "types/coupon-campaign";

type CustomFormItemProps = {
  value?: CouponConditionType;
  disabled?: boolean;
  hiddenCOD?: boolean;
  hiddenUnpaid?: boolean;
  allowClear?: boolean;
  couponCampaignType?: CouponCampaignType;
  onChange?: (value: CouponConditionType | undefined) => void;
};

export const CampaignConditionRatio: React.FC<CustomFormItemProps> = ({
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
          ? Object.values(couponConditionTypeTrans)
              .filter((it) => it.value != CouponConditionType.SomeProduct)
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
          : Object.values(couponConditionTypeTrans).map((item) => (
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
