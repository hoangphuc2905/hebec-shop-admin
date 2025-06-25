import { Store } from "antd/lib/form/interface";
import { Area } from "./area";
import { Customer } from "./customer";
import { News } from "./news";
import { Product } from "./product";
import { Shop } from "./shop";
import { Staff } from "./staff";
import { Order } from "./order";
import { GroupCustomer } from "./group-customer";
import { CouponCampaign } from "./coupon-campaign";
import { PromotionCampaign } from "./promotion-campaign";
import { ZNSTemplate } from "./zns-template";

export enum NotificationType {
  Order = "ORDER",
  News = "NEWS",
  Coupon = "COUPON",
  Promotion = "PROMOTION",
  Product = "PRODUCT",
  Normal = "NORMAL", //Chúc mừng và thông báo cần truyền đạt thủ công khác
}

export const notificationTypeTrans = {
  // [NotificationType.Order]: {
  //   label: "Nội dung đơn hàng",
  //   value: NotificationType.Order,
  // },
  [NotificationType.Product]: {
    label: "Nội dung sản phẩm",
    value: NotificationType.Product,
  },
  [NotificationType.News]: {
    label: "Nội dung tin tức",
    value: NotificationType.News,
  },
  [NotificationType.Coupon]: {
    label: "Coupon",
    value: NotificationType.Coupon,
  },
  [NotificationType.Promotion]: {
    label: "Promotion",
    value: NotificationType.Promotion,
  },
  [NotificationType.Normal]: {
    label: "Mặc định",
    value: NotificationType.Normal,
  },
};

export enum NotificationMode {
  Global = "GLOBAL", //Tất cả user
  Private = "PRIVATE", // riêng cá nhân
  Group = "GROUP", // cho 1 group user
}

export interface Notification {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  deletedAt: number;
  title: string;
  shortContent: string;
  content: string;
  isBirthday: boolean;
  type: NotificationType;
  mode: NotificationMode;
  lastSentAt: number;
  sendCount: number; //số lần gửi
  customer: Customer;
  assignedCustomers: Customer[];
  viewedCustomers: Customer[]; //Users da xem tin
  order: Order;
  news: News;
  couponCampaign: CouponCampaign;
  promotionCampaign: PromotionCampaign;
  staffSent: Staff;
  employeeSent: Staff;
  product: Product;
  store: Store;
  isRead: boolean;
  from: string;
  groupCustomer: GroupCustomer;
  znsTemplate: ZNSTemplate;
}
