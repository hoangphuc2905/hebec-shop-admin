import { request } from "utils/request";
import { AxiosPromise } from "axios";

export const orderApi = {
  findAll: (params?: any): AxiosPromise<any> =>
    request({
      url: "/v1/store/order",
      params,
    }),
  create: (data: any): AxiosPromise<any> =>
    request({
      url: "/v1/store/order",
      data,
      method: "post",
    }),
  update: (id: number, data: any): AxiosPromise<any> =>
    request({
      url: `/v1/store/order/${id}/confirm`,
      method: "patch",
      data,
    }),
  delete: (id: number): AxiosPromise<any> =>
    request({
      url: `/v1/store/order/${id}`,
      method: "delete",
    }),
  updateStatus: (id: number, status: string): AxiosPromise<any> =>
    request({
      url: `/v1/store/order/${id}/${status.toLowerCase()}`,
      method: "patch",
    }),
  updateReceiverAddress: (id: number, data: any): AxiosPromise<any> =>
    request({
      url: `/v1/store/order/${id}/receiverAddress`,
      method: "patch",
      data,
    }),
  findById: (id: number): AxiosPromise<any> =>
    request({
      url: `/v1/store/order/${id}`,
      method: "get",
    }),
};
