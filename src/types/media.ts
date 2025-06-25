import { Product, ProductRate } from "./product";

export enum MediaClassify {
  Library = "LIBRARY",
  Product = "PRODUCT",
}

export enum MediaType {
  Image = "IMAGE",
  Video = "VIDEO",
}

export const mediaTrans = {
  [MediaType.Image]: {
    value: MediaType.Image,
    title: "Hình Ảnh",
    color: "green",
  },
  [MediaType.Video]: {
    value: MediaType.Video,
    title: "Video",
    color: "geekblue",
  },
};

export interface Media {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  deletedAt: number;
  name: string;
  type: MediaType;
  thumbnail: string;
  classify: MediaClassify;
  pos: number; //vị trí
  url: string;
  product: Product;
  productRates: ProductRate[];
}
