export enum ELang {
  VI = "vi",
  EN = "en",
}

export const getProductStatus = (status: boolean, lang: ELang) =>
  status ? ProductStatus.ACTIVE[lang] : ProductStatus.UNACTIVE[lang];

export const getProductHighlight = (highLight: boolean, lang: ELang) =>
  highLight ? ProductHighlight.ACTIVE[lang] : ProductHighlight.UNACTIVE[lang];

export const ProductStatus = {
  ACTIVE: {
    [ELang.VI]: "Hiển thị",
    [ELang.EN]: "Show",
  },
  UNACTIVE: {
    [ELang.VI]: "Ẩn",
    [ELang.EN]: "Hidden",
  },
};
export const ProductHighlight = {
  ACTIVE: {
    [ELang.VI]: "Bật",
    [ELang.EN]: "On",
  },
  UNACTIVE: {
    [ELang.VI]: "Tắt",
    [ELang.EN]: "Off",
  },
};

export const ProductColumnsTrans = {
  code: {
    [ELang.VI]: "Mã SP",
    [ELang.EN]: "Code",
  },
  name: {
    [ELang.VI]: "Tên SP",
    [ELang.EN]: "Name",
  },
  nameEn: {
    [ELang.VI]: "Tên SP (EN)",
    [ELang.EN]: "Name (EN)",
  },
  image: {
    [ELang.VI]: "Hình ảnh",
    [ELang.EN]: "Image",
  },
  images: {
    [ELang.VI]: "Hình ảnh khác (Phân biệt bởi dấu phẩy)",
    [ELang.EN]: "Images",
  },
  productCategory: {
    [ELang.VI]: "Danh mục sản phẩm",
    [ELang.EN]: "Product Category",
  },
  unitPrice: {
    [ELang.VI]: "Giá",
    [ELang.EN]: "Price",
  },
  videoUrl: {
    [ELang.VI]: "Link video sản phẩm",
    [ELang.EN]: "Product video link",
  },
  deliveryType: {
    [ELang.VI]: "Cách thức vận chuyển",
    [ELang.EN]: "Delivery Type",
  },
  description: {
    [ELang.VI]: "Mô tả",
    [ELang.EN]: "Description",
  },
  isActive: {
    [ELang.VI]: "Trạng thái hoạt động",
    [ELang.EN]: "Status",
  },
  isHighlight: {
    [ELang.VI]: "Nổi bật",
    [ELang.EN]: "Highlight",
  },
  storeIds: {
    [ELang.VI]: "Mã Cửa hàng (Phân biệt bởi dấu phẩy)",
    [ELang.EN]: "Store Ids",
  },
  category: {
    [ELang.VI]: "Danh mục (slug)",
    [ELang.EN]: "Highlight (Slug)",
  },
};

export const ProductColumnImport = {
  [ProductColumnsTrans.code[ELang.EN]]: "code",
  [ProductColumnsTrans.code[ELang.VI]]: "code",

  [ProductColumnsTrans.name[ELang.EN]]: "name",
  [ProductColumnsTrans.name[ELang.VI]]: "name",

  [ProductColumnsTrans.nameEn[ELang.EN]]: "nameEn",
  [ProductColumnsTrans.nameEn[ELang.VI]]: "nameEn",

  [ProductColumnsTrans.image[ELang.EN]]: "image",
  [ProductColumnsTrans.image[ELang.VI]]: "image",

  [ProductColumnsTrans.images[ELang.EN]]: "images",
  [ProductColumnsTrans.images[ELang.VI]]: "images",

  [ProductColumnsTrans.videoUrl[ELang.EN]]: "videoUrl",
  [ProductColumnsTrans.videoUrl[ELang.VI]]: "videoUrl",

  [ProductColumnsTrans.isActive[ELang.EN]]: "isActive",
  [ProductColumnsTrans.isActive[ELang.VI]]: "isActive",

  [ProductColumnsTrans.isHighlight[ELang.EN]]: "isHighlight",
  [ProductColumnsTrans.isHighlight[ELang.VI]]: "isHighlight",

  [ProductColumnsTrans.unitPrice[ELang.EN]]: "unitPrice",
  [ProductColumnsTrans.unitPrice[ELang.VI]]: "unitPrice",

  [ProductColumnsTrans.productCategory[ELang.EN]]: "productCategoryId",
  [ProductColumnsTrans.productCategory[ELang.VI]]: "productCategoryId",

  [ProductColumnsTrans.deliveryType[ELang.EN]]: "deliveryType",
  [ProductColumnsTrans.deliveryType[ELang.VI]]: "deliveryType",

  [ProductColumnsTrans.description[ELang.EN]]: "description",
  [ProductColumnsTrans.description[ELang.VI]]: "description",

  [ProductColumnsTrans.storeIds[ELang.EN]]: "storeIds",
  [ProductColumnsTrans.storeIds[ELang.VI]]: "storeIds",

  [ProductColumnsTrans.category[ELang.EN]]: "category",
  [ProductColumnsTrans.category[ELang.VI]]: "category",
};

export const CustomerColumnsImport = {
  ["Họ"]: "firstName",
  ["Tên"]: "lastName",
  ["Mật khẩu"]: "password",
  ["Số điện thoại"]: "phone",
  ["Email"]: "email",
  ["Ngày sinh"]: "dob",
  ["Giới tính"]: "gender",
  ["Địa chỉ"]: "address",
};
