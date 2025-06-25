import md5 from "md5";
import moment from "moment";
export const generateHash = () => {
  const time = moment().unix();
  const hash = md5(`${import.meta.env.VITE_AUTH_KEY}.${time}`);
  return { time, hash };
};
