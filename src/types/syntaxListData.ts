import { EMessageTemplateItemType } from "./message-template";

export const syntaxListData: any[] = [
  {
    syntax: "{ma_don_hang}",
    content: "Mã đơn hàng",
    prop: "code",
  },
  {
    syntax: "{ten_cua_hang}",
    content: "Tên cửa hàng",
    prop: "store.name",
  },
  {
    syntax: "{so_diem_thuong}",
    content: "Số điểm thưởng",
    prop: "point",
  },
  {
    syntax: "{ten_san_pham}",
    content: "Tên sản phẩm",
    prop: "product.name",
  },
  {
    syntax: "{ten_chien_dich}",
    content: "Tên chiến dịch",
    prop: "couponCampaign.name",
  },
  {
    syntax: "{ten_nguoi_duoc_chia_se}",
    content: "Tên người được chia sẻ",
    prop: "refCustomer.name",
  },
];

export const syntaxListDataForTemplate: any = {
  [EMessageTemplateItemType.RateOrder]: [
    {
      syntax: "{ma_don_hang}",
      content: "Mã đơn hàng",
      prop: "code",
    },
    {
      syntax: "{ten_cua_hang}",
      content: "Tên cửa hàng",
      prop: "store.name",
    },
    {
      syntax: "{so_diem_thuong}",
      content: "Số điểm thưởng",
      prop: "point",
    },
  ],
  [EMessageTemplateItemType.OrderReturnRefund]: [
    {
      syntax: "{ma_don_hang}",
      content: "Mã đơn hàng",
      prop: "code",
    },
  ],
  [EMessageTemplateItemType.OrderCancel]: [
    {
      syntax: "{ma_don_hang}",
      content: "Mã đơn hàng",
      prop: "code",
    },
  ],
  [EMessageTemplateItemType.OrderComplete]: [
    {
      syntax: "{ma_don_hang}",
      content: "Mã đơn hàng",
      prop: "code",
    },
    {
      syntax: "{ten_cua_hang}",
      content: "Tên cửa hàng",
      prop: "store.name",
    },
  ],
  [EMessageTemplateItemType.OrderDelivering]: [
    {
      syntax: "{ma_don_hang}",
      content: "Mã đơn hàng",
      prop: "code",
    },
  ],
  [EMessageTemplateItemType.OrderProcessing]: [
    {
      syntax: "{ma_don_hang}",
      content: "Mã đơn hàng",
      prop: "code",
    },
    {
      syntax: "{ten_cua_hang}",
      content: "Tên cửa hàng",
      prop: "store.name",
    },
  ],
  [EMessageTemplateItemType.OrderConfirm]: [
    {
      syntax: "{ma_don_hang}",
      content: "Mã đơn hàng",
      prop: "code",
    },
    {
      syntax: "{ten_cua_hang}",
      content: "Tên cửa hàng",
      prop: "store.name",
    },
  ],
  [EMessageTemplateItemType.OrderPending]: [
    {
      syntax: "{ma_don_hang}",
      content: "Mã đơn hàng",
      prop: "code",
    },
    {
      syntax: "{ten_cua_hang}",
      content: "Tên cửa hàng",
      prop: "store.name",
    },
  ],
  [EMessageTemplateItemType.RemindOrder]: [
    {
      syntax: "{ten_cua_hang}",
      content: "Tên cửa hàng",
      prop: "store.name",
    },
    {
      syntax: "{ten_san_pham}",
      content: "Tên sản phẩm",
      prop: "product.name",
    },
  ],
  [EMessageTemplateItemType.InviteAppZaloOA]: [
    {
      syntax: "{ten_cua_hang}",
      content: "Tên cửa hàng",
      prop: "store.name",
    },
  ],
  [EMessageTemplateItemType.ReferralOrder]: [
    {
      syntax: "{ten_cua_hang}",
      content: "Tên cửa hàng",
      prop: "store.name",
    },
    {
      syntax: "{ten_san_pham}",
      content: "Tên sản phẩm",
      prop: "product.name",
    },
    {
      syntax: "{so_diem_thuong}",
      content: "Số điểm thưởng",
      prop: "point",
    },
    {
      syntax: "{ten_nguoi_duoc_chia_se}",
      content: "Tên người được chia sẻ",
      prop: "refCustomer.name",
    },
  ],
  [EMessageTemplateItemType.ReferralRegister]: [
    {
      syntax: "{ten_cua_hang}",
      content: "Tên cửa hàng",
      prop: "store.name",
    },
    {
      syntax: "{so_diem_thuong}",
      content: "Số điểm thưởng",
      prop: "point",
    },
    {
      syntax: "{ten_nguoi_duoc_chia_se}",
      content: "Tên người được chia sẻ",
      prop: "refCustomer.name",
    },
  ],
  [EMessageTemplateItemType.ReceivePointOrder]: [
    {
      syntax: "{ten_cua_hang}",
      content: "Tên cửa hàng",
      prop: "store.name",
    },
    {
      syntax: "{so_diem_thuong}",
      content: "Số điểm thưởng",
      prop: "point",
    },
    {
      syntax: "{ma_don_hang}",
      content: "Mã đơn hàng",
      prop: "code",
    },
  ],
  [EMessageTemplateItemType.CouponBirthday]: [
    {
      syntax: "{ten_cua_hang}",
      content: "Tên cửa hàng",
      prop: "store.name",
    },
  ],
  [EMessageTemplateItemType.CouponRegister]: [
    {
      syntax: "{ten_cua_hang}",
      content: "Tên cửa hàng",
      prop: "store.name",
    },
  ],
};
