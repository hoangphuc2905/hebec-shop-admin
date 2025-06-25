import { Drawer, FormInstance, List, Row, Typography } from "antd";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { CheckCircleOutlined } from "@ant-design/icons";

export interface SelectDropdownRef {
  open: (data: any) => void;
  close: () => void;
}

export interface DropdownFieldName {
  value: (data: any) => any | any;
  label: (data: any) => any | any;
}

interface Props {
  options: any[];
  title: string | React.ReactNode;
  form: FormInstance;
  name: any;
  onSelect: (value: any, data: any) => void;
  fieldName?: DropdownFieldName;
}
const SelectDropdown = forwardRef(
  (
    {
      onSelect,
      options,
      title,
      name,
      form,
      //@ts-ignore
      fieldName = { value: "value", label: "label" },
    }: Props,
    ref
  ) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const data = useRef<any>();
    const handleOnOpen = (newData: any) => {
      data.current = newData;
      setIsOpen(true);
    };
    const handleOnClose = () => {
      data.current = undefined;
      setIsOpen(false);
    };

    useImperativeHandle(
      ref,
      () => ({
        open: handleOnOpen,
        close: handleOnClose,
      }),
      []
    );
    return (
      <Drawer
        className="pb-safe rounded-tl-lg rounded-tr-lg"
        placement="bottom"
        title={<div className="text-center font-bold text-lg">{title}</div>}
        closable={false}
        visible={isOpen}
        bodyStyle={{
          margin: 0,
          padding: 0,
          paddingLeft: 20,
          paddingRight: 20,
        }}
        onClose={handleOnClose}
      >
        <List
          dataSource={options}
          renderItem={(item) => {
            const isValueFunc = typeof fieldName.value == "function";
            const isLabelFunc = typeof fieldName.value == "function";

            const value = isValueFunc
              ? fieldName.value(item)
              : //@ts-ignore
                item[fieldName.value as string];
            const label = isLabelFunc
              ? fieldName.label(item)
              : //@ts-ignore
                item[fieldName.label as string];

            return (
              <List.Item
                key={value}
                onClick={() => {
                  onSelect(value, item);
                }}
              >
                <Row justify="space-between" className="w-full">
                  <Typography.Text className="font-semibold">
                    {label}
                  </Typography.Text>
                  {form.getFieldValue(name) == value && <CheckCircleOutlined />}
                </Row>
              </List.Item>
            );
          }}
        />
      </Drawer>
    );
  }
);

export default SelectDropdown;
