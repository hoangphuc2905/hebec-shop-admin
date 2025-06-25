import { message } from "antd";
import { action, makeAutoObservable } from "mobx";
import ROneSignal from "react-onesignal";
import { getToken } from "utils/auth";

class OnSignalStore {
  isOn = false;
  isInitialized = false;
  constructor() {
    makeAutoObservable(this);
  }

  @action
  async init() {
    if (!this.isInitialized) {
      ROneSignal.init({
        appId: import.meta.env.VITE_ONE_SIGNAL_APP_ID || "",
        notifyButton: {
          enable: true,
        },
      }).then(async () => {
        ROneSignal.on("subscriptionChange", async (eventData) => {
          const token = getToken();
          if (!token) {
            return ROneSignal.setSubscription(false);
          }
          const oneSignalId = await ROneSignal.getUserId();
          const isOn = await ROneSignal.getSubscription();
          localStorage.setItem("oneSignalId", oneSignalId || "");
          console.log("sub change: ", isOn);
          let isAcceptPermission;
          if (isOn) {
            isAcceptPermission = await this.notifyPermission();
            if (isAcceptPermission) {
              let subRes;
              if (oneSignalId) {
                // subRes = await oneSignalApi.sub({
                //   oneSignalId,
                // });
              }
              this.setIsOn(isOn);
            }
          } else {
            let subRes;
            if (oneSignalId) {
              // subRes = await oneSignalApi.unSub({ oneSignalId });
            }
            localStorage.removeItem("oneSignalId");
            this.setIsOn(isOn);
          }
        });

        const isOn = await ROneSignal.getSubscription();

        console.log("ONE_SIGNAL STATUS:", isOn);

        if (isOn) {
          const oneSignalId = await ROneSignal.getUserId();
          if (oneSignalId) {
            // await oneSignalApi.sub({
            //   oneSignalId,
            // });
            this.setIsOn(isOn);
          } else {
            await this.subscribe(false);
            this.setIsOn(false);
            return;
          }
        }

        await this.subscribe(isOn);

        this.setIsInitialized(true);
      });
    }
  }

  @action
  async subscribe(sub: boolean) {
    try {
      await this.notifyPermission();
      await ROneSignal.setSubscription(sub);
    } catch (error) {
      console.log("Subscription error: ", error);
      await ROneSignal.setSubscription(false);
      message.error(
        "Chức năng thông báo đẩy sẽ không hoạt động nếu không được cấp quyền.",
        3
      );
    }
  }

  setIsOn(isOn: boolean) {
    this.isOn = isOn;
  }
  setIsInitialized(isInit: boolean) {
    this.isInitialized = isInit;
  }

  @action
  async userLogout(token: string) {
    if (this.isOn) {
      this.setIsOn(false);
      ROneSignal.setSubscription(false);
      const oneSignalId = await ROneSignal.getUserId();
      // oneSignalApi.unSub({ oneSignalId }, token);
    }
  }

  notifyPermission() {
    return new Promise((resolve, reject) => {
      if (!("Notification" in window)) {
        this.setIsOn(false);
        message.error(
          "Thiết bị của bạn không hỗ trợ thông báo đẩy. Chức năng này sẽ không hoạt đồng.",
          3
        );
        reject("devide not supported");
      } else if (Notification.permission === "granted") {
        resolve(true);
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            resolve(true);
          } else {
            this.setIsOn(false);
            reject("devide permission denied");
          }
        });
      } else {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            resolve(true);
          } else {
            this.setIsOn(false);
            reject("devide permission denied");
          }
        });
      }
    });
  }
}

const oneSignalStore = new OnSignalStore();

export { oneSignalStore };
