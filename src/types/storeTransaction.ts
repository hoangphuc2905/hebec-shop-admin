import { Employee } from "./employee";
import { Order } from "./order";
import { Store } from "./store";
import { TransportServiceType } from "./transport";

export interface StoreTransaction {
  id: number;
  createdAt: number;
  completedAt: number;
  updatedAt: number;
  isDeleted: boolean;
  deletedAt: number;
  code: string;
  totalCOD: number;
  totalShipFee: number;
  type: StoreTransactionType;
  beforeChange: number;
  afterChange: number;
  change: number;
  status: StoreTransactionStatus;
  pointWallet: TransportServiceType;
  order: Order;
  store: Store;
  employee: Employee;
}

export enum StoreTransactionType {
  Transport = "TRANSPORT",
  Draw = "DRAW",
}

export enum StoreTransactionStatus {
  Pending = "PENDING",
  Confirmed = "CONFIRMED",
  Complete = "COMPLETE",
}

export const StoreTransactionStatusTrans = {
  [StoreTransactionStatus.Pending]: {
    label: "Chờ duyệt",
    value: StoreTransactionStatus.Pending,
    color: "green",
  },
  [StoreTransactionStatus.Confirmed]: {
    label: "Đã xác nhận",
    value: StoreTransactionStatus.Confirmed,
    color: "cyan",
  },
  [StoreTransactionStatus.Complete]: {
    label: "Hoàn thành",
    value: StoreTransactionStatus.Complete,
    color: "blue",
  },
};
