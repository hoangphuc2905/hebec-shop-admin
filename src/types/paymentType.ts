import {
  CreditCardOutlined,
  InboxOutlined,
  PoundCircleOutlined,
} from "@ant-design/icons";

export enum EPaymentType {
  COD = "COD", //thanh toán khi nhận hàng
  Online = "ONLINE", //thanh toán online
  Balance = "BALANCE", //thanh toán bằng điểm
}

export const PaymentTypeTrans = {
  [EPaymentType.Balance]: {
    title: "Thanh toán bằng điểm",
    color: "magenta",
    shortTitle: "Điểm",
    value: EPaymentType.Balance,
    icon: PoundCircleOutlined,
  },
  [EPaymentType.COD]: {
    title: "Thanh toán khi nhận hàng",
    color: "blue",
    shortTitle: "COD",

    value: EPaymentType.COD,
    icon: InboxOutlined,
  },
  [EPaymentType.Online]: {
    title: "Thanh toán online",
    color: "green",
    shortTitle: "Online",

    value: EPaymentType.Online,
    icon: CreditCardOutlined,
  },
};

export interface PaymentType {
  id: number;

  name: string;
  type: EPaymentType;
  isVisible: boolean;
}
