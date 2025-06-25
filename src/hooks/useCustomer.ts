import { customerApi } from "api/customer.api";
import { useState } from "react";
import { Customer } from "types/customer";
import { QueryParam } from "types/query";

export interface CustomerQuery extends QueryParam {}

interface UseCustomerProps {
  initQuery: CustomerQuery;
}

export const useCustomer = ({ initQuery }: UseCustomerProps) => {
  const [data, setData] = useState<Customer[]>([]);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState<CustomerQuery>(initQuery);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await customerApi.findAll(query);

      setData(data.Customers);
      setTotal(data.total);
    } finally {
      setLoading(false);
    }
  };

  return { Customers: data, total, fetchData, loading, setQuery };
};
