import React from "react";
import { RouteObject } from "react-router-dom";
import { NotFoundPage } from "views/404/NotFoundPage";
import { AdminLayout } from "layouts/AdminLayout";
import LoginPage from "views/Login/LoginPage";
import { AccountPage } from "views/AccountPage/AccountPage";
import { StoreInfoPage } from "views/StoreInfoPage/StoreInfoPage";
import { ProductCategoryPage } from "views/ProductCategoryPage/ProductCategoryPage";
import { ProductPage } from "views/ProductPage/ProductPage";
import ClientPage from "views/Client/ClientPage";
import { Customer } from "views/Customer/CustomerPage";
import { Order } from "views/Order/OrderPage";
import LogoutPage from "views/Logout/LogoutPage";

export interface Route extends RouteObject {
  children?: Route[];
  descrription?: Route[];
  title?: string;
  icon?: React.ReactNode;
  breadcrumb?: string;
  isAccess?: boolean;
  checkIsAdmin?: boolean;
  hidden?: boolean;
  featureRoles?: string[];
  name?: string;
  permissions?: EPermissions[];
}

export enum EPermissions {
  // BASIC
  Profile = "/profile",
}

export enum RoleNames {}

export const adminRoutes: Route[] = [
  {
    title: "Đơn hàng",
    path: "order",
    name: "order",
    element: <Order title="Danh sách khách hàng" />,
  },
  {
    title: "Sản phẩm",
    path: "product",
    name: "product",
    children: [
      {
        title: "Danh mục",
        path: "category",
        name: "category",
        element: <ProductCategoryPage title="Danh mục sản phẩm" />,
      },
      {
        title: "Danh sách sản phẩm",
        path: "list",
        name: "list",
        element: <ProductPage title="Danh sách sản phẩm" />,
      },
    ],
    // permissions: [EPermissions.Profile],
  },
  {
    title: "Danh sách khách hàng",
    path: "customer",
    name: "customer",
    element: <Customer title="Danh sách khách hàng" />,
  },

  {
    title: "Thông tin cá nhân",
    path: "profile",
    name: "profile",
    element: <AccountPage title="Thông tin cá nhân" />,
    // permissions: [EPermissions.Profile],
  },
  {
    title: "Thông tin cửa hàng",
    path: "store-profile",
    name: "store-profile",
    element: <StoreInfoPage title="Thông tin cửa hàng" />,
    // permissions: [EPermissions.StoreProfile],
  },
  {
    title: "Đăng xuất",
    path: "logout",
    name: "logout",
    element: <LogoutPage />,
  },
];

const routes: Route[] = [
  {
    element: <AdminLayout />,
    children: adminRoutes,
    path: "/",
  },
  {
    path: "/login",
    element: <LoginPage title="Đăng nhập" />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

const cloneRoutes = [...routes];

export { routes, cloneRoutes };
