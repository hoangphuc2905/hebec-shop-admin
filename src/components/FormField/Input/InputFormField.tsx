import { Form, FormItemProps, Input, InputProps } from "antd";
import { Rule } from "rc-field-form/lib/interface";
import { FormLabel } from "../FormLabel";

interface InputFormFieldProps {
  isRequred?: boolean;
  formtemProps: FormItemProps;
  inputProps: InputProps;
}

export const requiredRule: Rule = {
  required: true,
  message: "Bắt buộc!",
};

const InputFormField = ({
  isRequred,
  formtemProps,
  inputProps,
}: InputFormFieldProps) => {
  const { rules = [], ...propsFormItem } = formtemProps;
  const { className, type, ...propsInput } = inputProps;

  const MyInput = type == "password" ? Input.Password : Input;
  return (
    <Form.Item
      labelCol={{ span: 24 }}
      className="mb-0"
      rules={
        isRequred
          ? [
              requiredRule,
              {
                validator: (_, value) => {
                  if (value && value?.trim() == "") {
                    return Promise.reject("Bắt buộc!");
                  }

                  return Promise.resolve();
                },
              },
              ...rules,
            ]
          : rules
      }
      {...propsFormItem}
      required={isRequred}
      label={<FormLabel content={propsFormItem.label as string} />}
    >
      <MyInput
        bordered
        className={[
          "border border-gray-400  focus:outline-none  input-no-shadow p-2 px-4",
          className,
        ].join(" ")}
        {...propsInput}
      ></MyInput>
    </Form.Item>
  );
};

export default InputFormField;
