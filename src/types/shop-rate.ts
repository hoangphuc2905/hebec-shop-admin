import { Customer } from "./customer";
import { Media } from "./media";
import { Shop } from "./shop";

export interface ShopRate {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  content: string;
  star: number;
  image: string;
  images: Media[];
  customer: Customer;
  shop: Shop;
}
