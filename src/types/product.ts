import { PromotionCampaignDetail } from "./promotion-campaign";
import { CouponCampaignDetail } from "./coupon-campaign";
import {
  FlashSaleCampaign,
  FlashSaleCampaignDetail,
} from "./flash-sale-campaign";
import { ProductTag } from "types/tag";
import { Brand } from "./brand";
import { Customer } from "./customer";
import { DeliveryType, EDeliveryType } from "./deliveryType";
import { Media } from "./media";
import { Order, OrderDetail } from "./order";
import { PaymentType } from "./paymentType";
import { ProductCategory } from "./product-category";
import { Store } from "./store";
import { TaxConfig } from "./taxConfig";
import { ProductTax } from "./product-tax";
import { TransportConfig } from "./transport";
import {
  ProductVariationDetail,
  ProductVariationDetailValue,
} from "./product-variation";

export enum ProductType {
  Main = "MAIN", //sp chính
  Extra = "EXTRA", //sp gia tăng
  ServiceFee = "SERVICE_FEE", //phí dịch vụ
  ShipO2O = "SHIP_O2O", //Dịch vụ O2O Tự Vận Chuyển
  ShipInter = "SHIP_INTER", //Ship nội thanh
  ShipOuter = "SHIP_OUTER", //Ship liên tỉnh
}

export interface ProductCustomField {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  value: string;
  valueEn: string;
  isVisible: boolean;
  customFieldId: number;
  name: string;
  product: Product;
  customField: CustomField;
}

export const ProductTypeTranslations = {
  [ProductType.Extra]: {
    title: "Sản phẩm gia tăng",
    value: ProductType.Extra,
  },
  [ProductType.Main]: {
    title: "Sản phẩm chính",
    value: ProductType.Main,
  },
  [ProductType.ServiceFee]: {
    title: "Phí dịch vụ",
    value: ProductType.ServiceFee,
  },
};

export const ShippingServiceTypeTranslations = {
  [ProductType.ShipO2O]: {
    title: "Dịch vụ O2O Tự Vận Chuyển",
    value: ProductType.ShipO2O,
  },
  [ProductType.ShipInter]: {
    title: "Ship nội thanh",
    value: ProductType.ShipInter,
  },
  [ProductType.ShipOuter]: {
    title: "Ship liên tỉnh",
    value: ProductType.ShipOuter,
  },
};

export const ProductTypeTrans = {
  [ProductType.Extra]: {
    title: "Sản phẩm gia tăng",
    value: ProductType.Extra,
  },
  [ProductType.Main]: {
    title: "Sản phẩm chính",
    value: ProductType.Main,
  },
  [ProductType.ServiceFee]: {
    title: "Phí dịch vụ",
    value: ProductType.ServiceFee,
  },
  [ProductType.ShipO2O]: {
    title: "Dịch vụ O2O Tự Vận Chuyển",
    value: ProductType.ShipO2O,
  },
  [ProductType.ShipInter]: {
    title: "Ship nội thanh",
    value: ProductType.ShipInter,
  },
  [ProductType.ShipOuter]: {
    title: "Ship liên tỉnh",
    value: ProductType.ShipOuter,
  },
};

export enum ProductPricingType {
  Price = "PRICE", //theo tiền
  ECard = "ECARD", //theo phí suất (%)
}

export interface ITrans {
  title: string;
  value: any;
}

export const ProductPricingTypeTrans = {
  [ProductPricingType.Price]: {
    title: "Dạng giá",
    value: ProductPricingType.Price,
  },
  [ProductPricingType.ECard]: {
    title: "Dạng E-Card",
    value: ProductPricingType.ECard,
  },
};

export enum ProductMode {
  Strict = "STRICT",
  Unstrict = "UNSTRICT",
}

