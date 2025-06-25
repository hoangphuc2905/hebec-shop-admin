import { ConfigProvider } from "antd";
import "antd/dist/antd.less";
// import viVN from "antd/es/locale/vi_VN";
import { $isDev } from "constant";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import { useEffect } from "react";
import momentTimezone from "moment-timezone";
import "react-chat-elements/dist/main.css";
import { useRoutes } from "react-router-dom";
import { oneSignalStore } from "store/oneSignalStore";
import { userStore } from "store/userStore";
import { routes } from "./router";
import "./styles/AntDesign.scss";
import "./styles/App.scss";
import viVN from "./utils/vi_VN";
import {
  GentisOrderStatusTrans,
  OrderStatusTrans,
  OrderStatusTransDefault,
} from "types/order";
import moment from "moment";

export enum Namespaces {
  gentis = "gentis",
  domyflower = "domyflower",
  annasea = "annasea",
}

momentTimezone.tz.setDefault("Asia/Ho_Chi_Minh");

const App = observer(() => {
  const account = toJS(userStore);
  useEffect(() => {
    if (account.token) {
      if (!$isDev) {
        oneSignalStore.init();
      }
    }
  }, [account.token]);

  const routesElm = useRoutes(routes);

  useEffect(() => {
    if (account.info) {
      //Đổi trạng thái đơn phù hợp namespace
      if (account.info.store?.namespace == Namespaces.gentis) {
        Object.assign(OrderStatusTrans, GentisOrderStatusTrans);
        //@ts-ignore
        delete OrderStatusTrans["RETURN_REFUND"];
        //@ts-ignore
        delete OrderStatusTrans["DELIVERING"];
      } else {
        Object.keys(OrderStatusTrans).forEach((key) => {
          //@ts-ignore
          delete OrderStatusTrans[key];
        });

        Object.assign(OrderStatusTrans, OrderStatusTransDefault);
      }
    }

    return () => {};
  }, [account]);

  return (
    <ConfigProvider locale={viVN}>
      <div className="App">{routesElm}</div>
      {/* {isLoaded ? (

      ) : (
        <div
          className="loading"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <Spin size="large" />
        </div>
      )} */}
    </ConfigProvider>
  );
});

export default App;
