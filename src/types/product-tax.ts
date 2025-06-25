import { Product } from "./product";
import { Store } from "./store";

export interface ProductTax {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  isEnabled: boolean;
  deletedAt: number;
  name: string;
  value: number;
  description: string;
  products: Product[];
  store: Store;
}
