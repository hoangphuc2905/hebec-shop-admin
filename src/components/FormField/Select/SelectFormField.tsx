import { Form, FormInstance, FormItemProps, Select, SelectProps } from "antd";
import { FormLabel } from "../FormLabel";
import { requiredRule } from "../Input/InputFormField";

interface SelectFormFieldProps {
  isRequred?: boolean;
  formtemProps: FormItemProps;
  selectProps: SelectProps;
  form: FormInstance;
}

const SelectFormField = ({
  isRequred,
  formtemProps,
  selectProps,
}: SelectFormFieldProps) => {
  const { rules = [], ...propsFormItem } = formtemProps;
  const { className, ...propsInput } = selectProps;

  return (
    <>
      <Form.Item
        className="mb-2"
        rules={isRequred ? [requiredRule, ...rules] : rules}
        {...propsFormItem}
        required={isRequred}
        label={<FormLabel content={propsFormItem.label as string} />}
      >
        <Select
          {...propsInput}
          className={[
            "border-none focus:outline-none input-no-shadow py-0",
            className,
          ].join(" ")}
        ></Select>
      </Form.Item>
    </>
  );
};

export default SelectFormField;
