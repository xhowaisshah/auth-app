import db from "@/lib/db";

export const getVerificationTokenByEmail = async(
    email: string
) => {
    
    try{

        const VerificationToken = await db.verificationToken.findFirst({
            where: {email}
        })

        return VerificationToken;
    } catch(error) {
        return null;
    }
}

export const getVerificationTokenByToken = async(
    token: string
) => {
    
    try{

        const VerificationToken = await db.verificationToken.findUnique({
            where: {token}
        })

        return VerificationToken;
    } catch(error) {
        return null;
    }
}