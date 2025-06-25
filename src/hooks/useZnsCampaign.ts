import { znsCampaignApi } from "api/znsCampaign.api";
import { useRef, useState } from "react";
import { ZNSCampaign } from "types/znsCampaign";
import { QueryParam } from "types/query";

export interface ZnsCampaignQuery extends QueryParam {}

interface UseZnsCampaignProps {
  initQuery: ZnsCampaignQuery;
}

export const useZnsCampaign = ({ initQuery }: UseZnsCampaignProps) => {
  const [data, setData] = useState<ZNSCampaign[]>([]);
  const [total, setTotal] = useState(0);
  // const [query, setQuery] = useState<ZnsCampaignQuery>(initQuery);
  const query = useRef<ZnsCampaignQuery>(initQuery);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await znsCampaignApi.findAll(query.current);

      setData(data.znsCampaigns);
      setTotal(data.total);
    } finally {
      setLoading(false);
    }
  };

  return {
    znsCampaigns: data,
    total,
    fetchData,
    loading,
    query: query.current,
  };
};
