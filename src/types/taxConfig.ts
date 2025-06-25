import { Product } from "./product";

export interface TaxConfig {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  name: string;
  type: TaxConfigType;
  vatPercent: number; //% thuế. max 100%
  products: Product[];
}

export enum TaxConfigType {
  VAT = "VAT", //GTGT
  TTDB = "TTDBB", //thuế tiêu thụ đặc biệt
  TNDN = "TNDN", //thuế thu nhập doanh nghiệp
  NTVAT = "NTVAT", //GTGT,nước ngoài
}
