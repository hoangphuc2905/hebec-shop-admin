import { AppleOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, message } from "antd";
import { cloneDeep } from "lodash";
import debounce from "lodash/debounce";
import { observer } from "mobx-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminRoutes } from "router";
import { settings } from "settings";
import { permissionStore } from "store/permissionStore";
import { userStore } from "store/userStore";
import { QueryParam } from "types/query";
import { getTitle } from "utils";
import "./styles/LoginPage.scss";
import { rules } from "types/rule";

const { Item: FormItem } = Form;

const LoginPage = observer(({ title = "" }) => {
  const [form] = Form.useForm<{
    username: string;
    password: string;
    namespace: string;
  }>();
  const [loading, setLoading] = useState(false);
  const [queryNameSpace, setQueryNameSpace] = useState<QueryParam>({
    page: 1,
    limit: 20,
  });

  const navigation = useNavigate();

  useEffect(() => {
    document.title = getTitle(title);
  }, []);

  const debounceSearch = useCallback(
    debounce(
      (keyword) => setQueryNameSpace({ ...queryNameSpace, search: keyword }),
      300
    ),
    []
  );

  const handleSubmit = async () => {
    setLoading(true);
    const { username, password, namespace } = form.getFieldsValue();
    try {
      cloneDeep(adminRoutes);
      await userStore.login(username, password, namespace);
      await userStore.getProfile();
      permissionStore.accessRoutes = [...adminRoutes];

      if (settings.checkPermission) {
        if (userStore.info.role) {
          await permissionStore.fetchPermissions(userStore.info.role.id);
          if (!userStore.info.isAdmin && !permissionStore.permissions.length) {
            message.error("Bạn không có quyền truy cập");
            throw new Error("");
          }
          await permissionStore.setAccessRoutes();
          let firstRoute = permissionStore.accessRoutes?.[0];
          const route = firstRoute?.children
            ? firstRoute.path + "/" + firstRoute.children[0].path
            : firstRoute?.path;
          // clear date expired of store
          localStorage.removeItem("bmd_expired");
          navigation(route || "/login");
        } else {
          message.error("Bạn không có quyền truy cập");
          throw new Error("");
        }
      } else {
        debugger;
        await permissionStore.updateRouteNoCheckPermission();
        navigation("/profile");
      }
    } catch (error: any) {
      if (error?.response?.status === 409) {
        navigation("/expired", {
          state: {
            date: error.response.data.message,
            isActive: false,
          },
        });
        localStorage.setItem("bmd_expired", error.response.data.message);
      } else {
        userStore.logout();
        navigation("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div style={{ paddingTop: 120 }}>
        <div className="login-container">
          <div className="logo text-center">
            <span style={{ fontSize: 22 }}>
              <img
                src={"/images/logo.png"}
                width={120}
                style={{ borderRadius: 5, marginBottom: "1.5em" }}
                alt=""
              />
            </span>
          </div>

          <Form onFinish={handleSubmit} form={form} layout={"vertical"}>
            <FormItem label="Namespace" name="namespace">
              <Input prefix={<AppleOutlined />} size="large" />
            </FormItem>
            <FormItem label="Username" name="username">
              <Input prefix={<UserOutlined />} size="large" />
            </FormItem>

            <FormItem label="Password" name="password">
              <Input.Password prefix={<LockOutlined />} size="large" />
            </FormItem>

            <FormItem>
              <Button
                htmlType="submit"
                style={{ width: "100%" }}
                loading={loading}
                type="primary"
                size="large"
              >
                Login
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  );
});
export default LoginPage;
