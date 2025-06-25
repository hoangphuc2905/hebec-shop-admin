import { PlusOutlined } from "@ant-design/icons";
import { Button, Space, Spin, Table } from "antd";
import { Pagination } from "components/Pagination";
import { $isDev } from "constant";
import { useEffect, useState } from "react";
import { ModalStatus } from "types/modal";
import { Permission, Role } from "types/role";
import { getTitle } from "utils";
import { RoleModal } from "./components/RoleModal";
import { useHandlerRole } from "./handler/useHandlerRole";
import { Route, adminRoutes } from "router";
import { roleApi } from "api/role.api";
import { permissionStore } from "store/permissionStore";
import { toJS } from "mobx";
// import { RoleModal } from "./components/RoleModal";

const { ColumnGroup, Column } = Table;

export function RolePage({ title = "" }) {
  const {
    data,
    total,
    loading,
    query,
    fetchData,
    fetchPermissions,
    permissions: originPermissions,
  } = useHandlerRole({});
  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Partial<Role>>({});
  const [modalStatus, setModalStatus] = useState<ModalStatus>("create");
  const [loadingImport, setLoadingImport] = useState(false);

  useEffect(() => {
    document.title = getTitle(title);
    fetchPermissions();
    fetchData();
  }, []);

  console.log("PERMISSION: ", originPermissions);

  const getRouteData = (route: Route, parent?: Route) => {
    const concatName = parent ? parent.name + "/" + route?.name : route.name;

    return {
      name: concatName,
      description: route?.descrription,
      path: concatName,
      title: route?.title,
      id: originPermissions.find((p) => p.name == concatName)?.id || 0,
    };
  };
  const handleImportRoutes = async () => {
    //flat danh sách route theo menu
    const permissions = adminRoutes.reduce((prev: Route[], curr: Route) => {
      if (curr.children?.length) {
        const newChild = curr.children.map((c) => getRouteData(c, curr));
        return [...prev, ...toJS(newChild)];
      }
      return [...prev, toJS(getRouteData(curr))];
    }, []);

    setLoadingImport(true);
    await roleApi.importPermission({
      permissions,
    });
    fetchData();
    setLoadingImport(false);
  };

  return (
    <div>
      <div className="filter-container" style={{ marginBottom: "2em" }}>
        <Space>
          {$isDev && (
            <div className="filter-item btn">
              <Button
                onClick={handleImportRoutes}
                type="primary"
                icon={<PlusOutlined />}
              >
                Lấy danh sách import
              </Button>
            </div>
          )}

          <div className="filter-item btn">
            <Button
              onClick={() => {
                setVisibleModal(true);
                setModalStatus("create");
                setSelectedRole({});
              }}
              type="primary"
              icon={<PlusOutlined />}
            >
              Thêm mới
            </Button>
          </div>
        </Space>
      </div>

      <Spin spinning={loading}>
        <Table
          pagination={false}
          rowKey="id"
          dataSource={data}
          onRow={(r: Role) => {
            return {
              onClick: () => {
                setSelectedRole(r);
                setVisibleModal(true);
                setModalStatus("update");
              },
            };
          }}
        >
          <Column
            title="Quyền"
            dataIndex="name"
            render={(text) => (
              <span className="line-clamp-2" style={{ maxWidth: 300 }}>
                {text}
              </span>
            )}
          />
          <Column
            title="Mô tả"
            dataIndex="description"
            render={(text) => (
              <span className="line-clamp-2" style={{ maxWidth: 300 }}>
                {text}
              </span>
            )}
          />

          <Column
            title="Thao tác"
            key="action"
            render={(text, record: Role) => (
              <span>
                <Button
                  type="primary"
                  onClick={() => {
                    setSelectedRole(record);
                    setVisibleModal(true);
                    setModalStatus("update");
                  }}
                >
                  Cập nhật
                </Button>
              </span>
            )}
          />
        </Table>

        <Pagination
          currentPage={query.page}
          total={total}
          onChange={fetchData}
        />
      </Spin>

      <RoleModal
        onSubmitOk={fetchData}
        // permissions={originPermissions}
        onClose={() => setVisibleModal(false)}
        visible={visibleModal}
        role={selectedRole}
        status={modalStatus}
      />
    </div>
  );
}
