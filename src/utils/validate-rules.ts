import { Rule } from "antd/lib/form";
export const phoneNumberRule: Rule = {
  pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
  message: "Số điện thoại sai định dạng.",
};

export const positiveNumberRule: Rule = {
  pattern: /^([1-9][0-9]*|0)$/,
  message: "Vui lòng nhập số nguyên dương",
};

export const requiredRule: Rule = {
  required: true,
  message: "Bắt buộc",
};
