import { Store } from "./store";
import { Role } from "./role";

export interface Staff {
  id: number;
  createdAt: number;
  updatedAt: number;
  username: string;
  name: string;
  address: string;
  avatar: string;
  phone: string;
  store: Store;
  lat?: number;
  long?: number;
  email: string;
  isBlocked: boolean;
  isDeleted: boolean;
  isReceiveOrder: boolean;
  role: Role;
  isAdmin: boolean;
  notificationBadgeCount: number;
  zaloIdByOA: string;
}
