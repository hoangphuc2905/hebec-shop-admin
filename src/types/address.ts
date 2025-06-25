import { ShipFee } from "./shipFee";

export interface District {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  priority: number;
  parentCode: string;
  code: string;
  pathWithType: string;
  path: string;
  nameWithType: string;
  type: string;
  slug: string;
  name: string;
  otherName: string;
  isBlock: boolean;
  shipFee: number;
  shipFees: ShipFee[];
  deliveryDay: number; //số ngày ước tính giao hàng
}

export interface Ward {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  priority: number;
  parentCode: string;
  code: string;
  pathWithType: string;
  path: string;
  nameWithType: string;
  type: string;
  slug: string;
  name: string;
}

export interface City {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  name: string;
  slug: string;
  type: string;
  nameWithType: string;
  code: string;
  priority: number;
  isEnabled: boolean;
  shipFees: ShipFee[];
}

export interface AddressParam {
  parentCode?: string;
}

export interface AddressData {
  district?: District;
  city?: City;
  ward?: Ward;
}
