import { Permission } from "./../../../types/role";
import { useState } from "react";
import { Form, message } from "antd";
import { roleApi } from "api/role.api";
import { useFetchTableData } from "hooks/useFetchTableData";
import { QueryParam } from "types/query";
import { Role } from "types/role";

interface Props {
  initQuery?: QueryParam;
}

export function useHandlerRole({ initQuery = {} as QueryParam }: Props) {
  const [form] = Form.useForm<Role>();
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const fetch = useFetchTableData<Role>({
    initQuery,
    queryFunc: async (query) => {
      const res = await roleApi.findAll(query);
      return { data: res.data, total: res.data.length };
    },
    createFunc: async () => {
      await form!.validateFields();
      const data = {
        role: form!.getFieldsValue(),
      };
      await roleApi.create(data);
      message.success("Tạo mới thành công!");
    },
    editFunc: async (id, data) => {
      await roleApi.update(id, data);
      message.success("Cập nhật thành công!");
    },
  });

  const fetchPermissions = async () => {
    const res = await roleApi.getPermissionStore();
    setPermissions(res.data);
  };

  const editData = async (id: number, permissionIds: number[]) => {
    try {
      fetch.setLoading(true);
      await form!.validateFields();
      const data = {
        role: form!.getFieldsValue(),
        permissionIds,
      };
      await fetch.editData(id, data);
    } finally {
      fetch.setLoading(false);
    }
  };

  return {
    ...fetch,
    form,
    editData,
    fetchPermissions,
    permissions,
  };
}
