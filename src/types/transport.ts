export enum TransportServiceType {
  Standard = "STANDARD",
  Economy = "ECONOMY",
  Express = "EXPRESS",
}

export const TransportTrans = {
  [TransportServiceType.Standard]: {
    value: TransportServiceType.Standard,
    title: "Nhanh",
    color: "#19A7CE",
  },
  [TransportServiceType.Economy]: {
    value: TransportServiceType.Economy,
    title: "Tiết Kiệm",
    color: "#1ed6ce",
  },
  [TransportServiceType.Express]: {
    value: TransportServiceType.Express,
    title: "Hỏa Tốc",
    color: "#fd7321",
  },
};

export const TransportConfig = [
  "Kích hoạt đơn vị vận chuyển này",
  "Kích hoạt COD",
];

export interface Transport {
  id: number;
  type: TransportServiceType;
  name: string;
  isEnabled: boolean;
  isCOD: boolean;
  maxHeight: number;
  minHeight: number;
  maxWidth: number;
  minWidth: number;
  minWeight: number;
  maxWeight: number;
  minLength: number;
  maxLength: number;
}

export interface TransportConfig {
  createdAt: number;
  deletedAt: number;
  id: number;
  isCOD: boolean;
  isDeleted: boolean;
  isEnabled: boolean;
  transport: Transport;
  transport_token: string;
  updatedAt: number;
}
