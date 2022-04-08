declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "devlopment" | "production" | "test";
    STEAM_API_KEY: string;
    JWT_SECRET: string;
    HOST_URL: string;
    CLIENT_URL: string;
    MONGO_URI: string;
  }
}
