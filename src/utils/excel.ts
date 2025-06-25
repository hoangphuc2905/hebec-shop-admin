import { result } from "lodash";
import { DeliveryType } from "types/deliveryType";
import { PaymentType } from "types/paymentType";
import { ProductPricingTypeTrans, ProductTypeTrans } from "types/product";
import { TaxConfig } from "types/taxConfig";

export const findPricingType = (type: string) => {
  const find = Object.values(ProductPricingTypeTrans).find(
    (pricingType) => pricingType.title == type
  );
  return find?.value;
};

export const findProductType = (typeText: string) => {
  const find = Object.values(ProductTypeTrans).find(
    (type) => type.title == typeText
  );
  return find?.value;
};

export const findPaymentTypeIds = (
  value: string,
  paymentTypes: PaymentType[]
) => {
  let resultArr: number[] = [];
  const valueArr = value.split(",");
  valueArr.forEach((value) => {
    const find = paymentTypes.find(
      (e) => e.name.toLowerCase() == value.trim().toLocaleLowerCase()
    );
    if (find?.id) {
      resultArr.push(find.id);
    }
  });

  return resultArr;
};

export const findDeliveryTypeIds = (
  value: string,
  deliveryList: DeliveryType[]
) => {
  let resultArr: number[] = [];
  const valueArr = value.split(",");
  valueArr.forEach((value) => {
    const find = deliveryList.find(
      (e) => e.name.toLowerCase() == value.trim().toLocaleLowerCase()
    );
    if (find?.id) {
      resultArr.push(find.id);
    }
  });

  return resultArr;
};

export const findTaxConfigIds = (value: string, taxConfigs: TaxConfig[]) => {
  let resultArr: number[] = [];
  const valueArr = value.split(",");

  valueArr.forEach((value) => {
    // debugger;

    const find = taxConfigs.find((e) => e.type == value.trim());
    if (find?.id) {
      resultArr.push(find.id);
    }
  });

  return resultArr;
};
