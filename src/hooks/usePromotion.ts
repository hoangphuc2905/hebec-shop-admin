import { Form, message } from "antd";
import { promotionCampaignApi } from "api/promotion-campaign.api";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PromotionCampaign,
  PromotionCampaignDetail,
} from "types/promotion-campaign";
import { QueryParam } from "types/query";

export interface PromotionQuery extends QueryParam {}

interface UsePromotionProps {
  initQuery?: PromotionQuery;
}

interface PromotionCampaignDetailData {
  id: number | null;
  isGift: boolean;
  productId: number;
  quantity?: number;
  needed?: number;
  finalPrice: number;
  price: number;
}

const handleUpdatePromotionDetailId = (
  data: PromotionCampaignDetailData[],
  oldData: PromotionCampaignDetail[]
) => {
  if (!oldData.length) return data;
  const newData = data.map((item) => {
    return {
      ...item,
      id:
        oldData.find(
          (old) => old.product.id == item.productId && old.isGift == item.isGift
        )?.id || 0,
    };
  });

  return newData;
};

export const getPromotionCampaignDetailData = (
  promotionProduct: PromotionCampaignDetail
) => {
  const data: PromotionCampaignDetailData = {
    isGift: !!promotionProduct.isGift,
    price: 0,
    finalPrice: 0,
    productId: promotionProduct?.product?.id,
    id: promotionProduct?.promotionCampaignDetailId || 0,
    quantity: promotionProduct.quantity || 1,
    needed: promotionProduct.needed || 1,
  };

  return data;
};

export const getPromotionCampaignDetail = (
  promotionProducts: PromotionCampaignDetail[]
) => {
  let promotionCampaignDetail: PromotionCampaignDetailData[] = [];

  promotionProducts.forEach((promotionProduct) => {
    const detail = getPromotionCampaignDetailData(promotionProduct);
    promotionCampaignDetail.push(detail);
  });
  return promotionCampaignDetail;
};

export const usePromotion = ({
  initQuery = { page: 1, limit: 10 },
}: UsePromotionProps) => {
  const navigate = useNavigate();
  const [form] = Form.useForm<
    PromotionCampaign & {
      oldPromotionCampaignDetails: PromotionCampaignDetail[];
    }
  >();
  const [data, setData] = useState<PromotionCampaign[]>([]);
  const [detail, setDetail] = useState<PromotionCampaign>();
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState<PromotionQuery>(initQuery);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await promotionCampaignApi.findAll(query);
      setData(data.promotions);
      setTotal(data.total);
    } finally {
      setLoading(false);
    }
  };

  const getDetail = async (promotionId: number) => {
    setLoading(true);
    try {
      const { data } = await promotionCampaignApi.findOne(promotionId);
      console.log(data.total);
      if (data.id) {
        setDetail(data);
        setTotal(data.total);
      } else {
        navigate("/campaign/promotion");
      }
    } finally {
      setLoading(false);
    }
  };

  const createData = async () => {
    await form.validateFields();
    const data = getFormData();
    data.promotionCampaignDetails;
    // debugger;
    try {
      setLoading(true);
      await promotionCampaignApi.create(data);
      message.success("Đã tạo chương trình mới");
      form.resetFields();
    } finally {
      setLoading(false);
    }
  };

  const updateData = async (id: number) => {
    await form.validateFields();
    const data = getFormData();
    //Cập nhật lại promotion campaign detail đã có id trước đó
    console.log(form.getFieldValue("oldPromotionCampaignDetails"));
    data.promotionCampaignDetails = handleUpdatePromotionDetailId(
      data.promotionCampaignDetails,
      form.getFieldValue("oldPromotionCampaignDetails") || []
    );
    console.log(form.getFieldsValue());
    // debugger;

    try {
      setLoading(true);
      await promotionCampaignApi.update(id, data);
      message.success("Đã cập nhật chương trình");
      form.resetFields();
    } finally {
      setLoading(false);
    }
  };

  const getFormData = () => {
    const {
      couponCampaignId,
      promotionCampaignDetails,
      giftsDetails,
      ...promotionCampaign
    } = form.getFieldsValue();
    console.log(form.getFieldsValue());

    promotionCampaign.startAt = promotionCampaign.isStartNow
      ? moment().unix()
      : //@ts-ignore
        promotionCampaign?.startAt?.unix();

    //@ts-ignore
    promotionCampaign.endAt = promotionCampaign.endAt.unix();

    const promotionCampaignDetailsData = getPromotionCampaignDetail([
      ...(promotionCampaignDetails || []),
      ...(giftsDetails || []),
    ]);

    console.log(promotionCampaignDetailsData);

    return {
      promotionCampaign,
      promotionCampaignDetails: promotionCampaignDetailsData,
      couponCampaignId,
    };
  };

  return {
    form,
    promotions: data,
    total,
    detailPromotion: detail,
    loading,
    fetchData,
    getDetailPromotion: getDetail,
    setQuery,
    createPromotion: createData,
    updatePromotion: updateData,
  };
};
