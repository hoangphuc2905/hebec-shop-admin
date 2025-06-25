import { Bank } from "./bank";
import { Order } from "./order";

export enum EOnlinePayment {
  Bank = "BANK", // ngân hàng
  Wallet = "E-WALLET", //ví điện tử
}

export const EOnlinePaymentTrans = {
  [EOnlinePayment.Bank]: "Ngân hàng",
  [EOnlinePayment.Wallet]: "Ví điện tử",
};

export interface OnlinePayment {
  id: number;
  bank: Bank;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  ownerName: string;
  bankNumber: string;
  name: string;
  icon: string;
  type: EOnlinePayment;
  qrCode: string; //code hoặc hình ảnh QR
  orders: Order[];
}
