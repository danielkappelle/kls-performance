import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/request-token",
  },
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
