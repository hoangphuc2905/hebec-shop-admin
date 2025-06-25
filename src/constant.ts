export enum Gender {
  Male = "MALE",
  FeMale = "FE_MALE",
}

export const $isDev = import.meta.env.VITE_IS_DEV == "true";
export const $googleApiKey = import.meta.env.VITE_GOOLE_API_KEY;
