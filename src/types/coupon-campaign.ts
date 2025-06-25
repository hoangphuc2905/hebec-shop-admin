import { Customer } from "./customer";
import { PromotionCampaign } from "./promotion-campaign";
import { Product } from "./product";
import { Order } from "./order";
import { ProductVariationDetailValue } from "./product-variation";

export enum CouponDiscountType {
  Fixed = "FIXED", //theo giá tiền cứng
  Percent = "PERCENT", //theo % đơn hàng
  Gift = "GIFT", //quà Quà ngoài hệ thống, không cần áp dụng trong phần
}

export const couponDiscountTrans = {
  [CouponDiscountType.Fixed]: {
    value: CouponDiscountType.Fixed,
    title: "Theo tiền cứng",
    icon: "/images/money.png",
  },
  [CouponDiscountType.Gift]: {
    value: CouponDiscountType.Gift,
    title: "Quà ngoài hệ thống",
    icon: "/images/gift.png",
  },
  [CouponDiscountType.Percent]: {
    value: CouponDiscountType.Percent,
    title: "Theo phần trăm",
    icon: "/images/percent.png",
  },
};

export enum CouponConditionType {
  AllProduct = "ALL_PRODUCT",
  SomeProduct = "SOME_PRODUCT", //1 vài mặt hàng đc chọn
}

export enum CouponApplyFor {
  All = "ALL",
  Some = "SOME",
}

export const couponConditionTypeTrans = {
  [CouponConditionType.AllProduct]: {
    value: CouponConditionType.AllProduct,
    icon: "/images/receipt.png",
    title: "Đơn hàng",
  },
  [CouponConditionType.SomeProduct]: {
    value: CouponConditionType.SomeProduct,
    icon: "/images/product.png",
    title: "Một số mặt hàng",
  },
};

export enum CouponCampaignType {
  DOB = "DOB", //snhật khách hàng
  Gift = "GIFT",
  FirstRegister = "FIRST_REGISTER", //đk user lần đầu
  // Event = "EVENT", //event admin có thể tạo: giáng sinh, quốc khách, các dịp lễ, ...
  Code = "CODE", //dạng code cứng
}

export const couponCampaignTrans = {
  // [CouponCampaignType.Event]: {
  //   value: CouponCampaignType.Event,
  //   title: "Các sự kiện",
  //   shortTitle: "Sự kiện",
  // },
  [CouponCampaignType.Gift]: {
    value: CouponCampaignType.Gift,
    title: "Tặng trực tiếp",
    shortTitle: "Tặng trực tiếp",
  },
  [CouponCampaignType.DOB]: {
    value: CouponCampaignType.DOB,
    title: "Sinh nhật khách hàng",
    shortTitle: "Sinh nhật",
  },
  [CouponCampaignType.FirstRegister]: {
    value: CouponCampaignType.FirstRegister,
    title: "Đăng ký lần đầu",
    shortTitle: "KH mới",
  },
  [CouponCampaignType.Code]: {
    value: CouponCampaignType.Code,
    title: "Mã Coupon cứng cho KH",
    shortTitle: "Mã Coupon",
  },
};

export interface CouponCampaignDetail {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  quantity: number; //sl quà đã tặng đối với quà trong kho
  stock: number; //sl quà có thể tặng đối với quà trong kho
  couponCampaign: CouponCampaign;
  product: Product;
  unitPrice: number;
}

export interface PromotionCampaignDetail {
  id: number;
  campaignDetailId: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  discount: number;
  discountPercent: number;
  unitPrice: number;
  price: number;
  finalPrice: number;
  pending: number; //sl đã bán, chưa hoàn thành đơn
  isGift: boolean; //true: assign quà tặng, false: sp đc chọn
  product: Product;
  promotionCampaign: PromotionCampaign;
  productVariationDetailValue: ProductVariationDetailValue;
}

export interface CustomerCoupon {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  deletedAt: number;
  code: string; //mã coupon, k trùng
  isUsed: boolean; //đã sử dụng
  expiredAt: number;
  discountMaxValue: number;
  usedAt: number;
  discountValue: number;
  couponCampaign: CouponCampaign;
  customer: Customer;
  discountType: CouponDiscountType;
  orders: Order[];
  conditionType: CouponConditionType;
  conditionValue: number;
  type: CouponCampaignType;
}

export interface CouponCampaign {
  code: string;
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  // Event: 'EVENT', //event admin có thể tạo: giáng sinh, quốc khách, các dịp lễ, ...
  name: string; //tên chiến dịch
  type: CouponCampaignType;
  startAt: any;
  endAt: any;
  expiredAt: number;
  isLimitValue: boolean;
  expireDay: number; //Số ngày hết hạn sau khi cấp phát cho khách hàng
  noExpired: boolean; //true: k thời hạn
  conditionType: CouponConditionType;
  discountType: CouponDiscountType;
  conditionValue: number; //giá trị đơn hàng có để áp dụng mã. Đối với CouponConditionType.Fixed || CouponConditionType.Percent.
  discountValue: number; //giá trị giảm (tiền). Đối với CouponConditionType.Fixed || CouponConditionType.Percent.
  discountMaxValue: number; //giá trị giảm tối đa. Đối với CouponConditionType.Percent. 0: k giới hạn
  isEnabled: boolean; //true: chiến dịch đc bật
  couponCampaignDetails: CouponCampaignDetail[];

  customerCoupons: CustomerCoupon[];
  promotionCampaigns: PromotionCampaign[];
  applyFor: CouponApplyFor;
  giftedCustomers: Customer[];
}
