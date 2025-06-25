import { Customer } from "./customer";
import { Order } from "./order";
import { Product } from "./product";
import { ProductCategory } from "./product-category";

export interface RefCustomer {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  deletedAt: number;
  totalPoint: number;
  isConfirmed: boolean;
  //   type: RefCustomerType;
  //   refPointType: ProductRefPointType;
  productRefPoint: number;
  productRefQuantity: number;
  productTotalPoint: number;
  productPrice: number;
  oldBalance: number;
  newBalance: number;
  customer: Customer; //parent
  order: Order; //đơn dc tiếp thị
  registerCustomer: Customer; //child
  product: Product;
  productCategory: ProductCategory;
}
