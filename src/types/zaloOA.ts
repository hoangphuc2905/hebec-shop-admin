import { Store } from "./store";

export interface ZaloOA {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  deletedAt: number;
  oaId: string; //OA ID
  oaName: string;
  oaAvatar: string;
  appId: string;
  secretKey: string;
  accessToken: string;
  refreshToken: string;
  expiredAt: number;
  stores: Store[];
}
