import { Store } from "types/store";
import { Customer } from "./customer";
import { Staff } from "./staff";
import { Product } from "./product";

export interface ConversationParticipant {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  staff: Staff;
  customer: Customer;
  conversation: Conversation;
}

export interface ConversationParticipant {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  staff: Staff;
  customer: Customer;
  conversation: Conversation;
}

export interface ConversationMessage {
  id?: number;
  createdAt: number;
  updatedAt?: number;
  isDeleted: boolean;
  type: ConversationMessageType;
  privateId?: string; //uuid v4
  message: string;
  filename?: string;
  fileSize?: number;
  seenStaffs?: Staff[];
  deadlineAt?: number;
  sender?: Customer;
  staffSender?: Staff;
  conversation: Conversation;
  seenCustomers?: Customer[];
  product?: Product;
}

export enum ConversationMessageType {
  Text = "TEXT",
  Image = "IMAGE",
  Product = "PRODUCT",
}

export enum ConversationStatus {
  Open = "OPEN",
  Close = "CLOSE",
}

export interface Conversation {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  status: ConversationStatus;
  roomId: string; //uuid v4
  lastMessage: string;
  lastMessageType: ConversationMessageType;
  owner: Customer;
  target: Customer;
  totalPending?: number;
  unreadCount?: number;
  staff: Staff;
  conversationMessages: ConversationMessage[];
  lastCustomer: Customer;
  lastStaff: Staff;
  store: Store;
  conversationParticipants: ConversationParticipant[];
}
