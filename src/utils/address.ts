import { City, District, Ward } from "types/address";

export const getAddress = (
  ward?: Ward,
  district?: District,
  city?: City,
  address?: string
) => {
  let arr = [
    address,
    ward?.nameWithType,
    district?.nameWithType,
    city?.nameWithType,
  ];

  arr = arr.filter((item) => item != undefined && item != ""); //remove undefine value

  return arr.join(", ");
};
