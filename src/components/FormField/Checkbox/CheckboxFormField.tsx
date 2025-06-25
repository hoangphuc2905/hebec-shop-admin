import { Checkbox, Form, FormItemProps, Radio, RadioProps } from "antd";
import { requiredRule } from "../Input/InputFormField";
import { FormLabel } from "../FormLabel";

interface CheckboxFormFieldProps {
  isRequred?: boolean;
  formtemProps: FormItemProps;
  layout?: "vertical" | "horizontal";
  wrapperClassName?: string;
  options: any[];
}

const CheckboxFormField = ({
  wrapperClassName,
  isRequred,
  formtemProps,
  layout = "vertical",
  options,
}: CheckboxFormFieldProps) => {
  const { rules = [], ...propsFormItem } = formtemProps;

  const selectClassName =
    layout === "vertical"
      ? "l-vertical  flex flex-col [&>label]:!ms-0"
      : "l-horizontal";

  return (
    <Form.Item
      className={["checkbox-form-field mb-0", wrapperClassName].join(" ")}
      rules={isRequred ? [requiredRule, ...rules] : rules}
      labelCol={{
        span: 24,
      }}
      {...propsFormItem}
      required={isRequred}
      label={<FormLabel content={propsFormItem.label as string} />}
    >
      <Checkbox.Group
        className={selectClassName}
        options={options}
      ></Checkbox.Group>
    </Form.Item>
  );
};

export default CheckboxFormField;
