import { Customer } from "./customer";
import { Deposit } from "./deposit";
import { Order } from "./order";
import { Staff } from "./staff";

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

export const CustomerTransactionTypeTrans = {
  [CustomerTransactionType.BuyOrder]: {
    label: "Thanh toán đơn hàng",
    value: CustomerTransactionType.BuyOrder,
    color: "magenta",
  },
  [CustomerTransactionType.Transfer]: {
    label: "Chuyển khoản từ tài khoản c",
    value: CustomerTransactionType.Transfer,
    color: "orange",
  },
  [CustomerTransactionType.RefundOrder]: {
    label: "Hoàn đơn hủy",
    value: CustomerTransactionType.RefundOrder,
    color: "gold",
  },
  [CustomerTransactionType.CompleteOrder]: {
    label: "Hoàn tất đơn hàng",
    value: CustomerTransactionType.CompleteOrder,
    color: "green",
  },
  [CustomerTransactionType.RateOrder]: {
    label: "Đánh giá đơn nhận điểm",
    value: CustomerTransactionType.RateOrder,
    color: "lime",
  },
  [CustomerTransactionType.RefOrder]: {
    label: "Mời bạn bè mua hàng",
    value: CustomerTransactionType.RefOrder,
    color: "blue",
  },
  [CustomerTransactionType.RefRegister]: {
    label: "Mời bạn bè đăng kí",
    value: CustomerTransactionType.RefRegister,
    color: "cyan",
  },
  [CustomerTransactionType.Minus]: {
    label: "Trừ điểm từ Admin",
    value: CustomerTransactionType.Minus,
    color: "red",
  },
};

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
  employeeCreated: Staff;
  expireBlockedAt: number;
  type: CustomerTransactionType;
  customer: Customer;
  registerCustomer: Customer;
  deposit: Deposit;
  order: Order;
  note: string;
}
