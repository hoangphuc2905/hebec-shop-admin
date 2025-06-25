import { Product } from "./product";

export interface ProductVariation {
  id: number;
  name: string;
  customId: number;
}

export interface ProductVariationDetail {
  id: number;
  name: string;
  parentCustomId: number;
  customId: number;
}

export interface ProductVariationDetailValue {
  id: number;
  parentCustom1Id: number;
  parentCustom2Id: number;
  available: number;
  unitPrice: number;
  productVariationDetail1: { name: string };
  productVariationDetail2: { name: string };
  availableFlashSale: number;
  finalPrice: number;
  discountPercent: number;
  isEnabledFlashSale: boolean;
  name: string;
  discountFlashSalePercent: number;
  discountPromotionPercent: number;
  stock: number;
  price: number;
  productId: number;
  product?: Product;
  quantity?: number;
}

export interface Pricing {
  available: number;
  availableFlashSale: number;
  createdAt: number;
  deletedAt: number;
  finalPrice: number;
  id: number;
  isDeleted: false;
  isEnabledFlashSale: false;
  isEnabledPromotion: false;
  parentCustom1Id: "9d9e9a7c-e843-47d0-955c-e51946429379";
  parentCustom2Id: "3a841d94-abde-4805-8249-34710417aa9f";
  pending: number;
  pendingFlashSale: number;
  product: Product;
  productVariationDetail1: ProductVariationDetail;
  productVariationDetail2?: ProductVariationDetail;
  sold: number;
  soldFlashSale: number;
  unitPrice: number;
  updatedAt: number;
}
