import { generateHash } from "./headerRequest";
import { message } from "antd";
import axios from "axios";
import { getToken } from "./auth";
import { getDeviceInfo } from "./device";
import { settings } from "settings";

message.config({
  duration: 1.5,
});

// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    const token = getToken();
    const { hash, time } = generateHash();
    const { deviceId, deviceName } = getDeviceInfo();

    if (config.headers) {
      config.headers["hash"] = hash;
      config.headers["time"] = time;
      config.headers["device-name"] = deviceName;
      config.headers["device-id"] = deviceId;
      config.headers["version"] = settings.version;
    }
    if (token && config.headers) {
      config.headers["token"] = token;
    }

    return config;
  },
  (error) => {
    // do something with request error
    // eslint-disable-next-line no-console

    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data;
    // if the custom code is not 20000, it is judged as an error.
    if (response.status !== 200) {
      if (
        response.status === 50008 ||
        response.status === 50012 ||
        response.status === 50014
      ) {
      }
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    let status = error.response ? error.response.status : false;
    let msg = "";
    if (status) {
      msg = error.response.data.message;
    } else {
      msg = error.message;
    }
    message.error(msg);

    return Promise.reject(error);
  }
);

export { service as request };
