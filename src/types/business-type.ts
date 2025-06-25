import { isVisible } from "@testing-library/user-event/dist/utils";

export enum ShopBusinessType {
  Retail = "RETAIL", //Mua sắm
  Restaurant = "RESTAURANT", //Nhà hàng, dịch vụ giải trí
  Spa = "SPA", //Làm đẹp
  BookCar = "BOOK_CAR", //Gọi xe
  Organization = "ORGANIZATION", //Cơ quan, tổ chức
}

export interface BusinessType {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  name: string;
  type: ShopBusinessType;
  image: string;
  isPriority: boolean;
  markerIcon: string;
  isVisible: boolean;
  // shops: Shop[];
}
