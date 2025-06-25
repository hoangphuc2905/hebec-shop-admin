export enum EDeliveryType {
  Manual = "MANUAL", //tự vận chuyển, nhận tại cửa hàng
  Internal = "INTERNAL", //Nội tỉnh
  External = "EXTERNAL", //liên tỉnh
  International = "INTERNATIONAL", //quốc tế
}

export const EShipFeeTypeTrans = {
  [EDeliveryType.Manual]: "O2O tự vận chuyển",
  [EDeliveryType.Internal]: "Nội tỉnh",
  [EDeliveryType.External]: "Liên tỉnh",
  [EDeliveryType.International]: "Quốc tế",
};

export interface ShipFee {
  id: number;
  price: number;
  deliveryDay: number;
  deliveryHour: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  isEnabled: boolean;
  quickPrice: number;
  name: string;
  type: EDeliveryType;
  minFee: number; //phí tối thiểu
  maxWeight: number; //số gram phạm vi
  fixedFee: number; //phí cố định
  fixedFeeOver: number; //phí cố định(vượt ngưỡng)
  weightFee: number; //phí trọng lượng
  weightFeeOver: number; //phí trọng lượng(vượt ngưỡng)
  packagedFee: number; //phí đóng gói
  packagedFeeOver: number; //phí đóng gói(vượt ngưỡng)
  distanceFee: number; //phí khoảng cách
  distanceFeeOver: number; //phí khoảng cách(vượt ngưỡng)
  isEnabledQuick: boolean; //
}
