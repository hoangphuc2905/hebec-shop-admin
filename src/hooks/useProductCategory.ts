import { productCategoryApi } from "api/productCategory.api";
import { useState } from "react";
import { ProductCategory } from "types/product-category";
import { QueryParam } from "types/query";

export interface ProductCategoryQuery extends QueryParam {}

interface UseProductCategoryProps {
  initQuery: ProductCategoryQuery;
}

export const useProductCategory = ({ initQuery }: UseProductCategoryProps) => {
  const [data, setData] = useState<ProductCategory[]>([]);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState<ProductCategoryQuery>(initQuery);
  const [loading, setLoading] = useState(false);

  const fetchData = async (newQuery?: ProductCategoryQuery) => {
    setLoading(true);
    try {
      const { data } = await productCategoryApi.findAll({
        ...query,
        ...newQuery,
      });


      setData(data.productCategories);
      setTotal(data.total);
    } finally {
      setLoading(false);
    }
  };

  return {
    productCategories: data,
    total,
    fetchData,
    loading,
    setQuery,
    query,
  };
};
