export enum EPermissions {
  // BASIC
  Profile = "/profile",
  Order = "/order",
  ProductRating = "/productRating",
  Customer = "/customer",
  Banner = "/banner",
  News = "/news",
  Staff = "/staff",
  Role = "/role",
  Product = "/product",
  Point = "/point",
  ShipFee = "/ship-fee",
  Notification = "/notification",
  Popup = "/popup",
  Configuration = "/configuration",

  // ADVANCED 1
  Flashsale = "/flash-sale",
  Coupon = "/coupon",
  Promotion = "/promotion",
  Otp = "/otp",
  Conversations = "/conversations",
  LoginSocial = "/loginSocial",
  Media = "/media",
  CustomerRank = "/customerRank",
  OnlinePayment = "/onlinePayment",
  NotificationStore = "/notificationStore",
  RefRegister = "/refRegister",
  CustomerGroup = "/customerGroup",

  // ADVANCED 2
  Depot = "/depot",
  StoreProfile = "/storeProfile",
  Dashboard = "/dashboard",
  RefOrder = "/refOrder",
}

export const PermissionTrans = [
  {
    pathname: EPermissions.Profile,
    children: ["profile"],
  },
  {
    pathname: EPermissions.Order,
    children: ["order"],
  },
  {
    pathname: EPermissions.ProductRating,
    children: ["product-rating"],
  },
  {
    pathname: EPermissions.Customer,
    children: ["customer-list"],
  },
  {
    pathname: EPermissions.Banner,
    children: ["banner"],
  },
  {
    pathname: EPermissions.News,
    children: ["news"],
  },
  {
    pathname: EPermissions.Staff,
    children: ["staff"],
  },
  {
    pathname: EPermissions.Role,
    children: ["role", "decentralization"],
  },
  {
    pathname: EPermissions.Product,
    children: ["list", "category", "customFields"],
  },
  {
    pathname: EPermissions.Point,
    children: ["general"],
  },
  {
    pathname: EPermissions.ShipFee,
    children: ["ship-fee"],
  },
  {
    pathname: EPermissions.Notification,
    children: ["notification"],
  },
  {
    pathname: EPermissions.Popup,
    children: ["popup"],
  },
  {
    pathname: EPermissions.Configuration,
    children: [
      "transport",
      "tax",
      "product-tag",
      "news-tag",
      "quick-message",
      "message-template",
      "page",
      "order-custom-field",
    ],
  },
  {
    pathname: EPermissions.Flashsale,
    children: ["flash-sale"],
  },
  {
    pathname: EPermissions.Coupon,
    children: ["coupon", "discountOrder", "discountProduct", "customerCoupon"],
  },
  {
    pathname: EPermissions.Promotion,
    children: [
      "promotion",
      "promotion-create",
      "promotion-free-ship",
      "promotion-fixed",
      "promotion-percent",
      "promotion-gift",
      "promotion-coupon",
    ],
  },
  {
    pathname: EPermissions.Otp,
    children: ["otp"],
  },
  {
    pathname: EPermissions.Conversations,
    children: ["conversations"],
  },
  {
    pathname: EPermissions.LoginSocial,
    children: ["login-social"],
  },
  {
    pathname: EPermissions.Media,
    children: ["media"],
  },
  {
    pathname: EPermissions.CustomerRank,
    children: ["customer-rank"],
  },
  {
    pathname: EPermissions.OnlinePayment,
    children: ["online-payment"],
  },
  {
    pathname: EPermissions.NotificationStore,
    children: ["notification-store"],
  },
  {
    pathname: EPermissions.RefRegister,
    children: ["ref-register"],
  },
  {
    pathname: EPermissions.CustomerGroup,
    children: [
      "customer-group-filter",
      "customer-group-list",
      "customer-group-notification",
    ],
  },
  {
    pathname: EPermissions.Depot,
    children: [
      "inventory-dashboard",
      "inventory-import",
      "inventory-export",
      "inventory-check",
    ],
  },
  {
    pathname: EPermissions.StoreProfile,
    children: ["store-profile"],
  },
  {
    pathname: EPermissions.Dashboard,
    children: ["product-customer"],
  },
  {
    pathname: EPermissions.RefOrder,
    children: ["ref-order"],
  },
];

export interface Role {
  id: number;
  isAdmin: boolean;
  name: string;
  permissions: Permission[];
}

export interface Permission {
  id?: number;
  name: string;
  key?: number;
  featureIds?: number[];
  children?: Permission[];
  path: string;
  title: string;
}
