export interface ZNSParams {
  name: string;
  require: boolean;
  type: string;
  maxLength: number;
  minLength: number;
  acceptNull: boolean;
}

export interface ZNSTemplate {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  deletedAt: number;
  templateId: number;
  templateName: string;
  status: string;
  listParams: ZNSParams[];
  timeout: number;
  previewUrl: string;
  templateQuality: string;
  templateTag: string;
  price: string;
  applyTemplateQuota: boolean;
  templateDailyQuota: string;
  templateRemainingQuota: string;
}
