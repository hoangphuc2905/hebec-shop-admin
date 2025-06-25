import { productApi } from "api/product.api";
import { useState } from "react";
import { Product } from "types/product";
import { QueryParam } from "types/query";

export interface ProductQuery extends QueryParam {}

interface UseProductProps {
  initQuery: ProductQuery;
}

export const useProduct = ({ initQuery }: UseProductProps) => {
  const [data, setData] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState<ProductQuery>(initQuery);
  const [loading, setLoading] = useState(false);

  const fetchData = async (newQuery?: ProductQuery) => {
    setLoading(true);
    try {
      const { data } = await productApi.findAll({ ...query, ...newQuery });

      setData(data.products);
      setTotal(data.total);
    } finally {
      setLoading(false);
    }
  };

  return { products: data, total, fetchData, loading, setQuery, query };
};
