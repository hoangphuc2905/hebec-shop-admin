import { Customer } from "./customer";
import { Media } from "./media";
import { Order } from "./order";
import { Product } from "./product";

export const ProductRateStrans = {
  "5": {
    title: "5 Sao",
    value: 5,
  },
  "4": {
    title: "4 Sao",
    value: 4,
  },
  "3": {
    title: "3 Sao",
    value: 3,
  },
  "2": {
    title: "2 Sao",
    value: 2,
  },
  "1": {
    title: "1 Sao",
    value: 1,
  },
};

export interface ProductRate {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  content: string;
  star: number;
  product: Product;
  customer: Customer;
  images: Media[];
  order: Order;
}
