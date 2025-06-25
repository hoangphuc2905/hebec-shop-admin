import { ProductCategory } from "./product-category"

export interface Brand {
  id: number
  createdAt: number
  updatedAt: number
  isDeleted: boolean
  name: string
  icon: string
  productCategories: ProductCategory[]
}