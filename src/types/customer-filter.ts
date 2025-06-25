import { QueryObject } from "./queryObject";

export enum ECustomterFilter {
  numOfOrders = "numOfOrders",
  totalMoneyOfOrders = "totalMoneyOfOrders",
  rangeTimeOfOrders = "rangeTimeOfOrders",
  product = "product.id",
  customerRank = "customerRank.id",
  customerCreatedAt = "createdAt",
  source = "source",
}

export const CustomerFilterTrans = {
  [ECustomterFilter.numOfOrders]: {
    title: "Số lượng đơn",
    value: ECustomterFilter.numOfOrders,
    type: "single-filter",
  },
  [ECustomterFilter.totalMoneyOfOrders]: {
    title: "Số tiền",
    value: ECustomterFilter.totalMoneyOfOrders,
    type: "single-filter",
  },
  [ECustomterFilter.rangeTimeOfOrders]: {
    title: "Thời gian mua",
    value: ECustomterFilter.rangeTimeOfOrders,
    type: "range",
  },
  [ECustomterFilter.product]: {
    title: "Sản phẩm đã mua",
    value: ECustomterFilter.product,
    type: "multi-filter",
  },
  [ECustomterFilter.customerRank]: {
    title: "Thứ hạng khách hàng",
    value: ECustomterFilter.customerRank,
    type: "multi-filter",
  },
  [ECustomterFilter.customerCreatedAt]: {
    title: "Thời gian tạo tài khoản",
    value: ECustomterFilter.customerCreatedAt,
    type: "range",
  },
  [ECustomterFilter.source]: {
    title: "Nguồn khách hàng",
    value: ECustomterFilter.source,
    type: "single-filter",
  },
};

export const OperationCustomerFilter = [
  {
    value: "<",
    title: "<",
  },
  {
    value: "<=",
    title: "<=",
  },
  {
    value: ">",
    title: ">",
  },
  {
    value: ">=",
    title: ">=",
  },
  {
    value: "=",
    title: "=",
  },
];

export interface CustomerFilter {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  name: string;
  description: string;
  queryObject: QueryObject[];
}
