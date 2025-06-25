import { Store } from "./store";
import { Transport, TransportServiceType } from "./transport";

export interface PointWallets {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  deletedAt: number;
  type: TransportServiceType;
  totalPoint: number;
  currentPoint: number;
  pendingPoint: number;
  transport: Transport;
  isMain: boolean;
  store: Store;
}
