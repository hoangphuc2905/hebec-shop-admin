import { request } from "utils/request";
import { AxiosPromise } from "axios";

export const cityApi = {
  findAll: (params?: any): AxiosPromise<any> =>
    request({
      url: "/v1/store/city",
      params,
    }),
  create: (data: any): AxiosPromise<any> =>
    request({
      url: "/v1/store/city",
      data,
      method: "post",
    }),
  update: (id: number, data: any): AxiosPromise<any> =>
    request({
      url: `/v1/store/city/${id}`,
      method: "patch",
      data,
    }),
  delete: (id: number): AxiosPromise<any> =>
    request({
      url: `/v1/store/city/${id}`,
      method: "delete",
    }),
};
