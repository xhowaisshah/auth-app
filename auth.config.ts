import type { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';

import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";

export default {
  providers: [
    credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
      
        if(validatedFields.success) {
          const {email, password} = validatedFields.data;
      
          const user = await getUserByEmail(email);
          
          if(!user || !user.password) {
            return null;
          }
      
          const isValid = await bcrypt.compare(password, user.password);
      
          if(isValid) {
            return user;
          }
      
          return null;
        }
      
        return null; 
      }
    })
  ],
} satisfies NextAuthConfig