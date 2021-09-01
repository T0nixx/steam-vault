declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "devlopment" | "production" | "test";
    STEAM_API_KEY: string;
    SESSION_SECRET: string;
    HOST_URL: string;
  }
}
