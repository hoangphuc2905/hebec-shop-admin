import { Store } from "antd/lib/form/interface";
import { Customer } from "./customer";
import { News } from "./news";
import { NotificationMode } from "./notification";
import { Order } from "./order";
import { Product } from "./product";
import { Staff } from "./staff";

export enum NotificationStoreType {
  Order = "ORDER",
  Admin = "ADMIN",
  Product = "PRODUCT",
  Normal = "NORMAL",
  News = "NEWS",
  Transport = "TRANSPORT",
}

export const notificationStoreTypeTrans = {
  [NotificationStoreType.Order]: {
    label: "Đơn hàng",
    value: NotificationStoreType.Order,
    color: "geekblue",
  },
  [NotificationStoreType.Product]: {
    label: "Đánh giá",
    value: NotificationStoreType.Product,
    color: "geekblue",
  },
  [NotificationStoreType.Admin]: {
    label: "Từ Admin",
    value: NotificationStoreType.Admin,
    color: "red",
  },
};

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
  type: NotificationStoreType;
  mode: NotificationMode;
  lastSentAt: number;
  sendCount: number; //số lần gửi
  customer: Customer;
  assignedCustomers: Customer[];
  viewedCustomers: Customer[]; //Users da xem tin
  order: Order;
  news: News;
  staffSent: Staff;
  product: Product;
  store: Store;
  isRead: boolean;
  from: string;
}
