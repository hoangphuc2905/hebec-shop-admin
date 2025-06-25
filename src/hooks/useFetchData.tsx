import { useEffect, useRef, useState } from "react";

export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  [params: string]: any;
}
interface HookProps {
  initialQuery: QueryParams;
  api: any;
  autoFetch?: boolean;
}

const useFetchData = <T,>({
  initialQuery,
  api,
  autoFetch = true,
}: HookProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const data = useRef<T>();
  const isMaxData = useRef<boolean>(false);
  const isMounted = useRef<boolean>(false);
  const [refreshState, setRefreshState] = useState<boolean>(false);
  const query = useRef<QueryParams>({
    page: 1,
    limit: 10,
    ...initialQuery,
  });

  const fetchData = async (
    newQuery?: QueryParams,
    cb?: (data: T, originData: any) => void
  ) => {
    try {
      const finalQuery = { ...query.current, ...newQuery };
      setLoading(true);
      const res = await api(finalQuery);
      const mainField = Object.keys(res.data)?.[0];
      if (
        mainField &&
        res.data[mainField]?.length < (query.current.limit as number)
      ) {
        isMaxData.current = true;
      } else {
        isMaxData.current = false;
      }
      if (cb) {
        await cb(res.data, data);
      } else {
        data.current = res.data;
      }
      return res.data;
    } catch (error) {
    } finally {
      //   if (isMounted.current) return;
      setLoading(false);
    }
  };
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  const refresh = () => {
    setRefreshState(!refreshState);
  };
  const clear = () => {
    query.current = { page: 1, limit: 10, ...initialQuery };
    isMaxData.current = false;
    data.current = undefined;
  };

  return {
    loading,
    data: data.current,
    query,
    fetchData,
    dataRef: data,
    isMaxData,
    setLoading,
    refresh,
    clear,
  };
};

export default useFetchData;
