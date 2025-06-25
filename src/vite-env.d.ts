/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly GENERATE_SOURCEMAP: string;
  readonly VITE_WEBSITE_NAME: string;
  readonly VITE_API_URL: string;
  readonly VITE_IMG_URL: string;
  readonly VITE_AUTH_KEY: string;
  readonly VITE_GOOLE_API_KEY: string;
  readonly VITE_ONE_SIGNAL_APP_ID: string;
  readonly VITE_IS_DEV: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
