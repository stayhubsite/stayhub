// types/next-auth.d.ts

import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role: string;
      name: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string; // Asegúrate de que el id es de tipo string
    email: string;
    name:string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name:string;
    role: string;
    // Puedes agregar otros campos aquí si es necesario
  }
}
