import { useEffect, useState } from "react";
import { orderApi } from "api/order.api";

export function useOrderStatusCounts() {
  const [statusCounts, setStatusCounts] = useState<Record<string, number>>({});
  const [totalAll, setTotalAll] = useState(0);

  useEffect(() => {
    (async () => {
      // Lấy tất cả đơn hàng (giới hạn lớn, hoặc gọi API tổng hợp nếu có)
      const res = await orderApi.findAll({ page: 1, limit: 10000 });
      const orders = res.data.orders;
      const counts: Record<string, number> = {};
      orders.forEach((order: any) => {
        counts[order.status] = (counts[order.status] || 0) + 1;
      });
      setStatusCounts(counts);
      setTotalAll(res.data.total);
    })();
  }, []);

  return { statusCounts, totalAll };
}