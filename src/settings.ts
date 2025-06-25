import productDefault from "assets/images/productDefault.jpg";

export const settings = {
  checkPermission: false,
  version: "0.0.89",
  dateFormat: "DD/MM/YYYY",
  fullDateFormat: "HH:mm, DD/MM/YYYY",
  isDev: import.meta.env.VITE_IS_DEV == "true",
  productDefault,
};
