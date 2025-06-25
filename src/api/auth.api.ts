import { request } from "utils/request";
import { AxiosPromise } from "axios";

export const authApi = {
  login: (data: any): AxiosPromise<any> =>
    request({
      url: "/v1/store/auth/login",
      data,
      method: "post",
    }),

  passwordUpdate: (data: any): AxiosPromise<any> =>
    request({
      url: "/v1/store/auth/password/update",
      data,
      method: "patch",
    }),

  profile: (): AxiosPromise<any> =>
    request({
      url: "/v1/store/auth/profile",
    }),
  update: (data?: any): AxiosPromise<any> =>
    request({
      url: "/v1/store/auth/profile",
      method: "patch",
      data,
    }),
};
