import { Staff } from "types/staff";
import { Customer } from "./customer";

export enum WithDrawStatus {
  pending = "PENDING",
  reject = "REJECT",
  complete = "COMPLETE",
  cancel = "CANCEL",
}

export const withDrawStatusTrans = {
  [WithDrawStatus.pending]: {
    color: "blue",
    value: WithDrawStatus.pending,
    title: "Chờ xác nhận",
  },
  [WithDrawStatus.reject]: {
    color: "brown",
    value: WithDrawStatus.reject,
    title: "Từ chối",
  },
  [WithDrawStatus.cancel]: {
    color: "red",
    value: WithDrawStatus.cancel,
    title: "Hủy rút tiền",
  },
  [WithDrawStatus.complete]: {
    color: "green",
    value: WithDrawStatus.complete,
    title: "Hoàn thành",
  },
};
export interface Withdraw {
  id: number;
  createdAt: number;
  completedAt: number;
  updatedAt: number;
  isDeleted: boolean;
  code: string;
  amount: number;
  note: string;
  status: WithDrawStatus;
  customer: Customer;
  creator: Staff;
}

export interface Deposit {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  code: string;
  amount: number;
  creator: Partial<Staff>;
}
