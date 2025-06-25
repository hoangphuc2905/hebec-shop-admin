import { Product } from "./product";
import { ProductVariationDetailValue } from "./product-variation";
import { Store } from "./store";

export interface FlashSaleCampaign {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  isEnabled: boolean;
  name: string;
  startAt: any; //unix startOf day
  endAt: any; //unix endOf day
  isRefundQuantity: boolean; //Đã trả lại sl cho sp khi hết hiệu lực hoặc xóa
  flashSaleCampaignDetails: FlashSaleCampaignDetail[];
  store: Store;

  type: "DOB" | "FIRST_REGISTER" | "EVENT";
}

export interface FlashSaleCampaignDetail {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  sold: number;
  no?: number;
  finalPrice: number;
  price: number;
  pending: number; //sl đã bán, chưa hoàn thành đơn
  stock: number; //sl tồn có thể bán
  product: Product;
  flashSaleCampaign: FlashSaleCampaign;
  productVariationDetailValue: ProductVariationDetailValue;
  discountPercent: number;
  isVariation: boolean;
}

export interface FlashSaleCampaignDetailForm {
  id: number;
  price: number;
  finalPrice: number;
  stock: number;
  productId: number;
  productVariationDetailValueId?: number;
}
