import { Product } from "./product";

export enum PopupType {
  Content = "CONTENT", // N.dung cứng
  Link = "LINK", // L.kết ngoài
  Product = "PRODUCT", // s.phẩm
}

export enum PopupPlatform {
  Web = "WEB",
  Mobile = "MOBILE",
}

export const PopupTypeTrans = {
  [PopupType.Content]: "Nội dung",
  [PopupType.Link]: "Đường link",
  [PopupType.Product]: "Sản phẩm",
};

export interface Popup {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  deletedAt: number;
  title: string;
  content: string;
  platform: PopupPlatform;
  image: string;
  type: PopupType;
  link: string;
  isVisible: boolean;
  product: Product;
}
