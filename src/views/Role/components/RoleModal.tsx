import { Form, Input, message, Modal, Tree } from "antd";
import { Rule } from "antd/lib/form";
import TextArea from "antd/lib/input/TextArea";
import { roleApi } from "api/role.api";
import { usePermission } from "hooks/usePermission";
import { useEffect, useState } from "react";
import { roleDefault } from "store/permissionStore";
import { ModalStatus } from "types/modal";
import { Permission, Role } from "types/role";
import { Staff } from "types/staff";

const rules: Rule[] = [{ required: true, message: "Bắt buộc" }];

export const RoleModal = ({
  visible,
  status,
  role,
  onClose,
  onSubmitOk,
}: {
  visible: boolean;
  status: ModalStatus;
  role: Partial<Role>;
  onClose: () => void;
  onSubmitOk: () => void;
}) => {
  const [form] = Form.useForm<Staff>();
  const [loading, setLoading] = useState(false);

  const [checkedKeys, setCheckedKeys] = useState<string[] | number[]>([]);
  const { fetchPermissions, permissions, treeData } = usePermission();

  useEffect(() => {
    if (status == "create" && visible) {
      setCheckedKeys([]);
      form.resetFields();
    }
  }, [visible, status]);

  useEffect(() => {
    form.setFieldsValue({ ...role });
    generateSelectedKeys();
  }, [role]);

  useEffect(() => {
    fetchPermissions();
  }, []);

  const generateSelectedKeys = async () => {
    if (role.id) {
      const res = await roleApi.findOne(role.id);
      const permissions: Permission[] = res.data?.permissions;
      setCheckedKeys(permissions?.map((e) => e.id || 0));
    }

    console.log(checkedKeys);
  };

  const createData = async (data: any) => {
    setLoading(true);
    try {
      const res = await roleApi.create(data);
      const id = res.data.id;
      await roleApi.update(id, data);
      message.success("Tạo mới thành công");
      onClose();
      onSubmitOk();
    } finally {
      setLoading(false);
    }
  };

  const updateData = async (data: any) => {
    setLoading(true);
    try {
      const res = await roleApi.update(role?.id || 0, data);
      message.success("Cập nhật thành công");
      onClose();
      onSubmitOk();
    } finally {
      setLoading(false);
    }
  };

  console.log("TREE DATA: ", treeData);

  const handleSubmit = async () => {
    await form.validateFields();

    const data = {
      role: form.getFieldsValue(),
      //@ts-ignore
      permissionIds: checkedKeys.filter(
        (k: string | number) => typeof k == "number"
      ),
    };

    const newPermissionIds = permissions.reduce(
      //@ts-ignore
      (pre: number[], p: Permission) => {
        const id = p.id;
        if (roleDefault.includes(p.name)) {
          return [...pre, id];
        }
        return pre;
      },
      []
    );

    //Add role default
    //@ts-ignore
    data.permissionIds = [...data.permissionIds, ...newPermissionIds];

    console.log("New Permission: ", data);
    if (status == "create") {
      createData(data);
    } else {
      updateData(data);
    }
  };

  const onCheck = (checkedKeys: any, info: any) => {
    setCheckedKeys(checkedKeys);
  };

  return (
    <Modal
      maskClosable={false}
      onCancel={onClose}
      visible={visible}
      title={status == "create" ? "Tạo mới quyền" : "Cập nhật quyền"}
      style={{ top: 20 }}
      afterClose={() => {}}
      width={700}
      confirmLoading={loading}
      onOk={() => {
        handleSubmit();
      }}
    >
      <Form layout="vertical" form={form}>
        <Form.Item label="Tên quyền" name="name" rules={rules}>
          <Input placeholder="" />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <TextArea rows={3} />
        </Form.Item>

        {!role.isAdmin && (
          <Tree
            checkable
            onCheck={onCheck}
            //@ts-ignore
            treeData={treeData || []}
            checkedKeys={checkedKeys}
          ></Tree>
        )}
      </Form>
    </Modal>
  );
};
