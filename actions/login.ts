"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return {    
            error: "Invalid email or password",
        }
    }
    

    const {email, password} = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if(!existingUser || !existingUser.email || !existingUser.password) {
        return {error: "Invalid email or password"}
    }

    if(!existingUser.emailVerified){
        const verificationToken = await generateVerificationToken(email);
        
        await sendVerificationEmail(verificationToken.email, verificationToken.token);
        return {success: "confirmation email sent!"}
    }
    try{

        await signIn("credentials",{
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    
        return {success: "Logged in successfully"}
    } catch(error){
        if(error instanceof AuthError) {
            switch(error.type) {
                case "CredentialsSignin": 
                return {error: "Invalid email or password"}
                default: 
                return {error: "Something went wrong!"}
            }
        }

        throw error;
    }
}