import { Customer } from "./customer";
import { City, District, Ward } from "./address";
export interface DeliveryType {
  id: number;
  name: string;
  type: EDeliveryType;
}

export enum OrderDeliveryPaymentBy {
  Sender = "SENDER", //ng gửi trả
  Receiver = "RECEIVER", //ng nhận trả
}

export interface DeliveryAddress {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  name: string;
  phone: string;
  address: string;
  isDefault: boolean;
  type: DeliveryAddressType;
  city: City;
  district: District;
  ward: Ward;
  customer: Customer;
}

export enum DeliveryAddressType {
  Home = "HOME",
  Office = "OFFICE",
}

export enum DeliveryStatus {
  Fail = "FAIL",
}

export const deliveryAddressTrans = {
  [DeliveryAddressType.Home]: {
    value: DeliveryAddressType.Home,
    title: "Nhà",
  },
  [DeliveryAddressType.Office]: {
    value: DeliveryAddressType.Office,
    title: "Văn phòng",
  },
};

export enum EDeliveryType {
  FromStore = "FROM_STORE", //sp giao từ cửa hàng
  FromFactory = "FROM_FACTORY", //sp giao từ nhà máy
}

export enum EOrderDeliveryType {
  Manual = "MANUAL", //giao từ store
  Factory = "FACTORY", //giao từ nhà máy
}
export const orderDeliveryTypeTrans = {
  [EOrderDeliveryType.Manual]: "cửa hàng", //giao từ store
  [EOrderDeliveryType.Factory]: "nhà máy", //giao từ store
};

export const deliveryTypes = [
  EDeliveryType.FromStore,
  EDeliveryType.FromFactory,
];

export const DeliveryTypeTrans = {
  [EDeliveryType.FromStore]: {
    content: "Sản phẩm giao từ cửa hàng",
    value: EDeliveryType.FromStore,
  },
  [EDeliveryType.FromFactory]: {
    content: "Sản phẩm giao từ nhà máy",
    value: EDeliveryType.FromFactory,
  },
};

export const DeliveryTypeSimpleTrans = {
  [EDeliveryType.FromStore]: {
    content: "Cửa hàng",
    value: EDeliveryType.FromStore,
  },
  [EDeliveryType.FromFactory]: {
    content: "Nhà máy",
    value: EDeliveryType.FromFactory,
  },
};
