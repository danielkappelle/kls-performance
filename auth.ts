import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { validateToken } from "./actions/db/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        token: {},
      },
      authorize: async (credentials) => {
        // check if this is a token login
        if (credentials.token) {
          const token = await validateToken(credentials.token as string);
          if (token) {
            return {
              _id: credentials.token,
              email: token.email,
              name: "user",
            };
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],
});
