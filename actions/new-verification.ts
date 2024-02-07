"use server";

import db from "@/lib/db";
import { getVerificationTokenByToken } from "@/data/verification-toke";
import { getUserByEmail } from "@/data/user";

export const newVerification = async(token: string) => {
    const existingToken = await getVerificationTokenByToken(token);

    if(!existingToken) {
        return {
            error: "token does not exist!"
        }
    };

    const hasExpired = new Date(existingToken.expires) < new Date();

    if(hasExpired) {
        return {
            error: "Verification token has expired"
        }
    };

    const existingUser = await getUserByEmail(existingToken.email);

    if(!existingToken) {
        return {
            error: "user not found"
        }
    };
    
    await db.user.update({
        where: {
            id: existingUser?.id
        },
        data: {
            emailVerified: new Date(),
            email: existingToken.email
        }
    })

    await db.verificationToken.delete({
        where: {
            id: existingToken.id
        }
    })

    return {success: "Email verified!"}
}