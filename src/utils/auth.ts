import Cookies from "js-cookie";
import { toJS } from "mobx";
import { settings } from "settings";
import { permissionStore } from "store/permissionStore";
import { userStore } from "store/userStore";
import { Permission } from "types/role";

export const getToken = () => {
  const token = Cookies.get("token");

  return token || "";
};

export const setToken = (token: string) => {
  return Cookies.set("token", token);
};

export const checkRole = (role: string, permissions?: Permission[]) => {
  const find = permissions?.find((e) => e.path.includes(role));
  if (find) return true;
  return false;
};

export interface roleAction {
  create?: string;
  update?: string;
  view?: string;
  detail?: string;
  delete?: string;
  epxort?: string;
  import?: string;
  showHide?: string;
}

export const checkRoles = <T = {}>(
  roles: roleAction & T,
  permissions?: Permission[]
): {
  create?: boolean;
  update?: boolean;
  view?: boolean;
  detail?: boolean;
  delete?: boolean;
  epxort?: boolean;
  import?: boolean;
  showHide?: boolean;
} & T => {
  const finalRoles = Object.keys(roles)?.reduce<
    {
      create?: boolean;
      view?: boolean;
      update?: boolean;
      detail?: boolean;
      delete?: boolean;
      epxort?: boolean;
      import?: boolean;
      showHide?: boolean;
    } & T
  >((prev, curr) => {
    permissions = permissionStore.permissions || [];
    const find = permissions?.find((e) =>
      // @ts-ignore
      roles[curr].includes(e.path.substring(1))
    );
    if (!settings.checkPermission)
      return {
        ...prev,
        [curr]: true,
      };
    if (find)
      return {
        ...prev,
        [curr]: true,
      };
    return {
      ...prev,
      [curr]: false,
    };
    //@ts-ignore
  }, {});

  //@ts-ignore
  return finalRoles;
};
