import { Menu } from "antd";
import Sider from "antd/lib/layout/Sider";
import SubMenu from "antd/lib/menu/SubMenu";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { permissionStore } from "store/permissionStore";
import { userStore } from "store/userStore";

export const Sidebar = observer(({ collapsed }: { collapsed: boolean }) => {
  const [defaultOpenKeys, setDefaultOpenKeys] = useState<string[]>([]);
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const routes = permissionStore.accessRoutes;
    let firstRoute = routes?.[0];
    if (
      firstRoute &&
      firstRoute.path &&
      location.pathname.includes(firstRoute.path)
    ) {
      setDefaultOpenKeys(() => [firstRoute?.path || ""]);
    }
    setIsLoaded(true);
  }, []);

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo">
        <img width={64} src={userStore.info.store?.avatar} alt="" />
      </div>

      {isLoaded && (
        <Menu
          className="sidebar"
          theme="dark"
          mode="inline"
          inlineCollapsed={collapsed}
          selectedKeys={[location.pathname]}
          defaultOpenKeys={defaultOpenKeys}
          forceSubMenuRender
        >
          {permissionStore.accessRoutes
            .filter((route) => !route.hidden)
            .map((route) => {
              if (route.children?.length) {
                return (
                  <SubMenu
                    key={route.path}
                    icon={route.icon}
                    title={route.title}
                  >
                    {route.children
                      ?.filter((child) => !child.hidden)
                      .map((item) => (
                        <Menu.Item
                          icon={item.icon}
                          key={route.path + "/" + item.path}
                        >
                          {route.path && item.path && (
                            <Link to={route.path + "/" + item.path}>
                              {item.title}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                  </SubMenu>
                );
              }
              return (
                <Menu.Item icon={route.icon} key={route.path}>
                  <Link to={route.path || ""}>{route.title}</Link>
                </Menu.Item>
              );
            })}
        </Menu>
      )}
    </Sider>
  );
});
