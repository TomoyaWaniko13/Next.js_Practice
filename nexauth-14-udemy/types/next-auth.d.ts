import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    id: number;
    name: string;
    username: string;
    role: Role;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string;
  }
}
