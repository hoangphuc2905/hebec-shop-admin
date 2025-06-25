import { request } from "utils/request";
import { AxiosPromise } from "axios";

export const districtApi = {
  findAll: (params?: any): AxiosPromise<any> =>
    request({
      url: "/v1/store/district",
      params,
    }),
  create: (data: any): AxiosPromise<any> =>
    request({
      url: "/v1/store/district",
      data,
      method: "post",
    }),
  update: (id: number, data: any): AxiosPromise<any> =>
    request({
      url: `/v1/store/district/${id}`,
      method: "patch",
      data,
    }),
  delete: (id: number): AxiosPromise<any> =>
    request({
      url: `/v1/store/district/${id}`,
      method: "delete",
    }),
};
