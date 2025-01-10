import { Resend } from "resend";

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export const sendEmailVerification = async (email: string, token: string) => {
  await resend.emails
    .send({
      from: "MuZounds Verification <onboarding@resend.dev>",
      to: [email],
      subject: "Email Verification",
      html: `<a href="${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}">Click here to verify your email</a>`,
    })
    .then(() => true)
    .catch((error) => error);
};
