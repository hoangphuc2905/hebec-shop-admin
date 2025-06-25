import { EOnlinePayment } from "types/online-payment";
import { Order } from "types/order";

export const getTransferContent = (order: Order) => {
  return `THANHTOAN ${order?.code} ${order?.receiverPhone}`;
};

export const OnlinePaymentInfo = ({ order }: { order: Order }) => {
  if (!order?.onlinePayment) return <></>;

  if (order?.onlinePayment?.type == EOnlinePayment.Bank) {
    return (
      <>
        <p className="mb-0 line-clamp-2" style={{ maxWidth: 340 }}>
          Tên ngân hàng:{" "}
          <span style={{ fontWeight: "normal", whiteSpace: "normal" }}>
            {order?.onlinePayment?.name}
          </span>
        </p>
        <p className="mb-0">
          Số tài khoản:{" "}
          <span style={{ fontWeight: "normal" }}>
            {order?.onlinePayment?.bankNumber}
          </span>
        </p>
        <p className="mb-0">
          Chủ tài khoản:{" "}
          <span style={{ fontWeight: "normal" }}>
            {order?.onlinePayment?.ownerName}
          </span>
        </p>
        <p className="mb-0">
          Nội dung chuyển khoản:{" "}
          <span style={{ fontWeight: "normal", whiteSpace: "normal" }}>
            {getTransferContent(order)}
          </span>
        </p>
      </>
    );
  }

  if (order?.onlinePayment.type == EOnlinePayment.Wallet) {
    return (
      <div>
        <p className="mb-0">
          Tên ví:{" "}
          <span style={{ fontWeight: "normal" }}>
            {order?.onlinePayment?.ownerName}
          </span>
        </p>
        <p className="mb-0">
          Số hiệu ví:{" "}
          <span style={{ fontWeight: "normal" }}>
            {order?.onlinePayment?.bankNumber}
          </span>
        </p>
        <p className="mb-0">
          Nội dung chuyển khoản:{" "}
          <span style={{ fontWeight: "normal" }}>
            {getTransferContent(order)}
          </span>
        </p>
      </div>
    );
  }

  return <></>;
};
