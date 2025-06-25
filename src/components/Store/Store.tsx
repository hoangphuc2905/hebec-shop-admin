import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import React from "react";
import { Store as IStore } from "types/store";

export const Store = ({ data }: { data: IStore }) => {
  return (
    <Space>
      <Avatar icon={<UserOutlined />} src={data?.avatar} />
      <div>
        {data?.area?.name && <p>{data?.area?.name}</p>}
        {data?.name}
      </div>
    </Space>
  );
};
