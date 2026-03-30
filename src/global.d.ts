// src/global.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    API_BASE_URL: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}