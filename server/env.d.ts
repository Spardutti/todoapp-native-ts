declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string;
      SESSION_SECRET: string;
      JWT_SECRET: string;
    }
  }
}

export {};
