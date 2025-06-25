import { Employee } from "./employee";
import { Store } from "./store";
import { ZNSTemplate } from "./zns-template";

export enum ETemplateTag {
  Otp = "OTP", // OTP
  InTransaction = "IN_TRANSACTION", // Xác nhận/Cập nhật giao dịch
  PostTransaction = "POST_TRANSACTION", // Hỗ trợ dịch vụ liên quan sau giao dịch
  AccountUpdate = "ACCOUNT_UPDATE", // Cập nhật thông tin tài khoản
  GeneralUpdate = "GENERAL_UPDATE", // Thay đổi thông tin dịch vụ
  FollowUp = "FOLLOW_UP", // Thông báo ưu đãi đến khách hàng cũ
}

export interface MessageTemplate {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  deletedAt: number;
  title: string;
  content: string;
  isHasButton: boolean;
  buttonContent: string;
  description: string;
  isEnableZNS: boolean;
  listParams: string;
  type: EMessageTemplateItemType;
  employee: Employee;
  znsTemplate: ZNSTemplate;
}
// type item
export enum EMessageTemplateItemType {
  OrderPending = "ORDER_PENDING",
  OrderConfirm = "ORDER_CONFIRM",
  OrderProcessing = "ORDER_PROCESSING",
  OrderDelivering = "ORDER_DELIVERING",
  OrderComplete = "ORDER_COMPLETE",
  OrderCancel = "ORDER_CANCEL",
  OrderReturnRefund = "ORDER_RETURN_REFUND",
  RateOrder = "RATE_ORDER",
  ReferralOrder = "REFERRAL_ORDER",
  ReferralRegister = "REGISTER",
  ReceivePointOrder = "RECEIVE_POINT_ORDER",
  CouponBirthday = "COUPON_BIRTHDAY",
  CouponRegister = "COUPON_REGISTER",
  RemindOrder = "REMIND_ORDER",
  InviteAppZaloOA = "INVITE_APP_ZALO_OA",
}

export const MessageTemplateTypeItemTrans = {
  // menu order
  [EMessageTemplateItemType.OrderPending]: {
    label: "Đã đặt hàng",
    color: "#87d067",
    value: EMessageTemplateItemType.OrderPending,
  },
  [EMessageTemplateItemType.OrderConfirm]: {
    label: "Đã xác nhận",
    color: "#fbad16",
    value: EMessageTemplateItemType.OrderConfirm,
  },
  [EMessageTemplateItemType.OrderProcessing]: {
    label: "Đang xử lý",
    color: "#1ed6ce",
    value: EMessageTemplateItemType.OrderProcessing,
  },
  [EMessageTemplateItemType.OrderDelivering]: {
    label: "Đang vận chuyển",
    color: "#fd7321",
    value: EMessageTemplateItemType.OrderDelivering,
  },
  [EMessageTemplateItemType.OrderComplete]: {
    label: "Hoàn tất",
    color: "#19A7CE",
    value: EMessageTemplateItemType.OrderComplete,
  },
  [EMessageTemplateItemType.OrderCancel]: {
    label: "Đã Huỷ",
    color: "red",
    value: EMessageTemplateItemType.OrderCancel,
  },
  [EMessageTemplateItemType.OrderReturnRefund]: {
    label: "Hoàn trả",
    color: "#ed1c24",
    value: EMessageTemplateItemType.OrderReturnRefund,
  },
  [EMessageTemplateItemType.RateOrder]: {
    label: "Đánh giá đơn hàng",
    color: "#FFEB3B",
    value: EMessageTemplateItemType.RateOrder,
  },
  // menu ref
  [EMessageTemplateItemType.ReferralRegister]: {
    label: "Đăng kí",
    color: "#87d067",
    value: EMessageTemplateItemType.ReferralRegister,
  },
  [EMessageTemplateItemType.ReferralOrder]: {
    label: "Mua hàng",
    color: "#fbad16",
    value: EMessageTemplateItemType.ReferralOrder,
  },
  [EMessageTemplateItemType.ReceivePointOrder]: {
    label: "Hoàn thành đơn",
    color: "#1ed6ce",
    value: EMessageTemplateItemType.ReceivePointOrder,
  },

  // menu coupon
  [EMessageTemplateItemType.CouponBirthday]: {
    label: "Coupon sinh nhật",
    color: "#87d067",
    value: EMessageTemplateItemType.CouponBirthday,
  },
  [EMessageTemplateItemType.CouponRegister]: {
    label: "Coupon đăng kí",
    color: "#fbad16",
    value: EMessageTemplateItemType.CouponRegister,
  },
  // menu service
  [EMessageTemplateItemType.RemindOrder]: {
    label: "Nhắc nhở mua hàng",
    color: "#87d067",
    value: EMessageTemplateItemType.RemindOrder,
  },
  [EMessageTemplateItemType.InviteAppZaloOA]: {
    label: "Mời vào zalo OA",
    color: "#fbad16",
    value: EMessageTemplateItemType.InviteAppZaloOA,
  },
};

// type menu
export enum EMessageTemplateType {
  Order = "ORDER",
  CustomerService = "CUSTOMER_SERVICE",
  Ref = "REF",
  Coupon = "COUPON",
}

export const MessageTemplateTypeTrans = {
  [EMessageTemplateType.Order]: {
    label: "Đơn hàng",
    value: EMessageTemplateType.Order,
  },
  [EMessageTemplateType.CustomerService]: {
    label: "Chăm sóc khách hàng",
    value: EMessageTemplateType.CustomerService,
  },
  [EMessageTemplateType.Ref]: {
    label: "Thông báo lịch sử điểm",
    value: EMessageTemplateType.Ref,
  },
  [EMessageTemplateType.Coupon]: {
    label: "Tặng Coupon",
    value: EMessageTemplateType.Coupon,
  },
};
