import { EDeliveryType, EOrderDeliveryType } from "./deliveryType";
import { PromotionCampaign } from "types/promotion-campaign";
import { PromotionCampaignDetail } from "types/coupon-campaign";
import { CouponCampaignDetail, CustomerCoupon } from "./coupon-campaign";
import { FlashSaleCampaignDetail } from "types/flash-sale-campaign";
import { Ward } from "types/address";
import { District } from "types/address";
import { City } from "types/address";
import { Customer } from "./customer";
import { EPaymentType } from "./paymentType";
import { Product } from "./product";
import { Shop } from "./shop";
import { Store } from "./store";
import { OrderCustomField } from "./order-custom-field";
import { Transport } from "./transport";
import { OnlinePayment } from "./online-payment";
import { subDays, format, subMonths, subQuarters, subWeeks } from "date-fns";
import moment from "moment";
import { EPaymentStatus } from "./paymentStatus";
import { LogTransportEconomys, LogTransportExpresses } from "./logOrder";
import { FileAttach } from "./fileAttach";
import { ShipFee } from "./shipFee";
import { Employee } from "./employee";

export interface Order {
  id: number;
  createdAt: number;
  cityShipFee: ShipFee;
  updatedAt: number;
  isDeleted: boolean;
  customerCoupon: CustomerCoupon;
  code: string;
  isFreeShip: boolean;
  employee: Employee;
  confirmedAt: number; //Xác nhận đơn (Đã tiếp nhận)
  deliveringAt: number; //Đang v/c
  completeAt: number; //Thành công
  canceledAt: number; //Hủy
  startLat: number; //
  startLong: number; //
  estimatedDeliveryFromAt: number; //
  estimatedDeliveryAt: number; //
  startAddress: string; //
  createdEmployee: Employee;
  deliveryType: EOrderDeliveryType;
  endLat: number; //
  endLong: number; //
  endAddress: string; //
  note: string; //
  //Danh cho shop booking
  appointmentDate: string; //ngày đặt lịch dành cho shop booking. Format: YYYY-MM-DD
  appointmentHour: string; //Giờ đặt lịch dành cho shop booking. Format:
  amountOfPeople: string; //Giờ đặt lịch dành cho shop booking. Format:
  //end
  paymentMethod: EPaymentType;
  paymentStatus: EPaymentStatus;
  isReceiveAtStore: boolean;
  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;
  gifts: OrderDetail[];
  status: OrderStatus;
  subTotalMoney: number; //tạm tính
  moneyDistance: number; //phí v/c
  moneyFinal: number; //Tiền khách cần trả
  customer: Customer;
  shop: Shop;
  details: OrderDetail[];
  shipFee: number;
  promotionCampaigns: PromotionCampaign[];
  orderProductTaxs: OrderProductTax[];
  receiverCity: City;
  receiverDistrict: District;
  receiverWard: Ward;
  refCustomer: Customer;
  moneyVat: number;
  isReceiptTax: boolean;
  isCalcManual: boolean;
  store: Store;
  orderReceipt: OrderReceipt;
  moneyAffiliate: number;
  moneyDiscount: number;
  moneyDiscountCoupon: number;
  moneyDiscountFlashSale: number;
  moneyDiscountShipFee: number;
  moneyProduct: number;
  moneyProductOrigin: number;
  orderCustomFieldDatas: OrderCustomField[];
  transport: Transport;
  transportCode: string;
  transportStatus: string;
  transportPreviewUrl: string;
  onlinePayment: OnlinePayment;
  totalMoney: number;
  paidPoint: number;
  logTransportEconomys: LogTransportEconomys[];
  logTransportExpresses: LogTransportExpresses[];
  fileAttaches?: FileAttach[];
  syncChannel: OrderSyncChannel;
  syncStatus: string;
  syncStatusText: string;
  syncId: string;
  syncCode: string;
}

export enum PaymentMethod {
  COD = "COD", //Thanh toán khi nhận hàng
  BankTransfer = "BANK_TRANSFER", //Chuyển khoản ngân hàng
}

export const PaymentMethodTrans = {
  [PaymentMethod.COD]: "Thanh toán khi nhận hàng",
  [PaymentMethod.BankTransfer]: "Chuyển khoản ngân hàng",
};

