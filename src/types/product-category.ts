import { BookGallery } from "./book";
import { Brand } from "./brand";
import { Product } from "./product";
import { Shop } from "./shop";

export enum ProductCategoryType {
  Menu = "MENU",
  Category = "CATEGORY",
  Brand = "BRAND", //
  Taxonomy = "TAXONOMY", // ngành hàng
}

export const ProductCategoryTypeTrans = {
  [ProductCategoryType.Brand]: {
    label: "Thương hiệu",
    color: "green",
    value: ProductCategoryType.Brand,
  },
  [ProductCategoryType.Category]: {
    label: "Danh mục",
    color: "geekblue",
    value: ProductCategoryType.Category,
  },
  [ProductCategoryType.Taxonomy]: {
    label: "Ngành hàng",
    color: "blue",
    value: ProductCategoryType.Taxonomy,
  },
  [ProductCategoryType.Menu]: {
    label: "Menu",
    color: "purple",
    value: ProductCategoryType.Menu,
  },
};

export interface ProductCategory {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  code: string;
  name: string;
  nameEn: string; //tên tiếng anh
  icon: string;
  level: number;
  slug: string;
  isVisible: boolean;
  isVisibleInApp: boolean;
  metaKeyword: string;
  visibleOnMenu: boolean; //hiển thị trên menu
  isHighlight: boolean; //true: cate nổi bật, hiển thị dạng list + product ở mobile
  type: ProductCategoryType;
  position: number;
  description: string;
  children: ProductCategory[];
  parent: ProductCategory;
  products: Product[];
}
