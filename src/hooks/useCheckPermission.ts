import { EPermissions } from "router";
import { permissionStore } from "store/permissionStore";

export const useCheckPermission = (permissionName: EPermissions) => {
  const permissions = permissionStore.permissions;

  const isHavePermission = !!permissions?.find(
    (item) => item.name == permissionName
  );

  return { permissions, isHavePermission };
};
