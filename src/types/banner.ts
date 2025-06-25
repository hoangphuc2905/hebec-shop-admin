import { News } from "types/news";
import { Product } from "./product";

export enum BannerType {
  Top = "TOP", //Đầu trang home
  Hot = "HOT", //Hôm nay có gì hot
  BusinessType = "BUSINESS_TYPE", //Dành cho banner thuộc business
  Footer = "FOOTER", //Cuối trang home
}

export const BannerTypeTrans = {
  [BannerType.Top]: "Đầu trang chủ",
  [BannerType.Hot]: "Hôm nay có gì hot",
  [BannerType.Footer]: "Cuối trang chủ",
  [BannerType.BusinessType]: "Dành cho banner thuộc business",
};

export enum BannerContentType {
  Content = "CONTENT",
  Link = "LINK",
  News = "NEWS",
  Product = "PRODUCT",
}

export const BannerContentTypeTrans = {
  [BannerContentType.Content]: "Nội dung",
  [BannerContentType.Link]: "Đường link",
  [BannerContentType.News]: "Tin tức",
  [BannerContentType.Product]: "Sản phẩm",
};

export interface Banner {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  title: string;
  link: string;
  content: string;
  contentType: BannerContentType;
  image: string;
  desktopImage: string;
  pos: number; //position: 1 đứng đầu ASC
  isVisible: boolean;
  isVisibleDetail: boolean; //true hiển thị ở trang chi tiết các business type
  news: News;
  product: Product;
}
