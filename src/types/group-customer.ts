import { Store } from "antd/lib/form/interface";
import { Customer } from "./customer";

export interface GroupCustomer {
  id: number;
  name: string;
  customers: Customer[];
  description: string;
  store: Store;
  createdAt: number;
  updatedAt: number;
  deletedAt: number;
}
