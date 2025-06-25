import { Employee } from "./employee";
import { Order } from "./order";
import { Depot, Product } from "./product";

export enum InventoryType {
  Import = "IMPORT",
  Export = "EXPORT",
  Change = "CHANGE",
}

export enum InventoryStatus {
  Pending = "PENDING",
  Complete = "COMPLETE",
}

export const InventoryTrans = {
  [InventoryStatus.Complete]: {
    value: InventoryStatus.Complete,
    title: "Đã hoàn thành",
  },
  [InventoryStatus.Pending]: {
    value: InventoryStatus.Pending,
    title: "Đang chờ",
  },
};

export interface InventoryCheck {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  deletedAt: number;
  code: string;
  type: InventoryType;
  status: InventoryStatus;
  note: string;
  completedAt: number;
  createdEmployee: Employee;
  completedEmployee: Employee;
  depot: Depot;
  inventoryCheckDetails: InventoryCheckDetail[];
  toDepot: Depot; //kho chuyển tới, dành cho phiếu chuyển kho
  onDelete: "CASCADE";
  order: Order;
  totalMoneyDiff: number;
  totalReal: number;
  totalStock: number;
}

export interface InventoryCheckDetail {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  deletedAt: number;
  quantity: number;
  stock: number; //sl tồn tại thời điểm phát sinh record
  price: number;
  product: Product;
  onDelete: "CASCADE";
  note: string;
  moneyDiff: number;
}
