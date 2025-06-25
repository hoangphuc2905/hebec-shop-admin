import { Customer } from "./customer";

export interface CustomerRank {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  name: string;
  image: string;
  reachedPoint: number; //số điểm cần đạt đến hạng
  customers: Customer[];
  icon: string;
}
