import { customerApi } from "api/customer.api";
import { useCallback, useState } from "react";
import { Customer } from "types/customer";
import { QueryParam } from "types/query";

export interface CustomerQuery extends QueryParam {}

interface UseCustomerProps {
  initQuery: CustomerQuery;
}

export const useCustomer = ({ initQuery }: UseCustomerProps) => {
  const defaultQuery = { page: 1, limit: 10, search: "", ...initQuery };
  const [data, setData] = useState<Customer[]>([]);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState<CustomerQuery>(defaultQuery);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await customerApi.findAll(query);
      setData(data.data || data.customers || data.Customers || []);
      setTotal(data.total);
    } finally {
      setLoading(false);
    }
  }, [query]);

  return { data, total, fetchData, loading, setQuery, query };
};
