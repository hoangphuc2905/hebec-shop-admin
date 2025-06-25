import { Area } from "./area"
import { Shop } from "./shop"

export interface ShipFee {
  id: number
  createdAt: number
  updatedAt: number
  isDeleted: boolean
  amount: number
  area: Area;
  shop: Shop;
}