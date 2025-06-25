import {
  AccountBookOutlined,
  AlertOutlined,
  AreaChartOutlined,
  BellOutlined,
  FormOutlined,
  MenuOutlined,
  MessageOutlined,
  NotificationOutlined,
  PictureOutlined,
  ProfileOutlined,
  ReadOutlined,
  RiseOutlined,
  SettingOutlined,
  ShopOutlined,
  SolutionOutlined,
  SoundOutlined,
  TeamOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { lazyImport } from "utils/import";
import React, { Suspense, lazy } from "react";
import { RouteObject } from "react-router-dom";
import { NotFoundPage } from "views/404/NotFoundPage";
import WithdrawPage from "views/WithdrawPage/WithdrawPage";
import { AdminLayout } from "layouts/AdminLayout";
import CreateOrderPage from "views/CreateOrder/CreateOrderPage";
import { ReferralBuyProductPage } from "views/ReferralBuyProduct/ReferralBuyProductPage";
import { ReferralRegisterPage } from "views/ReferralBuyProduct/ReferralRegisterPage";
import LoginPage from "views/Login/LoginPage";
import { ExpiredPage } from "views/Expired/ExpiredPage";

const DashboardPage = lazyImport(
  import("views/Dashboard/DashboardPage"),
  "DashboardPage"
);
const AccountPage = lazyImport(
  import("views/AccountPage/AccountPage"),
  "AccountPage"
);
const BannerPageDND = lazyImport(
  import("views/Banner/BannerPageDND"),
  "BannerPageDND"
);
const ConfigurationPage = lazyImport(
  import("views/Configuration/ConfigurationPage"),
  "ConfigurationPage"
);
const ContentDefinePage = lazyImport(
  import("views/ContentDefine/ContentDefinePage"),
  "ContentDefinePage"
);
const CouponCampaignPage = lazyImport(
  import("views/CouponCampaign/CouponCampaignPage"),
  "CouponCampaignPage"
);
const CouponPromotionPage = lazyImport(
  import("views/CouponPromotion/CouponPromotion")
);
const CustomerPage = lazyImport(
  import("views/Customer/CustomerPage"),
  "CustomerPage"
);
const CustomerCouponPage = lazyImport(
  import("views/CustomerCoupon/CustomerCouponPage"),
  "CustomerCouponPage"
);
const CustomerFilterPage = lazyImport(
  import("views/CustomerFilter/CustomerFilterPage"),
  "CustomerFilterPage"
);
const CustomerRankPage = lazyImport(
  import("views/CustomerRank/CustomerRankPage"),
  "CustomerRankPage"
);

const CouponDashboardPage = lazyImport(
  import("views/Dashboard/menus/Coupon"),
  "CouponDashboardPage"
);
const DiscountOrderDashboardPage = lazyImport(
  import("views/Dashboard/menus/DiscountOrder"),
  "DiscountOrderDashboardPage"
);
const DiscountProductDashboardPage = lazyImport(
  import("views/Dashboard/menus/DiscountProduct"),
  "DiscountProductDashboardPage"
);
const FlashSaleDashboardPage = lazyImport(
  import("views/Dashboard/menus/Flashsale"),
  "FlashSaleDashboardPage"
);
const DecentralizationPage = lazyImport(
  import("views/Decentralization/DecentralizationPage"),
  "DecentralizationPage"
);
const FixedPromotionPage = lazyImport(
  import("views/FixedPromotion/FixedPromotion")
);
const FlashSaleCampaignPage = lazyImport(
  import("views/FlashSaleCampaign/FlashSaleCampaignPage"),
  "FlashSaleCampaignPage"
);
const FreeShipPromotionPage = lazyImport(
  import("views/FreeShipPromotion/FreeShipPromotionPage")
);
const GiftPromotionPage = lazyImport(
  import("views/GiftPromotion/GiftPromotion")
);
const GroupCustomerPage = lazyImport(
  import("views/GroupCustomer/GroupCustomerPage"),
  "GroupCustomerPage"
);
const HomePopupPage = lazyImport(
  import("views/HomePopup/HomePopupPage"),
  "HomePopupPage"
);
const MediaPage = lazyImport(import("views/MediaPage/MediaPage"), "MediaPage");
const NewsPage = lazyImport(import("views/News/NewsPage"), "NewsPage");
const NotificationPage = lazyImport(
  import("views/Notification copy/NotificationPage"),
  "NotificationPage"
);
const NotificationGroupCustomer = lazyImport(
  import("views/NotificationGroupCustomer/NotificationGroupCustomer"),
  "NotificationGroupCustomer"
);
const NotificationStorePage = lazyImport(
  import("views/NotificationStore/NotificationStorePage"),
  "NotificationStorePage"
);
const OnlinePaymentPage = lazyImport(
  import("views/OnlinePayment/OnlinePaymentPage"),
  "OnlinePaymentPage"
);
const OrderPage = lazyImport(import("views/Order/OrderPage"), "OrderPage");
const OrderCustomFieldPage = lazyImport(
  import("views/OrderCustomField/OrderCustomFieldPage"),
  "OrderCustomFieldPage"
);
const PercentPromotionPage = lazyImport(
  import("views/PercentPromotion/PercentPromotion")
);
const ProductPage = lazyImport(
  import("views/Product/ProductPage"),
  "ProductPage"
);
const ProductCategoryPage = lazyImport(
  import("views/ProductCategoryPage/ProductCategoryPage"),
  "ProductCategoryPage"
);
const ProductRatePage = lazyImport(
  import("views/ProductRate/ProductRatePage"),
  "ProductRatePage"
);
const PromotionCampaignPage = lazyImport(
  import("views/PromotionCampaign/PromotionCampaignPage"),
  "PromotionCampaignPage"
);
const CreatePromotionPage = lazyImport(
  import("views/PromotionCampaign/views/CreatePromotion/CreatePromotionPage")
);
const QuickMessagePage = lazyImport(
  import("views/QuickMessage/QuickMessagePage"),
  "QuickMessagePage"
);
const RefCustomerPage = lazyImport(
  import("views/RefCustomer/RefCustomerPage"),
  "RefCustomerPage"
);

const RolePage = lazyImport(import("views/Role/RolePage"), "RolePage");
const ShipFeePage = lazyImport(
  import("views/ShipFeePage/ShipFeePage"),
  "ShipFeePage"
);
const StaffPage = lazyImport(import("views/Staff/StaffPage"), "StaffPage");
const StoreInfoPage = lazyImport(
  import("views/StoreInfoPage/StoreInfoPage"),
  "StoreInfoPage"
);
const ProductTaxPage = lazyImport(
  import("views/TaxConfig/ProductTax"),
  "ProductTaxPage"
);
const TransportPage = lazyImport(
  import("views/Transport/TransportPage"),
  "TransportPage"
);
const MessageTemplatePage = lazyImport(
  import("views/TemplateMessage/MessageTemplatePage"),
  "MessageTemplatePage"
);

const StoreTransactionPage = lazyImport(
  import("views/StoreTransaction/StoreTransactionPage"),
  "StoreTransactionPage"
);

export interface Route extends RouteObject {
  children?: Route[];
  descrription?: Route[];
  title?: string;
  icon?: React.ReactNode;
  breadcrumb?: string;
  isAccess?: boolean;
  checkIsAdmin?: boolean;
  hidden?: boolean;
  featureRoles?: string[];
  name?: string;
  permissions?: EPermissions[];
}

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
  ZaloZNS = "/zaloZNS",

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

export enum RoleNames {
  DashboardOverview = "/dashboard/product-customer",
  DashboardFlashsale = "/dashboard/flash-sale",
  DashboardDiscountProduct = "/dashboard/discountProduct",
  DashboardDiscountOrder = "/dashboard/discountOrder",
  DashboardCoupon = "/dashboard/coupon",
  Order = "/order",
  ProductList = "/product/list",
  ProductCategory = "/product/category",
  ProductRate = "/product/product-rating",
  CampaignFlashsale = "/campaign/flash-sale",
  CampaignCoupon = "/campaign/coupon",
  CampaignPromotion = "/campaign/promotion",
  CampaignCustomerCoupon = "/campaign/customerCoupon",
  CampaignPromotionFreeship = "/campaign/free-ship",
  CampaignPromotionFixed = "/campaign/promotion-fixed",
  CampaignPromotionPercent = "/campaign/promotion-percent",
  CampaignPromotionGift = "/campaign/promotion-gift",
  CampaignPromotionCoupon = "/campaign/promotion-coupon",
  CustomerList = "/customer/customer-list",
  CustomerRank = "/customer/customer-rank",
  CustomerRefRegister = "/customer/ref-register",
  CustomerGroupFilter = "/customer/customer-group-filter",
  CustomerGroupList = "/customer/customer-group-list",
  CustomerGroupNotification = "/customer/customer-group-notification",
  NewsNotification = "/news/notification",
  NewsPost = "/news/news",
  NewsBanner = "/news/banner",
  NewsPopup = "/news/popup",
  NewsMedia = "/news/media",
  ConfigGeneral = "/configuration/general",
  ConfigOnlinePayment = "/configuration/online-payment",
  ConfigTax = "/configuration/tax",
  ConfigTransport = "/configuration/transport",
  ConfigShipfee = "/configuration/ship-fee",
  ConfigQuickMessage = "/configuration/quick-message",
  ConfigPage = "/configuration/page",
  ConfigOrderCustomField = "/configuration/order-custom-field",
  StaffList = "/staff/staff",
  StaffRole = "/staff/role",
  StaffDecentralization = "/staff/decentralization",
  StaffProfile = "/staff/profile",
  StaffStore = "/staff/store-profile",
  CustomerMinusPoint = "/customer/customer-point",
  NewsNotificationStore = "/news/notification-store",
  ConfigMessageTemplate = "/configuration/message-template",
}

export const adminRoutes: Route[] = [
  {
    title: "Dashboard",
    icon: <AreaChartOutlined />,
    path: "/dashboard",
    name: "/dashboard",
    breadcrumb: "Dashboard",
    // permissions: [EPermissions.Dashboard],
    children: [
      {
        title: "Tổng quan",
        path: "product-customer",
        name: "product-customer",
        breadcrumb: "Tổng quan",
        element: <DashboardPage title="Tổng quan" />,
      },
      {
        title: "FlashSale",
        path: "flash-sale",
        name: "flash-sale",
        breadcrumb: "Flashsale",
        element: <FlashSaleDashboardPage title="FlashSale" />,
        permissions: [EPermissions.Flashsale],
      },
      {
        title: "Giảm giá sản phẩm",
        path: "discountProduct",
        name: "discountProduct",
        breadcrumb: "Giảm giá sản phẩm",
        element: <DiscountProductDashboardPage title="Giảm giá sản phẩm" />,
        permissions: [EPermissions.Promotion],
      },
      {
        title: "Giảm giá đơn hàng",
        path: "discountOrder",
        name: "discountOrder",
        breadcrumb: "Giảm giá đơn hàng",
        element: <DiscountOrderDashboardPage title="Giảm giá đơn hàng" />,
        permissions: [EPermissions.Promotion],
      },
      {
        title: "Coupon",
        path: "coupon",
        name: "coupon",
        breadcrumb: "Coupon",
        element: <CouponDashboardPage title="Coupon" />,
        permissions: [EPermissions.Coupon],
      },
    ],
  },
  {
    title: "Đơn hàng",
    icon: <FormOutlined />,
    path: "/order",
    name: "/order",
    breadcrumb: "Đơn hàng",
    permissions: [EPermissions.Order],
    element: <OrderPage title="Đơn hàng" />,
  },
  // {
  //   title: "Nhắn tin",
  //   icon: <PictureOutlined />,
  //   path: "/conversations",
  //   name: "/conversations",
  //   breadcrumb: "Conversations",
  //   element: <ConversationPage title="Nhắn tin" />,
  // },
  {
    title: "Sản phẩm",
    icon: <AccountBookOutlined />,
    path: "/product",
    name: "/product",
    breadcrumb: "Sản phẩm",
    // permissions: [EPermissions.Product],
    children: [
      {
        title: "Sản phẩm",
        path: "list",
        name: "list",
        breadcrumb: "Danh sách sản phẩm",
        element: <ProductPage title="Sản phẩm" />,
        permissions: [EPermissions.Product],
      },
      {
        title: "Danh mục sản phẩm",
        path: "category",
        name: "category",
        breadcrumb: "Danh mục sản phẩm",
        element: <ProductCategoryPage title="Danh mục sản phẩm" />,
        permissions: [EPermissions.Product],
      },
      // {
      //   title: "Thuộc tính sản phẩm",
      //   path: "customFields",
      //   name: "customFields",
      //   breadcrumb: "Thuộc tính sản phẩm",
      //   element: <CustomFieldPage title="Thuộc tính sản phẩm" />,
      // },
      {
        title: "Đánh giá sản phẩm",
        path: "product-rating",
        name: "product-rating",
        breadcrumb: "Đánh giá sản phẩm",
        element: <ProductRatePage title="Đánh giá sản phẩm" />,
        permissions: [EPermissions.ProductRating],
      },
    ],
  },
  {
    title: "Chiến dịch",
    icon: <NotificationOutlined />,
    path: "/campaign",
    name: "/campaign",
    breadcrumb: "Chiến dịch",

    children: [
      {
        title: "Flash Sale",
        path: "flash-sale",
        name: "flash-sale",
        breadcrumb: "Flash Sale",
        permissions: [EPermissions.Flashsale],
        element: <FlashSaleCampaignPage title="Chiến dịch Flash Sale" />,
      },
      {
        title: "Coupon",
        path: "coupon",
        name: "coupon",
        breadcrumb: "Coupon",
        permissions: [EPermissions.Coupon],
        element: <CouponCampaignPage title="Chiến dịch Coupon" />,
      },
      {
        title: "Promotion",
        path: "promotion",
        name: "promotion",
        breadcrumb: "Promotion",
        featureRoles: [
          "promotion-percent",
          "promotion-fixed",
          "promotion-coupon",
          "promotion-gift",
        ],
        permissions: [EPermissions.Promotion],
        element: <PromotionCampaignPage title="Chiến dịch Promotion" />,
      },
      {
        title: "Mã coupon",
        path: "customerCoupon",
        name: "customerCoupon",
        breadcrumb: "Mã coupon",
        permissions: [EPermissions.Coupon],
        element: <CustomerCouponPage title="Mã coupon" />,
      },

      {
        title: "Miễn phí vận chuyển",
        hidden: true,
        path: "promotion-free-ship",
        name: "promotion-free-ship",
        permissions: [EPermissions.Promotion],

        element: <FreeShipPromotionPage title="Miễn phí vận chuyển" />,
      },
      {
        title: "Giảm theo định mức",
        hidden: true,
        path: "promotion-fixed",
        name: "promotion-fixed",
        permissions: [EPermissions.Promotion],
        element: <FixedPromotionPage title="Giảm theo định mức" />,
      },
      {
        title: "Giảm theo phần trăm",
        hidden: true,
        path: "promotion-percent",
        name: "promotion-percent",
        permissions: [EPermissions.Promotion],
        element: <PercentPromotionPage title="Giảm theo phần trăm" />,
      },
      {
        title: "Quà tặng kèm",
        hidden: true,
        path: "promotion-gift",
        name: "promotion-gift",
        permissions: [EPermissions.Promotion],
        element: <GiftPromotionPage title="Quà tặng kèm" />,
      },
      {
        title: "Tặng coupon",
        hidden: true,
        path: "promotion-coupon",
        name: "promotion-coupon",
        permissions: [EPermissions.Promotion],
        element: <CouponPromotionPage title="Tặng coupon" />,
      },
    ],
  },
  {
    title: "Khách hàng",
    icon: <UserSwitchOutlined />,
    path: "/customer",
    name: "/customer",
    breadcrumb: "Khách hàng",
    // permissions: [EPermissions.Customer],

    children: [
      {
        title: "DS khách hàng",
        path: "customer-list",
        name: "customer-list",
        breadcrumb: "Danh sách khách hàng",
        element: <CustomerPage title="Khách hàng" />,
        permissions: [EPermissions.Customer],
      },
      {
        title: "Thứ hạng thành viên",
        path: "customer-rank",
        name: "customer-rank",
        breadcrumb: "Thứ hạng thành viên",
        element: <CustomerRankPage title="Thứ hạng thành viên" />,
        permissions: [EPermissions.CustomerRank],
      },
      {
        title: "DS giới thiệu",
        path: "ref-register",
        name: "ref-register",
        breadcrumb: "Danh sách Người giới thiệu",
        element: <RefCustomerPage title="Danh sách người giới thiệu" />,
        permissions: [EPermissions.RefRegister],
      },
      {
        title: "Rút điểm khách hàng",
        path: "customer-point",
        name: "customer-point",
        breadcrumb: "Rút điểm khách hàng",
        element: <WithdrawPage title="Rút điểm khách hàng" />,
        permissions: [EPermissions.Point],
      },
      {
        title: "Bộ lọc khách hàng",
        path: "customer-group-filter",
        name: "customer-group-filter",
        breadcrumb: "Bộ lọc khách hàng",
        element: <CustomerFilterPage title="Bộ lọc khách hàng" />,
        permissions: [EPermissions.CustomerGroup],
      },
      {
        title: "DS nhóm KH",
        path: "customer-group-list",
        name: "customer-group-list",
        breadcrumb: "Danh sách nhóm khách hàng",
        element: <GroupCustomerPage title="Nhóm khách hàng" />,
        permissions: [EPermissions.CustomerGroup],
      },
      {
        title: "Thông báo nhóm KH",
        path: "customer-group-notification",
        name: "customer-group-notification",
        breadcrumb: "Thông báo nhóm khách hàng",
        element: (
          <NotificationGroupCustomer title="Thông báo nhóm khách hàng" />
        ),
        permissions: [EPermissions.CustomerGroup, EPermissions.Notification],
      },
    ],
  },

  {
    title: "Truyền thông",
    icon: <SoundOutlined />,
    path: "/news",
    name: "/news",
    breadcrumb: "Truyền thông",

    children: [
      {
        title: "Thông báo",
        path: "notification",
        name: "notification",
        breadcrumb: "notification",
        element: <NotificationPage title="Thông báo" />,
        permissions: [EPermissions.Notification],
      },
      {
        title: "Tin tức/Bài viết",
        path: "news",
        name: "news",
        breadcrumb: "notification",
        element: <NewsPage title="Tin tức/Bài viết" />,
        permissions: [EPermissions.News],
      },
      {
        title: "Banner",
        path: "banner",
        name: "banner",
        breadcrumb: "Banner",
        element: <BannerPageDND title="Banner" />,
        permissions: [EPermissions.Banner],
      },
      {
        title: "Popup",
        path: "popup",
        name: "popup",
        breadcrumb: "Popup",
        element: <HomePopupPage title="Popup" />,
        permissions: [EPermissions.Popup],
      },
      {
        title: "Thông báo cửa hàng",
        path: "notification-store",
        name: "notification-store",
        breadcrumb: "Thông báo cửa hàng",
        element: <NotificationStorePage title="Thông báo cửa hàng" />,
        permissions: [EPermissions.NotificationStore],
      },
      {
        title: "Kho media",
        path: "media",
        name: "media",
        breadcrumb: "media",
        element: <MediaPage title="Kho media" />,
        permissions: [EPermissions.Media],
      },
    ],
  },
  // {
  //   title: "Kho",
  //   icon: <ShopOutlined />,
  //   path: "/depot",
  //   name: "/depot",
  //   breadcrumb: "Kho",
  //   children: [
  //     {
  //       title: "Tổng quan",
  //       path: "inventory-dashboard",
  //       name: "inventory-dashboard",
  //       breadcrumb: "Tổng quan",
  //       element: <InventoryDashboardPage title="Tổng quan" />,
  //     },
  //     {
  //       title: "Nhập kho",
  //       path: "inventory-import",
  //       name: "inventory-import",
  //       breadcrumb: "Nhập kho",
  //       element: <InventoryImportPage title="Nhập kho" />,
  //     },
  //     {
  //       title: "Xuất kho",
  //       path: "inventory-export",
  //       name: "inventory-export",
  //       breadcrumb: "Xuất kho",
  //       element: <InventoryExportPage title="Xuất kho" />,
  //     },
  //     {
  //       title: "Kiểm kho",
  //       path: "inventory-check",
  //       name: "inventory-check",
  //       breadcrumb: "Kiểm kho",
  //       element: <InventoryCheckPage title="Kiểm kho" />,
  //     },
  //   ],
  // },
  {
    title: "Cấu hình",
    path: "/configuration",
    name: "/configuration",
    breadcrumb: "Cấu hình",
    icon: <SettingOutlined />,
    children: [
      {
        title: "Chung",
        path: "general",
        name: "general",
        breadcrumb: "Cấu hình chung",
        element: <ConfigurationPage title="Cấu hình chung" />,
      },
      {
        title: "Thanh toán online",
        path: "online-payment",
        name: "online-payment",
        breadcrumb: "Thanh toán online",
        element: <OnlinePaymentPage title="Thanh toán online" />,
        permissions: [EPermissions.OnlinePayment],
      },
      {
        title: "Thuế",
        path: "tax",
        name: "tax",
        breadcrumb: "Thuế",
        element: <ProductTaxPage title="Thuế" />,
      },
      {
        title: "Vận chuyển",
        path: "transport",
        name: "transport",
        breadcrumb: "Vận chuyển",
        element: <TransportPage title="Vận chuyển" />,
      },
      // {
      //   title: "Từ khóa sản phẩm",
      //   path: "product-tag",
      //   name: "product-tag",
      //   breadcrumb: "Từ khóa sản phẩm",
      //   element: <ProductTagPage title="Từ khóa sản phẩm" />,
      // },
      // {
      //   title: "Từ khóa tin tức",
      //   path: "news-tag",
      //   name: "news-tag",
      //   breadcrumb: "Từ khóa tin tức",
      //   element: <NewsTagPage title="Từ khóa tin tức" />,
      // },
      {
        title: "Phí Ship",
        path: "ship-fee",
        name: "ship-fee",
        breadcrumb: "Phí Ship",
        element: <ShipFeePage title="Cấu hình phí Ship" />,
      },
      {
        title: "Tin nhắn mẫu",
        path: "message-template",
        name: "message-template",
        breadcrumb: "Tin nhắn mẫu",
        element: <MessageTemplatePage title="Tin nhắn mẫu" />,
        // permissions: [EPermissions.ZaloZNS],
      },
      // {
      //   title: "Tin nhắn nhanh",
      //   path: "quick-message",
      //   name: "quick-message",
      //   breadcrumb: "Tin nhắn nhanh",
      //   element: <QuickMessagePage title="Cấu hình tin nhắn nhanh" />,
      // },
      {
        title: "Trang",
        path: "page",
        name: "page",
        breadcrumb: "Trang",
        element: <ContentDefinePage title="Trang" />,
      },
      {
        title: "Thuộc tính đơn hàng",
        path: "order-custom-field",
        name: "order-custom-field",
        breadcrumb: "Thuộc tính đơn hàng",
        element: <OrderCustomFieldPage title="Thuộc tính đơn hàng" />,
      },
    ],
  },
  {
    title: "Quản lý cửa hàng",
    icon: <ShopOutlined />,
    path: "/staff",
    name: "/staff",
    breadcrumb: "Quản lý cửa hàng",
    children: [
      {
        title: "Nhân viên",
        element: <StaffPage title="Nhân viên" />,
        path: "staff",
        name: "staff",
        breadcrumb: "Nhân viên",
        permissions: [EPermissions.Staff],
      },
      {
        title: "Danh sách quyền",
        breadcrumb: "Danh sách quyền",
        path: "role",
        name: "role",
        checkIsAdmin: true,
        element: <RolePage title="Danh sách quyền" />,
        permissions: [EPermissions.Role],
      },
      {
        title: "Phân quyền",
        path: "decentralization",
        name: "decentralization",
        breadcrumb: "Phân quyền",
        element: <DecentralizationPage title="Phân quyền" />,
        permissions: [EPermissions.Role],
      },
      {
        title: "Rút tiền COD",
        path: "storeTransaction",
        name: "storeTransaction",
        breadcrumb: "Rút tiền COD",
        element: <StoreTransactionPage title="Rút tiền COD" />,
        permissions: [EPermissions.Role],
      },
      {
        title: "Thông tin cá nhân",
        path: "profile",
        name: "profile",
        element: <AccountPage title="Thông tin cá nhân" />,
        // permissions: [EPermissions.Profile],
      },
      {
        title: "Thông tin cửa hàng",
        path: "store-profile",
        name: "store-profile",
        element: <StoreInfoPage title="Thông tin cửa hàng" />,
        // permissions: [EPermissions.StoreProfile],
      },
    ],
  },

  // {
  //   title: "Giới hạn một số chức năng",
  //   icon: <UserOutlined />,
  //   path: "/role-page",
  //   hidden: true,
  //   element: <></>,
  //   children: [
  //     {
  //       title: "Chỉnh sửa ghi chú đơn hàng",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-update-order-note",
  //     },
  //     {
  //       title: "Quyền chuyển trạng thái ĐH sang DXNTT",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-page-permission-DXNTT",
  //     },
  //     {
  //       title: "Quyền chuyển trạng thái ĐH sang DXL",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-page-permission-DXL",
  //     },
  //     {
  //       title: "Quyền chuyển trạng thái ĐH sang DVC",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-page-permission-DVC",
  //     },
  //     {
  //       title: "Quyền chuyển trạng thái ĐH sang Hoàn thành",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-page-permission-HT",
  //     },
  //     {
  //       title: "Quyền chuyển trạng thái ĐH sang Hủy",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-page-permission-Cancel",
  //     },
  //     // {
  //     //   title: "Quyền tạo thông báo",
  //     //   icon: <FormOutlined />,
  //     //   hidden: true,
  //     //   path: "role-create-notification",
  //     // },
  //     {
  //       title: "Quyền tạo danh mục/ngành hàng",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-create-product-category",
  //     },
  //     {
  //       title: "Quyền chỉnh sửa danh mục/ngành hàng",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-update-product-category",
  //     },
  //     {
  //       title: "Quyền xóa danh mục/ngành hàng",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-delete-product-category",
  //     },
  //     {
  //       title: "Quyền xem thông tin sản phẩm",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-detail-product",
  //     },
  //     {
  //       title: "Quyền thêm sản phẩm",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-create-product",
  //     },
  //     {
  //       title: "Quyền sửa sản phẩm",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-update-product",
  //     },
  //     {
  //       title: "Quyền xóa sản phẩm",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-delete-product",
  //     },
  //     {
  //       title: "Quyền export danh sách sản phẩm",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-export-product",
  //     },
  //     {
  //       title: "Quyền import sản phẩm",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-import-product",
  //     },
  //     {
  //       title: "Quyền ẩn/hiện sản phẩm",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-show-hide-product",
  //     },
  //     {
  //       title: "Quyền thay đổi trạng thái Hình thức thanh toán",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-show-hide-payment-type",
  //     },
  //     {
  //       title: "Quyền thêm đơn vị thanh toán",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-add-online-payment",
  //     },
  //     {
  //       title: "Quyền xóa đơn vị thanh toán",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-delete-online-payment",
  //     },
  //     {
  //       title: "Quyền thêm admin",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-create-admin",
  //     },
  //     {
  //       title: "Quyền sửa admin",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-update-admin",
  //     },
  //     {
  //       title: "Quyền xóa admin",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-delete-admin",
  //     },
  //     {
  //       title: "Quyền chặn/bỏ chặn admin",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-block-admin",
  //     },
  //     {
  //       title: "Quyền khôi phục mật khẩu admin",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-reset-pass-admin",
  //     },

  //     // Customer
  //     {
  //       title: "Quyền xóa khách hàng",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-create-customer",
  //     },
  //     {
  //       title: "Quyền xóa khách hàng",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-delete-customer",
  //     },
  //     {
  //       title: "Quyền sửa khách hàng",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-update-customer",
  //     },
  //     {
  //       title: "Quyền ẩn/hiện khách hàng",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-show-hide-customer",
  //     },

  //     // Customer Rank
  //     {
  //       title: "Quyền xóa thứ hạng thành viên",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-create-customer-rank",
  //     },
  //     {
  //       title: "Quyền xóa thứ hạng thành viên",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-delete-customer-rank",
  //     },
  //     {
  //       title: "Quyền sửa thứ hạng thành viên",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-update-customer-rank",
  //     },
  //     {
  //       title: "Quyền ẩn/hiện thứ hạng thành viên",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-show-hide-customer-rank",
  //     },

  //     // Store
  //     {
  //       title: "Quyền xóa cửa hàng",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-create-store",
  //     },
  //     {
  //       title: "Quyền xóa cửa hàng",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-delete-store",
  //     },
  //     {
  //       title: "Quyền sửa cửa hàng",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-update-store",
  //     },
  //     {
  //       title: "Quyền ẩn/hiện cửa hàng",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-show-hide-store",
  //     },

  //     // Area
  //     {
  //       title: "Quyền xóa khu vực",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-create-area",
  //     },
  //     {
  //       title: "Quyền xóa khu vực",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-delete-area",
  //     },
  //     {
  //       title: "Quyền sửa khu vực",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-update-area",
  //     },
  //     {
  //       title: "Quyền ẩn/hiện khu vực",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-show-hide-area",
  //     },

  //     // cooking-recipe
  //     {
  //       title: "Quyền xóa công thức món ăn",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-create-cooking-recipe",
  //     },
  //     {
  //       title: "Quyền xóa công thức món ăn",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-delete-cooking-recipe",
  //     },
  //     {
  //       title: "Quyền sửa công thức món ăn",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-update-cooking-recipe",
  //     },
  //     {
  //       title: "Quyền ẩn/hiện công thức món ăn",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-show-hide-cooking-recipe",
  //     },

  //     // news
  //     {
  //       title: "Quyền xóa công thức món ăn",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-create-news",
  //     },
  //     {
  //       title: "Quyền xóa công thức món ăn",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-delete-news",
  //     },
  //     {
  //       title: "Quyền sửa công thức món ăn",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-update-news",
  //     },
  //     {
  //       title: "Quyền ẩn/hiện công thức món ăn",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-show-hide-news",
  //     },

  //     {
  //       title: "Quyền tạo banner",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-create-banner",
  //     },
  //     {
  //       title: "Quyền ẩn/hiện banner",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-show-hide-banner",
  //     },
  //     {
  //       title: "Quyền xóa banner",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-delete-banner",
  //     },
  //     {
  //       title: "Quyền cập nhật banner",
  //       icon: <FormOutlined />,
  //       hidden: true,
  //       path: "role-update-banner",
  //     },
  //   ],
  // },
];

const routes: Route[] = [
  {
    element: <AdminLayout />,
    children: adminRoutes,
    path: "/",
  },
  {
    path: "/newOrder",
    element: <CreateOrderPage />,
  },
  {
    path: "/referral-buy-product",
    element: <ReferralBuyProductPage />,
  },
  {
    path: "/referral-register",
    element: <ReferralRegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage title="Đăng nhập" />,
  },
  {
    path: "/expired",
    element: <ExpiredPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

const cloneRoutes = [...routes];

export { routes, cloneRoutes };
