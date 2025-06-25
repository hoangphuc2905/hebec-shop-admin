import { Form, FormItemProps, Input } from "antd";
import { TextAreaProps } from "antd/es/input";
import { requiredRule } from "../Input/InputFormField";
import { FormLabel } from "../FormLabel";

interface TextAreaFormFieldProps {
  isRequred?: boolean;
  formtemProps: FormItemProps;
  inputProps: TextAreaProps;
}

const TextAreaFormField = ({
  isRequred,
  formtemProps,
  inputProps,
}: TextAreaFormFieldProps) => {
  const { rules = [], ...propsFormItem } = formtemProps;
  const { className, ...propsInput } = inputProps;

  return (
    <Form.Item
      labelCol={{ span: 24 }}
      className="mb-0"
      rules={isRequred ? [requiredRule, ...rules] : rules}
      {...propsFormItem}
      required={isRequred}
      label={<FormLabel content={propsFormItem.label as string} />}
    >
      <Input.TextArea
        bordered
        className={[
          "border border-gray-400  focus:outline-none  input-no-shadow p-2 px-4",
          className,
        ].join(" ")}
        {...propsInput}
      ></Input.TextArea>
    </Form.Item>
  );
};

export default TextAreaFormField;
