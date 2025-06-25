import { request } from "utils/request";
import { AxiosPromise } from "axios";

export const wardApi = {
  findAll: (params?: any): AxiosPromise<any> =>
    request({
      url: "/v1/store/ward",
      params,
    }),
  create: (data: any): AxiosPromise<any> =>
    request({
      url: "/v1/store/ward",
      data,
      method: "post",
    }),
  update: (id: number, data: any): AxiosPromise<any> =>
    request({
      url: `/v1/store/ward/${id}`,
      method: "patch",
      data,
    }),
  delete: (id: number): AxiosPromise<any> =>
    request({
      url: `/v1/store/ward/${id}`,
      method: "delete",
    }),
};
