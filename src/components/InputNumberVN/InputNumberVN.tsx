import { Input } from "antd";
import NumberFormat, { NumberFormatProps } from "react-number-format";

interface InputNumber2 extends NumberFormatProps {
  onChange?: (number: any) => void;
  onBlur?: (number: any) => void;
  onChangeOk?: (val: number) => void;
  value?: number;
}

//Format number 10000.5 => 10.000,5
export const InputNumberVN = ({
  value,
  onChangeOk,
  onChange,
  onBlur,
  ...props
}: InputNumber2) => {
  return (
    <NumberFormat
      displayType={"input"}
      thousandSeparator={"."}
      decimalSeparator={","}
      //@ts-ignore
      customInput={Input}
      onValueChange={(val, source) => {
        if (source.source == "event") {
          onChangeOk?.(val?.floatValue || 0);
          onChange?.(val?.floatValue);
        }
      }}
      onBlur={(e) => {
        onBlur?.(e.target.value.trim() || 0);
      }}
      value={value?.toString().replace(".", ",")}
      {...props}
    />
  );
};
