import { Gender } from "constant";
import { Area } from "./area";
import { BusinessType } from "./business-type";
import { Customer } from "./customer";
import { Media } from "./media";

export enum WorkingHourStatus {
  New = "NEW", //Chưa cập nhật
  AllDay = "ALL_DAY", //Luôn mở cửa
  Release = "RELEASE", //Đã cập nhật
}

export const WorkingHourStatusTrans = {
  [WorkingHourStatus.New]: "Chưa cập nhật",
  [WorkingHourStatus.AllDay]: "Luôn mở cửa",
  [WorkingHourStatus.Release]: "Tùy chỉnh",
};

export interface Shop {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  name: string;
  description: string;
  phone: string;
  workingHourJson: string;
  address: string;
  avatar: string;
  open: string | moment.Moment; //format: HH:mm
  close: string | moment.Moment; //format: HH:mm
  shipContent: string; //Thời gian giao hàng: Nội thành Tokyo 1-2 ngày
  totalRate: number;
  totalStar: number;
  lat: number;
  long: number;
  facebook: string;
  website: string;
  isBlocked: boolean;
  type: ShopType;
  isAllowOrder: boolean;
  workingHourStatus: WorkingHourStatus;
  paymentMethodJson: string; //['COD','BANK]
  isVisibleWebOnClient: boolean;

  //owner
  username: string;
  password: string;
  ownerName: string;
  ownerEmail: string;
  ownerDob: string;
  ownerPhone: string;
  ownerGender: Gender;
  ownerBornPlace: string; //Nơi sinh
  ownerAvatar: string;
  //

  // shopCategory: ShopCategory;
  // products: Product[];
  // likedShops: LikedShop[];
  thumbnails: Media[];
  // rates: Rate[];
  area: Area;
  businessType: BusinessType;
  customer: Customer;
  expiredSuspendAt: number;
  isSuspended: boolean;
  email: string;
  isOpenAllDay: boolean;
}

export enum ShopType {
  Company = "COMPANY", //Default
  Retail = "RETAIL", //bán lẻ
  Booking = "BOOKING", //Đặt lịch
  BookCar = "BOOKCAR", //Đặt xe
}

export const ShopTypeTrans = {
  [ShopType.Company]: "Cơ bản",
  [ShopType.Retail]: "Bán lẻ",
  [ShopType.Booking]: "Đặt lịch, nhà hàng",
  [ShopType.BookCar]: "Đặt xe",
};
