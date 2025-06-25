export enum EPaymentStatus {
  Pending = "PENDING",
  Complete = "COMPLETE",
  Refund = "REFUND", //hoàn tiền
}

export const PaymentStatusTrans = {
  [EPaymentStatus.Pending]: {
    title: "Chờ thanh toán",
    color: "magenta",
    value: EPaymentStatus.Pending,
  },
  [EPaymentStatus.Complete]: {
    title: "Đã thanh toán",
    color: "green",
    value: EPaymentStatus.Complete,
  },
  [EPaymentStatus.Refund]: {
    title: "Hoàn tiền",
    color: "blue",
    value: EPaymentStatus.Refund,
  },
};
