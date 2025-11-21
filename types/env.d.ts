declare interface AppEnv {
  SECRET_KEY?: string;
  BASE_URL?: string;
  [key: string]: string | undefined;
}

declare const process: {
  env: AppEnv;
};
