import { request } from "utils/request";
import { AxiosPromise } from "axios";

export const customerApi = {
  findAll: (params?: any): AxiosPromise<any> =>
    request({
      url: "/v1/store/customer",
      params,
    }),
  create: (data: any): AxiosPromise<any> =>
    request({
      url: "/v1/store/customer",
      data,
      method: "post",
    }),
  update: (id: number, data: any): AxiosPromise<any> =>
    request({
      url: `/v1/store/customer/${id}`,
      method: "patch",
      data,
    }),
  delete: (id: number): AxiosPromise<any> =>
    request({
      url: `/v1/store/customer/${id}`,
      method: "delete",
    }),
  findById: (id: number): AxiosPromise<any> =>
    request({
      url: `/v1/store/customer/${id}`,
      method: "get",
    }),
};
