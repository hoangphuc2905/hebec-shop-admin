import { v4 as uuidv4 } from "uuid";
import UAParser from "ua-parser-js";

export const initUUID = () => {
  const localUuid = localStorage.getItem("uuid");
  if (!localUuid) {
    const uuid = uuidv4();
    localStorage.setItem("uuid", uuid);
  }
};

export const getDeviceInfo = () => {
  let parser = new UAParser();

  const deviceId = localStorage.getItem("uuid") || "";
  const deviceName = parser.getUA();
  const os = parser.getOS();
  return { deviceId, deviceName, os };
};
