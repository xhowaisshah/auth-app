"use server";

import { NewPasswordSchema } from '@/schemas';
import * as z from 'zod';
import bcrypt from "bcryptjs";
import db from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { getPasswordResetTokenByToken } from '@/data/password-reset-token';

export const newPassword = async(values: z.infer<typeof NewPasswordSchema>, token: string | null) => {
    
    if(!token){
        return {error: "Missing token!"}
    }

    const validatedFields = NewPasswordSchema.safeParse(values);

    if(!validatedFields.success) {
        return {error: "Invalid password"}
    }

    const {password} = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    if(!existingToken) {
        return {error: "token does not exist"}
    }

    const hasExpired = new Date(existingToken.expires) < new Date;

    if(hasExpired) {
        return {error: "Token has expired!"}
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if(!existingUser) {
        return {error: "Email does not exist"}
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
        where: {id: existingUser.id},
        data: {
            password: hashedPassword
        }
    })

    await db.passwordResetToken.delete({
        where: {id: existingToken.id}
    })

    return {success: "Password updated!"}
}