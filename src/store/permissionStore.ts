import { RoleType, checkPermission } from "./../utils/permission";
import { message } from "antd";
import { cloneDeep } from "lodash";
import { makeAutoObservable, toJS } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { EPermissions, Route, adminRoutes } from "router";
import { settings } from "settings";
import { Permission } from "types/role";
import { userStore } from "./userStore";

export const roleDefault = ["/staff/profile", "/staff/store-profile"];
const handleGetRouter = (
  router: Route,
  permissions: EPermissions[],
  parentName?: string
) => {
  if (router.checkIsAdmin && !permissionStore.isAdmin) {
    return undefined;
  }
  const isHasPermission =
    !router.permissions ||
    router.permissions.every((p) => permissions.includes(p));

  if (isHasPermission) {
    if (router.children) {
      const routers = [...router.children];
      const newChild = handleGetRoute(routers, permissions, router.name);
      if (!newChild?.length) return undefined;
      if (newChild) {
        router.children = newChild;
      }
    }

    permissionStore.permissionName?.push(
      //@ts-ignore
      parentName ? parentName + "/" + router.name : router.name
    );
    return router;
  }
  return undefined;
};

const handleGetRoute = (
  router: Route[],
  permission: EPermissions[],
  parentName?: string
) => {
  if (!settings.checkPermission) return router;
  if (!router?.length) return;
  const newParentRouter = router.reduce(
    (prevRoutes: Route[], routes: Route) => {
      const newChildRouters = handleGetRouter(routes, permission, parentName);
      if (newChildRouters) {
        return [...prevRoutes, newChildRouters];
      }
      return prevRoutes;
    },
    []
  );

  return newParentRouter;
};

const handleGetRouteForUser = (
  router: Route,
  permission: Permission[],
  parentName?: string
) => {
  const currRoute = { ...router };
  if (currRoute.children) {
    const routeChild = currRoute.children.reduce(
      (preChildRoute: Route[], currChildRoute: Route) => {
        const parentName = currRoute.name + "/" + currChildRoute.name;
        const routeForUser = handleGetRouteForUser(
          currChildRoute,
          permission,
          parentName
        );
        if (routeForUser) {
          permissionStore.permissionName?.push(parentName);
          return [...preChildRoute, routeForUser];
        }
        return preChildRoute;
      },
      []
    );
    currRoute.children = routeChild;
    if (routeChild.length != 0) {
      return currRoute;
    }
  } else {
    const isExist = permission.find(
      (r) => r.name == (parentName || router.name)
    );
    if (isExist) {
      return router;
    }
  }
};
class PermissionStore {
  permissions: Permission[] = [];
  packagePermissions: Permission[] = [];
  accessRoutes: Route[] = [];
  accessRoutesForPackage: Route[] = [];
  isAdmin?: boolean;
  roles?: RoleType;
  permissionName?: string[];
  permissionNamesForPackage?: EPermissions[];

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "PermissionStore",
      properties: [],
      storage: localStorage,
    });
  }

  fetchPermissions = async (roleId: number) => {
    // const res = await roleApi.findOne(roleId);
    // this.permissions = res.data.permissions;
    // this.isAdmin = res.data?.isAdmin;
  };
  getPermissions = async () => {
    // const res = await roleApi.getPermission();
    // this.packagePermissions = res.data.permissions;
    // return res.data?.permissions;
  };

  updateRouteNoCheckPermission = () => {
    return;
    this.accessRoutesForPackage = adminRoutes;
    this.accessRoutes = adminRoutes || [];
    this.roles = checkPermission([]);
  };

  updateAccessRoutes = (data: Permission[]): void => {
    const adminRoutesClone = adminRoutes;

    this.permissionName = [];

    const permissionNames = data.map((p) => p.name) as EPermissions[];
    //Handle get access routes for store
    this.permissionNamesForPackage = permissionNames;
    const newRoutes = handleGetRoute(adminRoutesClone, permissionNames);
    this.accessRoutesForPackage = newRoutes as Route[];
    this.roles = checkPermission(this.permissionName);

    if (this.isAdmin) {
      this.accessRoutes = newRoutes as Route[];
      return;
    }
    //Handle get access routes for user
    this.permissionName = [];
    const newRoutesForUser = newRoutes?.reduce((preR: Route[], curr: Route) => {
      const newRoute = handleGetRouteForUser(curr, this.permissions);
      if (newRoute) {
        return [...preR, newRoute];
      }
      return preR;
    }, []);
    this.roles = checkPermission(this.permissionName);
    console.log("ROLES: ", toJS(this.roles));

    console.log("Quyền nhân viên: ", permissionNames);

    if (newRoutesForUser?.length == 0) {
      message.error("Bạn không có quyền truy cập.");
      if (userStore.token) {
        userStore.logout();
      }
      return;
    }
    console.log("Quyền nhân viên: ", newRoutesForUser);

    this.accessRoutes = (newRoutesForUser as Route[]) || [];
  };

  setAccessRoutes = async () => {
    const data = await permissionStore.getPermissions();
    this.updateAccessRoutes(data);
    console.log("accessRoutes sau khi login", toJS(this.accessRoutes));
  };

  resetPermission = () => {
    this.permissions = [];
    this.accessRoutes = [];
    this.accessRoutesForPackage = [];
    this.isAdmin = undefined;
    this.roles = undefined;
    this.permissionName = undefined;
    this.permissionNamesForPackage = undefined;

    console.log("accessRoutes sau khi đăng xuất", toJS(this.accessRoutes));
  };
}

const permissionStore = new PermissionStore();

export { permissionStore };
