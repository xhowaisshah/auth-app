import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);


export const sendVerificationEmail = async (email: string, token: string) => {
    const confrimLink = `http://localhost:3001/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirm your email",
        html: `<p>Click to Confirm your email: <a href="${confrimLink}">Confirm your email</a></p>`,
    })
};