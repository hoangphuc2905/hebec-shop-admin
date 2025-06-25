import { Product } from "./product";
import { CouponCampaign } from "./coupon-campaign";
import { Store } from "./store";
import { OrderDetail } from "./order";
import { ProductVariationDetailValue } from "./product-variation";

export enum PromotionConditionType {
  AllProduct = "ALL_PRODUCT",
  SomeProduct = "SOME_PRODUCT", //1 vài mặt hàng đc chọn
}

export const PromotionConditionTypeTrans = {
  [PromotionConditionType.AllProduct]: {
    value: PromotionConditionType.AllProduct,
    icon: "/images/receipt.png",
    title: "Đơn hàng",
  },
  [PromotionConditionType.SomeProduct]: {
    value: PromotionConditionType.SomeProduct,
    icon: "/images/product.png",
    title: "Một số mặt hàng",
  },
};

export enum PromotionDiscountType {
  ShipFee = "SHIP_FEE", //Khuyến mãi miễn phí giao hàng trong bao nhiêu km
  // Coupon = "COUPON", //Khuyến mãi tặng Coupon áp dụng định mức ví dụ: mua 500k được tặng 1 coupon
  Percent = "PERCENT", //giảm giá theo % của từng sp đc chọn
  Fixed = "FIXED", //theo giá tiền cứng
  Gift = "GIFT", //quà tặng kèm
}

export const promotionDiscountRoute = {
  [PromotionDiscountType.ShipFee]: {
    createUrl: "/campaign/promotion-free-ship",
    updateUrl: "/campaign/promotion-free-ship?promotionId=",
    role: "/campaign/promotion-free-ship",
  },
  [PromotionDiscountType.Fixed]: {
    createUrl: "/campaign/promotion-fixed",
    updateUrl: "/campaign/promotion-fixed?promotionId=",
    role: "/campaign/promotion-fixed",
  },
  [PromotionDiscountType.Percent]: {
    createUrl: "/campaign/promotion-percent",
    updateUrl: "/campaign/promotion-percent?promotionId=",
    role: "/campaign/promotion-percent",
  },
  [PromotionDiscountType.Gift]: {
    createUrl: "/campaign/promotion-gift",
    updateUrl: "/campaign/promotion-gift?promotionId=",
    role: "/campaign/promotion-gift",
  },
  // [PromotionDiscountType.Coupon]: {
  //   createUrl: "/campaign/promotion-coupon",
  //   updateUrl: "/campaign/promotion-coupon?promotionId=",
  //   role: "/campaign/promotion-coupon",
  // },
};
export const promotionDiscountTrans = {
  [PromotionDiscountType.ShipFee]: {
    icon: "/images/freeship.png",
    value: PromotionDiscountType.ShipFee,
    title: "Miễn phí vận chuyển",
    shortTitle: "Freeship",
  },
  [PromotionDiscountType.Percent]: {
    icon: "/images/percent.png",
    value: PromotionDiscountType.Percent,
    title: "Giảm theo % trên từng sản phẩm",
    shortTitle: "Theo %",
  },
  [PromotionDiscountType.Fixed]: {
    icon: "/images/money.png",
    value: PromotionDiscountType.Fixed,
    title: "Giảm giá theo định mức",
    shortTitle: "Theo định mức",
  },

  // [PromotionDiscountType.Coupon]: {
  //   icon: "/images/coupon.png",
  //   value: PromotionDiscountType.Coupon,
  //   title: "Tặng coupon",
  //   shortTitle: "Tặng coupon",
  // },
  [PromotionDiscountType.Gift]: {
    icon: "/images/gift.png",
    value: PromotionDiscountType.Gift,
    title: "Quà tặng kèm",
    shortTitle: "Quà tặng kèm",
  },
};

export interface PromotionCampaignDetail {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  deletedAt: number;
  isGift: boolean; //true: assign quà tặng, false: sp đc chọn
  quantity: number; //sl quà tặng
  needed: number; //sl cần mua để tặng
  discount: number; //giá trị giảm (vnđ)
  discountPercent: number;
  price: number; //giá gốc (vnđ)
  finalPrice: number; //giá sau khi giảm (vnđ)
  used: number; //sl đã dùng đối với quà tặng
  isVariation: boolean; //true: sp biến thể
  product: Product;
  productId: number;
  promotionCampaignDetailId?: number;
  promotionCampaign: PromotionCampaign;
  orderDetails: OrderDetail[];
  giftOrderDetails: OrderDetail[];
  productVariationDetailValue: ProductVariationDetailValue;
}

export interface PromotionCampaign {
  code: string;
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  conditionType: PromotionConditionType;
  name: string;
  isLimitValue: boolean;
  startAt: number; //unix startOf day
  endAt: number; //unix endOf day
  noExpired: boolean; //true: k thời hạn
  conditionValue: number; //giá trị đơn hàng có để áp dụng mã. Đối với CouponConditionType.Fixed || CouponConditionType.Percent.
  discountValue: number; //giá trị giảm (tiền). Đối với CouponConditionType.Fixed || CouponConditionType.Percent.
  discountMaxValue: number; //giá trị giảm tối đa. Đối với CouponConditionType.Percent. 0: k giới hạn
  distance: number; //số km cho km ship fee
  discountType: PromotionDiscountType;
  promotionCampaignDetails: PromotionCampaignDetail[];
  giftsDetails: PromotionCampaignDetail[];
  couponCampaign: CouponCampaign;
  store: Store;
  storeId: number;
  couponCampaignId?: number;
  isStartNow?: boolean;
  couponData: CouponCampaign; //Form only
}
