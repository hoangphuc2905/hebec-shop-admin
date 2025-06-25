import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import { Customer } from "types/customer";

export const CustomerComponent = ({ customer }: { customer?: Customer }) => {
  return (
    <Space>
      <Avatar icon={<UserOutlined />} src={customer?.avatar} />
      <div>{`${customer?.lastName} ${customer?.firstName}`}</div>
    </Space>
  );
};
