import React, { useMemo } from "react";
import {
  PromotionConditionType,
  promotionDiscountTrans,
  PromotionDiscountType,
} from "types/promotion-campaign";
import "./styles/style.scss";

type CustomFormItemProps = {
  value?: PromotionDiscountType;
  disabled?: boolean;
  conditionType?: PromotionConditionType;
  allowClear?: boolean;
  onChange?: (value: PromotionDiscountType | undefined) => void;
};

export const PromotionTypeRatio: React.FC<CustomFormItemProps> = ({
  value,
  conditionType,
  disabled = false,
  allowClear = false,
  onChange,
}) => {
  const options = useMemo(() => {
    switch (conditionType) {
      case PromotionConditionType.AllProduct:
        return [
          promotionDiscountTrans.SHIP_FEE,
          promotionDiscountTrans.FIXED,
          promotionDiscountTrans.GIFT,
          // promotionDiscountTrans.COUPON,
        ];

      case PromotionConditionType.SomeProduct:
        return [promotionDiscountTrans.PERCENT, promotionDiscountTrans.GIFT];
      default:
        //Show cho bớt trống giao diện
        return [
          promotionDiscountTrans.SHIP_FEE,
          promotionDiscountTrans.FIXED,
          promotionDiscountTrans.GIFT,
          // promotionDiscountTrans.COUPON,
        ];
    }
  }, [conditionType]);
  return (
    <>
      <div className="payment-type-container">
        {options.map((item) => (
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
            <p> {item.shortTitle}</p>
          </div>
        ))}
      </div>
    </>
  );
};
