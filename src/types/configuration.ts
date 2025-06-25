export enum ConfigurationParam {
  LimitChangeName = "LIMIT_CHANGE_NAME", //Giới hạn thay đổi họ tên khách hàng
  PopupInApp = "POPUP_IN_APP", //Popup khi mở app
  AllowMultiLang = "ALLOW_MULTI_LANG", //cho phép đa ngôn ngữ ở app
  MaxSizeUpload = "MAX_SIZE_UPLOAD", // tính bằng MB: 2 MB
  Zalo = "ZALO", // sdt support zalo (dành cho merchant)
  Messenger = "MESSENGER", // sdt support messenger (dành cho merchant)
  Facebook = "FACEBOOK", //link fb của berivina
  Youtube = "YOUTUBE", //link youtube của berivina
  Instagram = "INSTAGRAM", //link instagram của berivina
  Tiktok = "TIKTOK", //link tiktok của berivina
  Line = "LINE", //line app,
  EmailReceiveLead = "EMAIL_RECEIVE_LEAD", //email nhan mail lead
  ShipFeeFromFactory = "SHIP_FEE_FROM_FACTORY", // phí ship từ nhà máy
  ShipFeeFromStore = "SHIP_FEE_FROM_STORE", // phí ship từ cửa hàng
  PointRefundRate = "POINT_REFUND_RATE", //tỷ lệ hoàn điểm 0 -> 1 (100%)
  RewardPoint = "REWARD_POINT",
  RefRegisterPoint = "REF_REGISTER_POINT", //điểm hoa hồng từ cửa hàng
}

export const ConfigurationParamTrans = {
  [ConfigurationParam.ShipFeeFromFactory]: "Phí ship từ nhà máy",
  [ConfigurationParam.ShipFeeFromStore]: "Phí ship từ cửa hàng",
  [ConfigurationParam.PointRefundRate]: "Tỷ lệ hoàn điểm 0 -> 100%",
  [ConfigurationParam.RewardPoint]: "Số điểm nhận được khi đánh giá sản phẩm",
  [ConfigurationParam.RefRegisterPoint]:
    "Số điểm nhận được khi giới thiệu người dùng mới",
};

export enum ConfigurationDataType {
  Number = "NUMBER",
  String = "STRING",
}

export interface Configuration {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  param: ConfigurationParam;
  title: string;
  image: string;
  value: string;
  isEnable: boolean;
  dataType: ConfigurationDataType;
}
