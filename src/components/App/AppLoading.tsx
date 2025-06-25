import { Spin } from "antd";
import { AppLogo } from "./AppLogo";

export const AppLoading = () => {
  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Spin size="large" />
      <AppLogo />
    </div>
  );
};
