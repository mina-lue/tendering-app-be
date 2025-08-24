// src/types/express/index.d.ts
declare namespace Express {
  export interface Request {
    user?: {
      username: string;
      name: string;
      role: 'VENDOR' | 'BUYER' | 'ADMIN';
    };
  }
}
