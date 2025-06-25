import { sessionDeviceApi } from "api/sessionDevice.api";
import { useEffect, useState } from "react";

import { QueryParam } from "types/query";

export interface SessionDeviceQuery extends QueryParam {}

interface UseSessionDeviceProps {
  initQuery: SessionDeviceQuery;
}

export const useSessionDevice = ({ initQuery }: UseSessionDeviceProps) => {
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState<SessionDeviceQuery>(initQuery);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.employeeId) {
      fetchData();
    }
  }, [query]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await sessionDeviceApi.findAll(query);

      setData(data.sessionDevices);
      setTotal(data.total);
    } finally {
      setLoading(false);
    }
  };

  return { sessionDevices: data, total, fetchData, loading, setQuery };
};