export enum OrderStatus {
  Pending = "PENDING", //đã đặt hàng
  Confirm = "CONFIRM", //đã xác nhận thanh toán
  Delivering = "DELIVERING", //đang vận chuyển
  Complete = "COMPLETE", //hoàn thành
  Cancel = "CANCEL", //hủy
  Processing = "PROCESSING",
  ReturnRefund = "RETURN_REFUND", //bùng hàng
}
export const OrderStatusTransDefault = {
  [OrderStatus.Pending]: {
    title: "Đã đặt hàng",
    color: "#87d067",
    value: OrderStatus.Pending,
  },
  [OrderStatus.Confirm]: {
    title: "Đã xác nhận",
    color: "#fbad16",
    value: OrderStatus.Confirm,
  },
  [OrderStatus.Processing]: {
    title: "Đang xử lý",
    color: "#1ed6ce",
    value: OrderStatus.Processing,
  },
  [OrderStatus.Delivering]: {
    title: "Đang vận chuyển",
    color: "#fd7321",
    value: OrderStatus.Delivering,
  },
  [OrderStatus.Complete]: {
    title: "Hoàn tất",
    color: "#19A7CE",
    value: OrderStatus.Complete,
  },
  [OrderStatus.Cancel]: {
    title: "Đã Huỷ",
    color: "red",
    value: OrderStatus.Cancel,
  },
  [OrderStatus.ReturnRefund]: {
    title: "Hoàn trả",
    color: "#ed1c24",
    value: OrderStatus.ReturnRefund,
  },
};

export const OrderStatusTrans = {
  [OrderStatus.Pending]: {
    title: "Đã đặt hàng",
    color: "#87d067",
    value: OrderStatus.Pending,
  },
  [OrderStatus.Confirm]: {
    title: "Đã xác nhận",
    color: "#fbad16",
    value: OrderStatus.Confirm,
  },
  [OrderStatus.Processing]: {
    title: "Đang xử lý",
    color: "#1ed6ce",
    value: OrderStatus.Processing,
  },
  [OrderStatus.Delivering]: {
    title: "Đang vận chuyển",
    color: "#fd7321",
    value: OrderStatus.Delivering,
  },
  [OrderStatus.Complete]: {
    title: "Hoàn tất",
    color: "#19A7CE",
    value: OrderStatus.Complete,
  },
  [OrderStatus.Cancel]: {
    title: "Đã Huỷ",
    color: "red",
    value: OrderStatus.Cancel,
  },
  [OrderStatus.ReturnRefund]: {
    title: "Hoàn trả",
    color: "#ed1c24",
    value: OrderStatus.ReturnRefund,
  },
};

export const GentisOrderStatusTrans = {
  [OrderStatus.Pending]: {
    title: "Chờ xác nhận",
    color: "#87d067",
    value: OrderStatus.Pending,
  },
  [OrderStatus.Confirm]: {
    title: "Chờ xét nghiệm",
    color: "#fbad16",
    value: OrderStatus.Confirm,
  },
  [OrderStatus.Processing]: {
    title: "Đang xét nghiệm",
    color: "#1ed6ce",
    value: OrderStatus.Processing,
  },
  [OrderStatus.Delivering]: {
    title: "Đang giao kết quả",
    color: "#fd7321",
    value: OrderStatus.Delivering,
  },
  [OrderStatus.Complete]: {
    title: "Đã giao kết quả",
    color: "#19A7CE",
    value: OrderStatus.Complete,
  },
  [OrderStatus.Cancel]: {
    title: "Đã Huỷ",
    color: "red",
    value: OrderStatus.Cancel,
  },
};

export const OrderStatuses = [
  {
    label: OrderStatusTrans[OrderStatus.Pending],
    value: OrderStatus.Pending,
  },
  {
    label: OrderStatusTrans[OrderStatus.Confirm],
    value: OrderStatus.Confirm,
  },
  {
    label: OrderStatusTrans[OrderStatus.Delivering],
    value: OrderStatus.Delivering,
  },
  {
    label: OrderStatusTrans[OrderStatus.Complete],
    value: OrderStatus.Complete,
  },
  {
    label: OrderStatusTrans[OrderStatus.Cancel],
    value: OrderStatus.Cancel,
  },
];

export interface OrderDetail {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  price: number;
  isGift?: boolean;
  finalPrice: number;
  quantity: number;
  parent?: OrderDetail;
  product: Product;
  flashSaleCampaignDetail: FlashSaleCampaignDetail;
  couponCampaignDetail: CouponCampaignDetail;
  promotionCampaignDetail: PromotionCampaignDetail; //khuyến mãi giảm giá
  giftPromotionCampaignDetail: PromotionCampaignDetail; //khuyến mãi tặng kèm
  order: Order;
  deletedAt: number;
  discount: number;
  discountCoupon: number;
  discountFlashSale: number;
  moneyTax: number;
  name: string;
  nameTax: string;
  percentTax: number;
  savingPoint: number;
  orderProductVariations: OrderProductVariation[];
  productVariationDetailValue: any;
  weight: number;
  variationName1: string;
  variationName2: string;
  variationValue1: string;
  variationValue2: string;
}

