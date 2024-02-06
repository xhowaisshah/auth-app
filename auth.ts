import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import db from "./lib/db";
import authConfig from "./auth.config";
import { getUserById } from "./data/user";


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
    callbacks: {
        async session({ session, token }) {
            if(token.sub && session.user) {
                session.user.id = token.sub
            }
            if(token.role && session.user) {
                session.user.role = token.role;
            }
            return session
        },
        jwt: async ({ token }) => {
            if(!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if(!existingUser) return token;

            token.role = existingUser.role;

            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});