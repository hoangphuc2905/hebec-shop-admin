import { District, City, Ward } from "./address";
import { Area } from "./area";
import { Permission } from "./role";
import { Staff } from "./staff";
import { ZaloOA } from "./zaloOA";

export interface BenefitPackage {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  deletedAt: number;
  name: string;
  description: string;
  expirationDate: number; // hạn sử dụng (ngày)
  price: number;
  isDefault: boolean;
  permissions: Permission[];
  stores: Store[];
}
export interface Store {
  code: string;
  id: number;
  benefitPackage: BenefitPackage;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  isEnabledUpdateAgent: boolean;
  enableRemind: boolean;
  name: string;
  district: District;
  city: City;
  ward: Ward;
  phone: string;
  area: Area;
  areaId?: number;
  avatar: string; //hình ảnh chính của cửa hàng
  address: string;
  expiredAt: number; //hạn dùng
  lat: number;
  lng: number;
  staffs: Staff[];
  cityId: number;
  districtId: number;
  wardId: number;
  isApplyAllProduct: boolean;
  namespace: string;
  schemaApp: string;
  currentCOD: number;
  pendingCOD: number;
  zaloOAAccount: ZaloOA;
  isZaloOA: boolean;
  isVerifiedKiotViet: boolean;
}
