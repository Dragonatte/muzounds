import type { NextAuthConfig } from "next-auth";

import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";

import { LoginSchema } from "./schema/Schemas";
import VerificationTokenController from "./controller/VerificationTokenController";
import { sendEmailVerification } from "./lib/mail";

import UserController from "@/controller/UserController";

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const { data, success } = LoginSchema.safeParse(credentials);

        if (!success) throw new Error("Invalid credentials");

        const user = await UserController.getUserByUser(data.username);

        if (!user) throw new Error("User not found");

        const isValid = await bcrypt.compare(data.password, user.password);

        if (!isValid) throw new Error("Invalid credentials");

        if (user.emailVerified === null) {
          const verificationToken =
            await VerificationTokenController.getByIdentifier(user.email);

          if (verificationToken) {
            await VerificationTokenController.delete(
              user.email,
              verificationToken.token,
            );
          }

          const token = nanoid(32);

          VerificationTokenController.createToken({
            identifier: user.email,
            token,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
          })
            .then((isCreaded) => {
              if (!isCreaded) throw new Error("An error occurred");
            })
            .catch((err) => {
              console.error(err);
            });

          const res = await sendEmailVerification(user.email, token);

          console.log(res);

          throw new Error("Email not verified");
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
