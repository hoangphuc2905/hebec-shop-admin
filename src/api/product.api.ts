import { request } from "utils/request";
import { AxiosPromise } from "axios";

export const productApi = {
  findAll: (params?: any): AxiosPromise<any> =>
    request({
      url: "/v1/store/product",
      params,
    }),
  findOne: (id: number): AxiosPromise<any> =>
    request({
      url: `/v1/store/product/${id}`,
    }),
  create: (data: any): AxiosPromise<any> =>
    request({
      url: "/v1/store/product",
      data,
      method: "post",
    }),
  update: (id: number, data: any): AxiosPromise<any> =>
    request({
      url: `/v1/store/product/${id}`,
      method: "patch",
      data,
    }),
  delete: (id: number): AxiosPromise<any> =>
    request({
      url: `/v1/store/product/${id}`,
      method: "delete",
    }),
};
