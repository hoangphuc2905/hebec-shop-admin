export enum InputType {
  Input = "INPUT",
  Checkbox = "CHECKBOX",
  Radio = "RADIO",
  Select = "SELECT",
}

export const InputTypeTrans = {
  [InputType.Input]: {
    title: "Input",
    value: InputType.Input,
    color: "green",
  },
  [InputType.Checkbox]: {
    title: "Checkbox",
    value: InputType.Checkbox,
    color: "orange",
  },
  [InputType.Radio]: {
    title: "Radio",
    value: InputType.Radio,
    color: "geekblue",
  },
  [InputType.Select]: {
    title: "Select",
    value: InputType.Select,
    color: "magenta",
  },
};

export interface OrderCustomField {
  id: number;
  createdAt: number;
  updatedAt: number;
  isDeleted: boolean;
  label: string;
  inputType: InputType;
  dataInputType?: any;
  require: boolean;
  enabled: boolean;
}
