import oneSignal from "utils/oneSignal";

import { authApi } from "api/auth.api";
import { setToken } from "utils/auth";
import { action, computed, makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { Staff } from "types/staff";
import { $isDev } from "constant";
import { oneSignalStore } from "./oneSignalStore";
import { Namespaces } from "App";

class UserStore {
  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "UserStore",
      properties: ["info", "token"],
      storage: window.localStorage,
    });
  }

  info: Partial<Staff> = {};
  token = "";

  @computed
  get isGentis() {
    return this.info.store?.namespace == Namespaces.gentis;
  }
  @computed
  get isAnnasea() {
    return this.info.store?.namespace == Namespaces.annasea;
  }
  @computed
  get isDomyFlower() {
    return this.info.store?.namespace == Namespaces.domyflower;
  }

  @computed
  get namespace() {
    return this.info.store?.namespace;
  }

  @action
  async login(username: string, password: string, namespace: string) {
    const res = await authApi.login({ username, password, namespace });
    setToken(res.data.token);
    this.token = res.data.token;
  }

  @action
  async getProfile() {
    const res = await authApi.profile();
    this.info = res.data;
  }

  @action
  logout = () => {
    if (!$isDev) {
      const token = this.token;
      oneSignalStore.userLogout(token);
    }
    setToken("");
    this.token = "";
  };
}

const userStore = new UserStore();

export { userStore };
