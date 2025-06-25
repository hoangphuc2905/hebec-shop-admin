import { EPermissions, RoleNames } from "router";
import { Permission } from "../types/role";
import { permissionStore } from "store/permissionStore";
import { toJS } from "mobx";
import { settings } from "settings";

type KeysUnion = keyof typeof RoleNames;

export type RoleType = Partial<Record<KeysUnion, boolean>>;

export const checkPermission = (permissionList: string[]) => {
  const fullData: RoleType = {};
  Object.keys(RoleNames).forEach((key) => {
    //@ts-ignore
    const permissionCheck = permissionList.includes(RoleNames[key]);

    //@ts-ignore
    fullData[key] = !settings.checkPermission ? true : permissionCheck;
  });

  return fullData;
};

export const checkHavePermission = (permission: EPermissions): boolean => {
  const permissions = permissionStore.packagePermissions;
  return permissions?.some((p) => p.name === permission);
};
