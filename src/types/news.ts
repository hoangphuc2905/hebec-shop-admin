import { Customer } from "./customer";
import { ProductCategory } from "./product-category";

export interface News {
  id: number
  createdAt: number
  updatedAt: number
  isDeleted: boolean
  title: string
  position: number
  content: string
  isHighlight: boolean
  thumbnail: string
  totalViews: number //số lượt view 
  shortContent: string
  isVisible: boolean
  likes: number
  likedCustomers: Customer[]
  productCategory: ProductCategory
  newsTags: NewsTag[]
}

export interface NewsTag {
  id: number
  createdAt: number
  updatedAt: number
  isDeleted: boolean
  name: string
  newses: News[]
}