export interface OrderProductVariation {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  deletedAt: number;
  parentName: string;
  childName: string;
  finalPrice: number;
}
export interface ProductVariation {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  name: string;
  isMain: boolean; //true: lấy giá của biến thể này để show ra UI khi search, hoặc tự select
  available: number; //sl tồn kho có thể
  unitPrice: number; //giá bán lẻ
  wholePrice: number; //giá buôn
  shockPrice: number; //giá shock
  importPrice: number; //giá nhập (bán cho khách purchasing)
  eCardFee: number; //phí suất nếu bán dạng E-Card (dvt: %)
  product: Product;
  orderDetails: OrderDetail[];
}

export interface OrderProductTax {
  id: number;
  createdAt: number;
  deletedAt: number;
  description: string;
  isDeleted: boolean;
  moneyTax: number;
  name: string;
  // productTax: null;
  updatedAt: number;
  value: number;
}
export interface OrderReceipt {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  deletedAt: number;
  status: OrderReceiptStatus;
  companyName: string; //tên đơn vị
  taxCode: string;
  address: string;
  order: Order;
  city: City;
  district: District;
  ward: Ward;
}

export enum OrderReceiptStatus {
  Pending = "PENDING",
  Complete = "COMPLETE",
}
export const orderReceiptStatusTrans = {
  [OrderReceiptStatus.Complete]: {
    value: OrderReceiptStatus.Complete,
    color: "darkGreen",
    title: "Đã xuất",
  },
  [OrderReceiptStatus.Pending]: {
    value: OrderReceiptStatus.Pending,
    color: "brown",
    title: "Chưa xuất",
  },
};

export enum EQuantityOfTime {
  Week = "week",
  PreWeek = "pre-week",
  Month = "month",
  PreMonth = "pre-month",
  Quarter = "quarter",
  PreQuarter = "pre-quarter",
  Year = "year",
  PreYear = "pre-year",
  FirstSixMonth = "st-6-month",
  EndSixMonth = "nd-6-month",
}

const preWeek = `${moment()
  .subtract(2, "weeks")
  .startOf("week")
  .format("DD/MM")} đến ${moment()
  .subtract(2, "weeks")
  .endOf("week")
  .format("DD/MM")}`;
const preMonth = format(subMonths(new Date(), 2), "MM/yyyy");
const preQuarter = format(subQuarters(new Date(), 2), "Q yyyy");
const preYear = new Date().getFullYear() - 2;

export const EQuantityOfTimeTrans = {
  [EQuantityOfTime.Week]: {
    label: "Tuần này",
    description: "So với tuần trước",
    value: EQuantityOfTime.Week,
    quantity: 1,
  },
  [EQuantityOfTime.PreWeek]: {
    label: "Tuần trước",
    description: `So với ngày ${preWeek}`,
    value: EQuantityOfTime.PreWeek,
  },
  [EQuantityOfTime.Month]: {
    label: "Tháng này",
    description: "So với tháng trước",
    value: EQuantityOfTime.Month,
  },
  [EQuantityOfTime.PreMonth]: {
    label: "Tháng trước",
    description: `So với tháng ${preMonth}`,
    value: EQuantityOfTime.PreMonth,
  },
  [EQuantityOfTime.Quarter]: {
    label: "Quý này",
    description: "So với quý trước",
    value: EQuantityOfTime.Quarter,
  },
  [EQuantityOfTime.PreQuarter]: {
    label: "Quý trước",
    description: `So với quý ${preQuarter}`,
    value: EQuantityOfTime.PreQuarter,
  },
  [EQuantityOfTime.Year]: {
    label: "Năm nay",
    description: "So với năm trước",
    value: EQuantityOfTime.Year,
  },
  [EQuantityOfTime.PreYear]: {
    label: "Năm trước",
    description: `So với năm ${preYear}`,
    value: EQuantityOfTime.PreYear,
  },
  [EQuantityOfTime.FirstSixMonth]: {
    label: "6 tháng đầu năm",
    description: "So với 6 tháng đầu năm trước",
    value: EQuantityOfTime.FirstSixMonth,
  },
  [EQuantityOfTime.EndSixMonth]: {
    label: "6 tháng cuối năm",
    description: "So với 6 tháng cuối năm trước",
    value: EQuantityOfTime.EndSixMonth,
  },
};

export enum OrderUpdateAgentType {
  Check = "CHECK",
  Confirm = "CONFIRM",
}

export enum ESummaryOrder {
  totalMoneyDiscount = "Tổng tiền k.mãi",
  totalMoneyFinalOrder = "Tổng giá trị đơn",
  totalMoneyProductOrder = "Tổng tiền hàng",
  totalPaidPoint = "Tổng điểm sử dụng",
  totalShipFee = "Tổng tiền ship",
}

export enum OrderSyncChannel {
  KiotViet = "KIOT_VIET",
}

export const OrderSyncChannelTrans = {
  [OrderSyncChannel.KiotViet]: "Kiot Việt"
}
