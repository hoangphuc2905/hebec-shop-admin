import { request } from "utils/request";
import { AxiosPromise } from "axios";


export const productCategoryApi = {
  findAll: (params?:any):AxiosPromise<any> => request({
    url: '/v1/store/productCategory',
    params
  }),
  create: (data:any):AxiosPromise<any> => request({
    url: '/v1/store/productCategory',
    data,
    method: 'post'
  }),
  update: (id:number, data:any):AxiosPromise<any> => request({
    url: `/v1/store/productCategory/${id}`,
    method: 'patch',
    data
  }),
  delete: (id:number):AxiosPromise<any> => request({
    url: `/v1/store/productCategory/${id}`,
    method: 'delete'
  }),
}
