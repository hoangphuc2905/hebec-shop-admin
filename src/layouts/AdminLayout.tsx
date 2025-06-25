import { useCallback, useEffect, useState } from "react";
import { Layout, Spin } from "antd";
import "./styles/AdminLayout.scss";
import { Outlet, NavLink } from "react-router-dom";
import { AuthProvider } from "provider/AuthProvider";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { AppSuspense } from "components/App/AppSuspense";
import { AppLogo } from "components/App/AppLogo";

const { Header, Sider, Content } = Layout;

export const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [siteLayoutMarginLeft, setSiteLayoutMarginLeft] = useState(200);
  const [selectedKey, setSelectedKey] = useState("1");

  const toggle = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  useEffect(() => {
    if (collapsed) {
      setSiteLayoutMarginLeft(80);
    } else {
      setSiteLayoutMarginLeft(200);
    }
  }, [collapsed]);

  useEffect(() => {}, []);

  return (
    <AppSuspense>
      <AuthProvider>
        <Layout>
          <Sidebar collapsed={collapsed} />

          <Layout
            className="site-layout"
            style={{ marginLeft: siteLayoutMarginLeft }}
          >
            <Navbar collapsed={collapsed} toggle={toggle} />

            <Content
              className="site-layout-background"
              style={{
                margin: "24px 16px",
                padding: 12,
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </AuthProvider>
    </AppSuspense>
  );
};
