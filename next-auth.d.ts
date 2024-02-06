import NextAuth, { type DefaultSession } from "next-auth"

export const ExtentendedSession = DefaultSession["user"] & {  
    role: "ADMIN" | "USER"
}
declare module "next-auth" {
    interface Session {
        user: ExtentendedSession;
    }
}