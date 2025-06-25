export enum ContentDefineType {
  HowToUseApp = "HOW_TO_USE_APP", //hd sử dụng
  DeliveryPolicy = "DELIVERY_POLICY", //Chính sách giao hàng
  TermOfPayment = "TERM_OF_PAYMENT", //quy trình thanh toán
  Policy = "POLICY", //Chính sách bảo mật
  HowToUpgradeRank = "HOW_TO_UPGRADE_RANK", //Hướng dẫn cách thăng hạng
  MarketingGuide = "MARKETING_GUIDE", // Hướng dẫn tiếp thị
}

export const ContentDefineTypeTrans = {
  [ContentDefineType.HowToUseApp]: "Hướng dẫn sử dụng",
  [ContentDefineType.DeliveryPolicy]: "Chính sách giao hàng",
  [ContentDefineType.TermOfPayment]: "Quy trình thanh toán",
  [ContentDefineType.Policy]: "Chính sách bảo mật",
  [ContentDefineType.HowToUpgradeRank]: "Hướng dẫn cách thăng hạng",
  [ContentDefineType.MarketingGuide]: "Hướng dẫn giới thiệu sản phẩm",
};

export interface ContentDefine {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  body: string;
  type: ContentDefineType;
}
