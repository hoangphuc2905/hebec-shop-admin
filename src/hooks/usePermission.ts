import { roleApi } from "api/role.api";
import { toJS } from "mobx";
import { useRef, useState } from "react";
import { Route } from "router";
import { permissionStore } from "store/permissionStore";
import { QueryParam } from "types/query";
import { Permission } from "types/role";
import { ITreeData } from "views/Product/components/ProductModal";
import { roleDefault } from "./../store/permissionStore";

export interface PermissionQuery extends QueryParam {}

const checkIsChildren = (permission: Permission, parent: string) => {
  return permission?.name.split("/")?.[1] == parent;
};

export const usePermission = () => {
  const [data, setData] = useState<Permission[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [treeData, setTreeData] = useState<ITreeData[]>([]);
  const selectKeysDefault = useRef<number[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await roleApi.getPermissionStore();
      const permissions: Permission[] = data;
      const treeData = handleGetTreeData(permissions);
      // console.log(treeData);
      setTreeData(treeData || []);
      setData(data);
      setTotal(data?.length);
    } finally {
      setLoading(false);
    }
  };

  const handleGetTreeData = (permissions: Permission[]) => {
    const permissionClone = [...permissions];
    console.log(
      "AccessRoutesForPackage: ",
      toJS(permissionStore.accessRoutesForPackage)
    );
    console.log("AccessRoutesForUser: ", toJS(permissionStore.accessRoutes));
    if (permissionClone) {
      const treeData = [...permissionStore.accessRoutesForPackage].map(
        (parentRoute) => {
          const currParent = { ...parentRoute };
          let finalData;
          const parent = currParent.name?.replace?.("/", "").trim();

          if (currParent.children) {
            const permissionExist: number[] = [];

            //Get tất cả những quyền con thuộc menu cha
            const treeChild = permissionClone?.filter((p, index) => {
              if (checkIsChildren(p, parent as string)) {
                p.key = p.id;
                permissionExist.push(index);
                return true;
              }
              return false;
            });

            //Lọc lại những quyền có trong menu
            //Và lọc những quyền chức năng
            const treeChildHasPermission = currParent.children.reduce(
              (preData: Route[], currChild: Route) => {
                if (currChild.checkIsAdmin) return preData;
                const currChildPath = currParent.name + "/" + currChild.name;
                if (currChild.hidden) return preData;
                if (roleDefault.includes(currChildPath)) return preData;
                const find = treeChild.find((c) => c.name == currChildPath);
                if (find) {
                  if (currChild.featureRoles) {
                    const featureChild: Permission[] = [];
                    treeChild.forEach((c) => {
                      const originName = c.name.split("/")[2];
                      const isFeature =
                        currChild.featureRoles?.includes(originName);
                      if (isFeature) {
                        featureChild.push(c);
                      }
                    });

                    find.children = featureChild;
                  }
                  //@ts-ignore
                  find.className = "hide-child";
                  return [...preData, find];
                }

                return preData;
              },
              []
            );

            //Cập nhật lại menu với key = id quyền => tạo cây quyền
            currParent.children = treeChildHasPermission || [];
            finalData = { ...currParent, key: undefined };

            // Xóa những quyền đã được thêm ( tối ưu cho vòng tiếp theo )
            // permissionExist.forEach((index) => {
            //   permissionClone.splice(index, 1);
            // });
          } else {
            const data = permissionClone.find((p) =>
              checkIsChildren(p, parent as string)
            );
            if (data) {
              finalData = { ...data, key: data.id };
            }
          }
          return finalData;
        }
      );
      return treeData.filter(Boolean) as ITreeData[];
    }
  };

  return {
    permissions: data,
    total,
    fetchPermissions: fetchData,
    handleGetTreeData: handleGetTreeData,
    loading,
    treeData,
  };
};
