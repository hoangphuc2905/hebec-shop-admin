import { Customer } from "./customer";
import { Order } from "./order";

export interface CustomerTransaction {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  deletedAt: number;
  code: string;
  beforeChange: number;
  change: number;
  afterChange: number;
  isCompleted: boolean;
  expireBlockedAt: number;
  type: CustomerTransactionType;
  customer: Customer;
  // deposit: Deposit
  order: Order;
}
export enum CustomerTransactionType {
  BuyOrder = "BUY_ORDER", //thanh toán đơn hàng
  Transfer = "TRANSFER", //chuyển khoản từ tk C
  RefundOrder = "REFUND_ORDER", //Hoàn đơn hủy (Staff thao tác)
  CompleteOrder = "COMPLETE_ORDER", //nhận điểm khi đơn hàng hoàn tất
  RateOrder = "RATE_ORDER", //đánh giá đơn nhận điểm
  RefOrder = "REF_ORDER", //nhận điểm khi mời bạn bè mua hàng
  RefRegister = "REF_REGISTER", //nhận điểm khi mời bạn bè đăng kí
  Minus = "MINUS",
}
export const customerTransactionTrans = {
  [CustomerTransactionType.BuyOrder]: {
    title: "Thanh toán đơn hàng",
    value: CustomerTransactionType.BuyOrder,
  },
  [CustomerTransactionType.Transfer]: {
    title: "Chuyển khoản",
    value: CustomerTransactionType.Transfer,
  },
  [CustomerTransactionType.RateOrder]: {
    title: "Đánh giá đơn hàng",
    value: CustomerTransactionType.RateOrder,
  },
  [CustomerTransactionType.RefOrder]: {
    title: "Mời bạn bè mua hàng",
    value: CustomerTransactionType.RefOrder,
  },
  [CustomerTransactionType.RefRegister]: {
    title: "Mời bạn bè đăng ký",
    value: CustomerTransactionType.RefRegister,
  },
  [CustomerTransactionType.CompleteOrder]: {
    title: "Hoàn thành đơn hàng",
    value: CustomerTransactionType.CompleteOrder,
  },
  [CustomerTransactionType.RefundOrder]: {
    title: "Hoàn đơn",
    value: CustomerTransactionType.RefundOrder,
  },
  [CustomerTransactionType.Minus]: {
    title: "Trừ điểm từ Admin",
    value: CustomerTransactionType.Minus,
  },
};
