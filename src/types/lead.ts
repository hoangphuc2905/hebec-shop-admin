import { Customer } from "./customer";
import { Staff } from "./staff";

export interface Lead {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  name: string;
  phone: string;
  email: string;
  status: LeadStatus;
  content: string;
  privateNote: string;
  staff: Staff; //staff nào xử lý lead này
  completedStaff: Staff;
  customer: Customer;
}

export enum LeadStatus {
  processing = "PROCESSING",
  complete = "COMPLETE",
}