export interface Product {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  deletedAt: number;
  code: string;
  syncId: string;
  type: ProductType;
  deliveryType: DeliveryType;
  brandName: string; //thương hiệu
  name: string;
  nameEn: string; //tên tiếng anh
  unitPrice: number; //giá lẻ
  finalPrice: number; //giá đã gồm khuyến mãi
  importPrice: number; //giá nhập kho (vốn)
  //quy cách
  length: number; //cm
  width: number; //cm
  height: number; //cm
  weight: number; //gram
  taxPercent: number; //thuế(%)
  image: string;
  sold: number; //sl đã bán
  pending: number; //sl đã bán nhưng chưa hoàn tất đơn
  description: string;
  descriptionEn: string;
  totalStar: number;
  totalRate: number;
  totalLike: number;
  totalView: number;
  isHighlight: boolean;
  isActive: boolean; //true: hiển thị ở web khách hàng
  videoUrl: string;
  lifeCycleDay: number;
  //other
  images: Media[];
  productCategory: ProductCategory; //main
  productCustomFields: ProductCustomField[];
  productVariations: ProductVariation[];
  productVariationDetails: ProductVariationDetail[];
  productVariationDetailValues: ProductVariationDetailValue[];
  productTags: ProductTag[];
  likedProducts: LikedProduct[];
  viewedProducts: ViewedProduct[];
  warehouses: Warehouse[];
  flashSaleCampaignDetails: FlashSaleCampaignDetail[];
  couponCampaignDetails: CouponCampaignDetail[];
  promotionCampaignDetails: PromotionCampaignDetail[];
  orderDetails: OrderDetail[];
  store: Store;
  stores: Store[];
  transportConfigs: TransportConfig[];
  // deletedBy: Employee
  productTax: ProductTax;
  discountPercent: number;
  minPrice: number;
  maxPrice: number;
  originMinPrice: number;
  originMaxPrice: number;
  quantity: number;
  promotionPrice: number;
  productCategoryId: number;
  storeIds: number[];
  isFlashSale: boolean;
  isPromotion: boolean;
  mode: ProductMode;
  needed: number;
  // stock: number;

  //Để tạm
  productVariationDetailValueId: number;
  availableFlashSale: number;
  isEnabledFlashSale: boolean;
  isEnabledPromotion: boolean;
  isChildren: boolean;
  stock?: number;
  isVariantProduct: boolean;
  flashSaleDetails: FlashSaleCampaignDetail[];

  needNegotiate: boolean;

  parentProductId?: number;
  isVerifiedKiotViet: boolean;
  kvId: number;
  kvName: string;
  kvCode: string;
}

export interface Depot {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  code: string;
  name: string;
  // location: DepotLocation;
  warehouses: Warehouse[];
  // inventories: Inventory[];
  // inventoryChecks: InventoryCheck[]
  orders: Order[];
  store: Store;
}

export interface Warehouse {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  quantity: number;
  pending: number; //sl tồn đang chờ xuất, đã ra đơn những chưa hoàn tất=
  sold: number;
  product: Product;
  depot: Depot;
}

export interface ViewedProduct {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  totalView: number;
  customer: Customer;
  product: Product;
  store: Store;
}

export interface LikedProduct {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  customer: Customer;
  product: Product;
  store: Store;
}

export interface CustomField {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  name: string;
  icon: string;
  isVisible: boolean;
  productCategory: ProductCategory;
  product: Product;
}

export interface ProductProperty {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  key: string;
  value: string;
  product: Product;
}

export interface ProductVariation {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  name: string;
  unitPrice: number;
  productVariationDetails: ProductVariationDetail[];
  isMain: boolean; //true: lấy giá của biến thể này để show ra UI khi search, hoặc tự select
  wholePrice: number; //giá buôn
  shockPrice: number; //giá shock
  importPrice: number; //giá nhập (bán cho khách purchasing)
  eCardFee: number; //phí suất nếu bán dạng E-Card (dvt: %)
}

export interface ProductAttribute {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  name: string;
  product: Product;
  productVariations: ProductVariation[];
}

export interface ProductPricing {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
}

export interface ProductRate {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  content: string;
  star: number;
  product: Product;
  customer: Customer;
  images: Media[];
  order: Order;
}
export enum visibleStatusEnum {
  visible = "Hiện",
  hide = "Ẩn",
}
export const visibleStatusTrans = {
  [visibleStatusEnum.hide]: { label: "Ẩn", value: false },
  [visibleStatusEnum.visible]: { label: "Hiện", value: true },
};
