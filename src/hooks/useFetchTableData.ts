import { result } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { QueryParam } from "types/query";

interface Props<S> {
  initQuery: S;
  queryFunc: (query: S, api?: any) => Promise<{ data: any; total: number }>;
  deleteFunc?: (id: number) => Promise<any>;
  createFunc?: (data: any, isGetDataOnly?: boolean) => Promise<any>;
  editFunc?: (id: number, data: any, isGetDataOnly?: boolean) => Promise<any>;
}

export function useFetchTableData<T = any, S = QueryParam>({
  initQuery,
  queryFunc,
  deleteFunc,
  createFunc,
  editFunc,
}: Props<S>) {
  const query = useRef<S>({ ...initQuery });
  const [data, setData] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = async (newQuery?: Partial<S>, api?: any) => {
    try {
      setLoading(true);
      const queryParams = { ...query.current, ...newQuery };
      const res = await queryFunc(queryParams, api);
      query.current = queryParams;
      setData(res.data);
      setTotal(res.total);
    } finally {
      setLoading(false);
    }
  };

  const endData = async (id: number) => {
    try {
      setLoading(true);
      await deleteFunc?.(id);
    } finally {
      fetchData();
      setLoading(false);
    }
  };

  const createData = async (dataCreate?: any, isGetDataOnly?: boolean) => {
    try {
      setLoading(true);
      console.log(dataCreate, isGetDataOnly);

      // debugger;
      const result = await createFunc?.(dataCreate, isGetDataOnly);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const editData = async (
    id: number,
    dataEdit?: any,
    isGetDataOnly?: boolean
  ) => {
    try {
      setLoading(true);
      const result = await editFunc?.(id, dataEdit, isGetDataOnly);
      return result;
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    total,
    loading,
    setLoading,
    query: query.current,
    fetchData,
    endData: endData,
    createData,
    editData,
    setData,
  };
}
