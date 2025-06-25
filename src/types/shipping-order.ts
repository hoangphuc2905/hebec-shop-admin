import { EDeliveryType } from "./shipFee";
import { City, District } from "types/address";
import { Order } from "types/order";
import { Ward } from "./address";
export interface ShippingOrder extends Omit<Order, "details" | "deliveryType"> {
  senderAddress: string;
  senderName: string;
  senderPhone: string;

  senderWard: Ward;
  senderCity: City;
  senderDistrict: District;

  deliveryType: EDeliveryType;

  details: ShippingOrderDetail[];
}

export interface ShippingOrderDetail {
  name: string;
  length: number;
  width: number;
  height: number;
  weight: number;
  ntVatTax: number;
  price: number;
  quantity: number;
  savingC: number;
  tndnTax: number;
  totalNtVatTax: number;
  totalSavingC: number;
  totalTndnTax: number;
  totalTtdbTax: number;
  totalVatTax: number;
  ttdbTax: number;
  vatTax: number;
}
