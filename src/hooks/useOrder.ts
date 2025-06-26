import { orderApi } from "api/order.api";
import { useState } from "react";
import { Order } from "types/order";
import { QueryParam } from "types/query";

export interface OrderQuery extends QueryParam {}

interface UseOrderProps {
  initQuery: OrderQuery;
}

export const useOrder = ({ initQuery }: UseOrderProps) => {
  const [data, setData] = useState<Order[]>([]);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState<OrderQuery>(initQuery);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await orderApi.findAll(query);

      setData(data.orders);
      setTotal(data.total);
    } finally {
      setLoading(false);
    }
  };

  return {
    orders: data,
    totalOrder: total,
    fetchOrder: fetchData,
    loadingOrder: loading,
    setQueryOrder: setQuery,
    queryOrder: query,
  };
};
