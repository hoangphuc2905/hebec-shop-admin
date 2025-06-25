import { Form, FormItemProps, Radio, RadioProps } from "antd";
import { requiredRule } from "../Input/InputFormField";
import { FormLabel } from "../FormLabel";
interface RadioFormFieldProps {
  isRequred?: boolean;
  formtemProps: FormItemProps;
  layout?: "vertical" | "horizontal";
  wrapperClassName?: string;
  options: any[];
  fieldName?: {
    value: (data: any) => any | any;
    label: (data: any) => any | any;
  };
}

const RadioFormField = ({
  wrapperClassName = "",
  isRequred,
  formtemProps,
  layout = "vertical",
  options,
}: RadioFormFieldProps) => {
  const { rules = [], ...propsFormItem } = formtemProps;
  const selectClassName =
    layout === "horizontal" ? "l-vertical  " : "l-horizontal";

  return (
    <Form.Item
      className={["radio-button-form-field mb-0", wrapperClassName].join(" ")}
      rules={isRequred ? [requiredRule, ...rules] : rules}
      {...propsFormItem}
      required={isRequred}
      label={<FormLabel content={propsFormItem.label as string} />}
    >
      <Radio.Group className={selectClassName} options={options}></Radio.Group>
    </Form.Item>
  );
};

export default RadioFormField;
