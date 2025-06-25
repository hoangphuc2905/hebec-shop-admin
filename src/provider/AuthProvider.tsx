import { AppLoading } from "components/App/AppLoading";
import { AppSuspense } from "components/App/AppSuspense";
import { useRouter } from "hooks/useRouter";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { adminRoutes } from "router";
import { settings } from "settings";
import { permissionStore } from "store/permissionStore";
import { userStore } from "store/userStore";
import { getToken, setToken } from "utils/auth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigation = useNavigate();
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  useRouter(isLoaded);

  useEffect(() => {
    if (isLoaded) {
      handleAuth();
    }
  }, [navigation, isLoaded]);

  useEffect(() => {
    fetchPermission();
    return () => {};
  }, []);

  const fetchPermission = async () => {
    const token = getToken();
    if (!token) {
      navigation("/login");
      return;
    }

    try {
      await userStore.getProfile();

      permissionStore.accessRoutes = [...adminRoutes];

      if (settings.checkPermission && userStore.info.role) {
        await permissionStore.fetchPermissions(userStore.info.role.id);
        await permissionStore.setAccessRoutes();
      } else {
        await permissionStore.updateRouteNoCheckPermission();
      }
    } catch (error) {
      userStore.logout();
      navigation("/login");
    } finally {
      setIsLoaded(true);
    }
  };

  const handleAuth = async () => {
    try {
      await userStore.getProfile();
    } catch (error: any) {
      if (error.response.status === 409) {
        navigation("/expired");
        localStorage.setItem("bmd_expired", error.response.data.message);
      } else {
        userStore.logout();
        navigation("/login");
      }
    }
  };

  if (!isLoaded) {
    return <AppLoading />;
  }

  return <>{children}</>;
};
