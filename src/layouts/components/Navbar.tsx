import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Breadcrumb, Menu } from "antd";
import { Header } from "antd/lib/layout/layout";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { adminRoutes } from "router";
import { oneSignalStore } from "store/oneSignalStore";
import { userStore } from "store/userStore";
// @ts-ignore

const menu = (
  <Menu>
    <Menu.Item key={"profile"}>
      <Link to="/staff/profile">Cá nhân</Link>
    </Menu.Item>

    <Menu.Item key={"login"}>
      <div
        // to={"/login"}
        onClick={() => {
          userStore.logout();
          location.reload();
        }}
      >
        Đăng xuất
      </div>
    </Menu.Item>
  </Menu>
);

export const Navbar = observer(
  ({ collapsed, toggle }: { collapsed: boolean; toggle: () => void }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);
    const [isSubcribe, setIsSubcribe] = useState<boolean>();
    const [loadingOneSignal, setLoadingOneSignal] = useState<boolean>();
    const [visiblePopover, setVisiblePopover] = useState<boolean>(false);
    const [totalUnread, setTotalUnread] = useState<number>(0);

    useEffect(() => {
      setIsSubcribe(oneSignalStore.isOn);
    }, [oneSignalStore.isOn]);

    useEffect(() => {
      // set breadcrumbs
      const find = adminRoutes.find((e) => e.path == location.pathname);
      if (find) {
        if (find.breadcrumb) {
          setBreadcrumbs(find.breadcrumb.split("/"));
        } else if (find.title) {
          setBreadcrumbs([find.title]);
        }
      }
    }, [location.pathname]);

    useEffect(() => {}, []);

    const menu = React.useMemo(() => (
      <Menu>
        <Menu.Item>
          <Link to="/profile">Cá nhân</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={""}>Đăng xuất</Link>
        </Menu.Item>
      </Menu>
    ), [])

    // handle scroll to close popover notification
    useEffect(() => {
      const handleClosePopover = () => {
        setVisiblePopover(false);
      };
      window.addEventListener("scroll", handleClosePopover);
      return () => {
        window.removeEventListener("scroll", handleClosePopover);
      };
    }, []);
    return (
      <Header
        className={`site-layout-background ${collapsed ? "collapsed" : ""}`}
        style={{ padding: 0 }}
      >
        <div>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
          <Breadcrumb
            style={{ display: "inline-block" }}
            className={!collapsed ? "mobile-breadcrumb-none" : ""}
          >
            {breadcrumbs.map((item, i) => (
              <Breadcrumb.Item key={i}>{item}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </div>
      </Header>
    );
  }
);
