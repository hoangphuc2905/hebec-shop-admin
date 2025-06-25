import { CustomerRank } from "types/customer-rank";
import { Deposit } from "types/deposit";
import { Gender } from "constant";
import { City, District, Ward } from "./address";
import { Area } from "./area";
import { CustomerTransaction } from "./customerTransaction";
import { News } from "./news";
import { CustomerCoupon } from "./coupon-campaign";
import { Order } from "./order";
import { Product } from "./product";
import { ProductCategory } from "./product-category";
import { Store } from "./store";

export interface Customer {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  code: string;
  email: string;
  balance: number; // points
  totalBalance: number;
  firstName: string;
  lastName: string;
  fullName: string;
  avatar: string;
  totalOrders: number;
  bio: string;
  isAllowChangeDob: boolean; //true: đã nhận coupon quà sinh nhật -> k đc đổi ngày sinh
  isFollowZaloOA: boolean;
  fcmToken: string;
  fcmTokenExpired: number;
  totalRefs: number;
  dob: string; //format: Y-m-d
  isVerified: boolean; //true: đã verify với e-kyc
  gender: Gender;
  address: string; //
  phone: string;
  notificationBadgeCount: number; //Sl thông báo
  password: string;
  isBlocked: boolean;
  facebookId: string;
  googleId: string;
  appleId: string;
  zaloId: string;
  source: ECustomerResource;
  resetCode: string;
  notifications: Notification[];
  viewedNotifications: Notification[]; //notifications da xem
  likedNews: News[];
  assignedNotifications: Notification[];
  customerTransactions: CustomerTransaction[];
  deposits: Deposit[];
  city: City;
  district: District;
  ward: Ward;
  stockUpRate: number;
  lastOrderAt: number;
  // oneSignals: OneSignal[]
  customerRank: CustomerRank;
  // deliveryAddresses: DeliveryAddress[]
  // likedProducts: LikedProduct[]
  // viewedProducts: ViewedProduct[]
  customerCoupons: CustomerCoupon[];
  groupCustomers: GroupCustomer[] 
}

export interface CustomerType {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  name: string;
  type: ECustomerType;
  customers: Customer[];
}

export interface RefCustomer {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  deletedAt: number;
  totalPoint: number;
  isConfirmed: boolean;
  // type: RefCustomerType
  // refPointType: ProductRefPointType
  productRefPoint: number;
  productRefQuantity: number;
  productTotalPoint: number;
  productPrice: number;
  oldBalance: number;
  newBalance: number;
  customer: Customer;
  order: Order;
  registerCustomer: Customer;
  product: Product;
  productCategory: ProductCategory;
}

export enum ECustomerType {
  New = "NEW",
  Regular = "REGULAR",
  Risk = "RISK",
}

export const ECustomerTypeTrans = {
  [ECustomerType.New]: {
    value: ECustomerType.New,
    title: "Khách hàng mới",
    color: "lime",
  },
  [ECustomerType.Regular]: {
    value: ECustomerType.Regular,
    title: "Khách thường xuyên mua",
    color: "cyan",
  },
  [ECustomerType.Risk]: {
    value: ECustomerType.Risk,
    title: "Khách hàng lâu chưa mua",
    color: "geekblue",
  },
};

export enum ECustomerResource {
  zaloDiscovery = "zalo-discovery",
  zalo = "zalo",
  zaloSearchSuggestions = "zalo-search-suggestions",
  zaloSearch = "zalo-search",
  miniProgramStore = "mini-program-store",
  link = "link",
}

export const ECustomerResourceTrans = {
  [ECustomerResource.zaloDiscovery]: {
    value: ECustomerResource.zaloDiscovery,
    title: "Zalo khám phá",
  },
  [ECustomerResource.zalo]: {
    value: ECustomerResource.zalo,
    title: "Mở từ Zalo (Link, QR)",
  },
  [ECustomerResource.zaloSearchSuggestions]: {
    value: ECustomerResource.zaloSearchSuggestions,
    title: "Zalo đề xuất tìm kiếm",
  },
  [ECustomerResource.zaloSearch]: {
    value: ECustomerResource.zaloSearch,
    title: "Zalo khung tìm kiếm",
  },
  [ECustomerResource.miniProgramStore]: {
    value: ECustomerResource.miniProgramStore,
    title: "Zalo kho mini app",
  },
  [ECustomerResource.link]: {
    value: ECustomerResource.link,
    title: "Link trực tiếp",
  },
};

export interface CustomerRemind {
  id: number;
  fullName: string;
  phone: string;
  lastRemindAt: number;
  dayDiff: number;
  productName: string;
  orderCode: string;
  lifeCycleDay: number;
  isOverDay: number;
  maxDayDiff: number;
  productQuantity: number;
  overDay: number;
}

export enum ELifeCycleDay {
  Week = "1-week",
  TwoWeek = "2-week",
  Month = "1-month",
  SixMonth = "6-month",
  Year = "1-year",
}

export const ELifeCycleDayTrans = {
  [ELifeCycleDay.Week]: {
    label: "1 Tuần",
    value: ELifeCycleDay.Week,
  },
  [ELifeCycleDay.TwoWeek]: {
    label: "2 Tuần",
    value: ELifeCycleDay.TwoWeek,
  },
  [ELifeCycleDay.Month]: {
    label: "1 Tháng",
    value: ELifeCycleDay.Month,
  },
  [ELifeCycleDay.SixMonth]: {
    label: "6 Tháng",
    value: ELifeCycleDay.SixMonth,
  },
  [ELifeCycleDay.Year]: {
    label: "1 Năm",
    value: ELifeCycleDay.Year,
  },
};

export interface GroupCustomer {
id: number
createdAt: number
updatedAt: number
isDeleted: boolean
deletedAt: number
name: string
description: string
customers: Customer[]
notifications: Notification[]
store: Store
}
