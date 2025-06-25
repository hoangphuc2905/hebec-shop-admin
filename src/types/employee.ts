import { Store } from "antd/lib/form/interface";
import { Role } from "./role";
import { ConversationMessage } from "./conversation";

export interface Employee {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  deletedAt: number;
  name: string;
  phone: string;
  username: string;
  password: string;
  isAdmin: boolean; //admin của cửa hàng
  isBlocked: boolean;
  store: Store;
  role: Role;
  seenConversationMessages: ConversationMessage[];
}
