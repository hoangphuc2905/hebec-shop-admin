import { toJS } from "mobx";
import moment from "moment";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { settings } from "settings";
import { permissionStore } from "store/permissionStore";
import { userStore } from "store/userStore";
import { PermissionTrans } from "types/role";
import { getToken } from "utils/auth";

const whileList = ["/login"];

export const useRouter = (isLoaded: boolean) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const token = getToken();

    if (!token) {
      return navigate("/login");
    }

    if (location.pathname == "/login" && token) {
      console.log("navigate");
      return navigate("/");
    }

    if (whileList.includes(location.pathname)) {
      return;
    }

    if (permissionStore.accessRoutes.length) {
      if (location.pathname == "/") {
        if (token) {
          let firstRoute = permissionStore.accessRoutes.find((e) => true);
          const route = firstRoute?.children
            ? firstRoute.path + "/" + firstRoute.children?.[0]?.path
            : firstRoute?.path;
          navigate(route || "/login");
        } else {
          navigate("/login");
        }
      } else {
        // check hết hạn gói
        if (
          userStore.info.store?.expiredAt! < moment().unix() &&
          userStore.info.store?.expiredAt! > 0
        ) {
          console.log(userStore.info.store?.expiredAt);

          navigate("/expired", {
            state: {
              date: moment
                .unix(userStore.info.store?.expiredAt!)
                .format(settings.dateFormat),
              isActive: false,
            },
          });
        }
        // check cửa hàng chưa có gói
        else if (
          userStore.info.store?.expiredAt === 0 &&
          userStore.info.store.benefitPackage === null
        ) {
          navigate("/expired", {
            // state true là gói không được gán dịch vụ
            state: {
              date: moment
                .unix(userStore.info.store?.expiredAt!)
                .format(settings.dateFormat),
              isActive: true,
            },
          });
        } else {
          if (settings.checkPermission) {
            const isHasPermission = permissionStore.accessRoutes.some((p) => {
              if (!p.children) {
                return p.path == location.pathname;
              }
              return p.children.some((c) => {
                let originPath = p.path + "/" + c.name;

                return originPath == location.pathname;
              });
            });
            if (!isHasPermission) {
              console.log("[USE-ROUTES]- NO PERMISSION");
              navigate("/404");
            }
          }
        }
      }
    }

    handleScrollToTop();
  }, [location.pathname, isLoaded]);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return location;
};
