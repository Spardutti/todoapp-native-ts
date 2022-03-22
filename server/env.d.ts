declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string;
      SESSION_SECRET: string;
      JWT_SECRET: string;
      CLIENT_ID: string;
      CLIENT_SECRET: string;
      OAUTH_REFRESH_TOKEN: string;
      MAIL_USERNAME: string;
      MAIL_PASSWORD: string;
    }
  }
}

export {};
