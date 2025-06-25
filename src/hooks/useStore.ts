import { useState } from "react";
import { QueryParam } from "types/query";
import { Store } from "types/store";

export interface StoreQuery extends QueryParam {}

export const useStore = () => {
  const [data, setData] = useState<Store[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const setStores = (data: Store[]) => {
    setData(data);
  };

  const fetchData = async (query: StoreQuery, requiredStores?: Store[]) => {
    setLoading(true);
    // const { data } = await storeApi.findAll(query);
    // let stores: Store[] = data.stores;

    // if (requiredStores) {
    //   requiredStores.forEach((item) => {
    //     if (!stores.map((e) => e.id).includes(item.id)) {
    //       stores.unshift(item);
    //     }
    //   });
    // }

    // setData(data.stores);
    // setTotal(data.total);
    setLoading(false);
  };

  return {
    stores: data,
    totalStore: total,
    fetchStores: fetchData,
    setStores,
    storeLoading: loading,
  };
};
