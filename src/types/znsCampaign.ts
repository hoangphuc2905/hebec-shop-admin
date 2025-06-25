import { MessageTemplate } from "./message-template";
import { Store } from "./store";

export interface ZNSCampaignDetail {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  deletedAt: number;
  phone: string;
  orderCode: string;
  orderDate: string;
  orderMoney: number;
  znsCampaign: ZNSCampaign;
}

export interface ZNSCampaign {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  deletedAt: number;
  name: string;
  total: number;
  success: number;
  fail: number;
  sendAt: number;
  isSent: boolean;
  znsCampaignDetails: ZNSCampaignDetail[];
}

export interface ZnsMessageFee {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  deletedAt: number;
  userId: string;
  message: string;
}

export interface ZNSTemplate {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  deletedAt: number;
  templateId: number; //ID của template.
  templateName: string; //Tên của template.
  status: string; //Trạng thái template.
  listParams: { [key: string]: any }[]; //Danh sách các thuộc tính của template.
  timeout: number; //Thời gian timeout của template.
  previewUrl: string; //Đường dẫn đến bản xem trước của template.
  // templateQuality: TemplateQuantity//Chất lượng gửi tin hiện tại của template.
  // templateTag: TemplateTag//Loại nội dung của template.
  price: string; //Đơn giá của template.
  applyTemplateQuota: boolean; //Trường thông tin cho biết template có áp dụng hạn mức Daily Quota hay không.
  templateDailyQuota: string;
  templateRemainingQuota: string;
  store: Store;
  messageTemplates: MessageTemplate[];
}
