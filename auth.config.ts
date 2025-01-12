import type { NextAuthConfig } from "next-auth";

import { subtle } from "crypto";

import CredentialsProvider from "next-auth/providers/credentials";
import { nanoid } from "nanoid";

import { LoginSchema } from "./schema/Schemas";
import VerificationTokenController from "./controller/VerificationTokenController";
import { sendEmailVerification } from "./lib/mail";

import UserController from "@/controller/UserController";

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await subtle.digest("SHA-256", data);

  return Buffer.from(hashBuffer).toString("hex");
}

export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  const hashedPassword = await hashPassword(password);

  return hashedPassword === hash;
}

export default {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Validate input with zod schema
        const { data, success } = LoginSchema.safeParse(credentials);

        if (!success) {
          throw new Error("Invalid credentials format.");
        }

        // Fetch user from database
        const user = await UserController.getUserByUser(data.username);

        if (!user) {
          throw new Error("User not found.");
        }

        // Compare password
        const isValid = await verifyPassword(data.password, user.password);

        if (!isValid) {
          throw new Error("Invalid credentials.");
        }

        // Handle email verification
        if (!user.emailVerified) {
          const existingToken =
            await VerificationTokenController.getByIdentifier(user.email);

          // Delete existing token if present
          if (existingToken) {
            await VerificationTokenController.delete(
              user.email,
              existingToken.token,
            );
          }

          // Generate new verification token
          const token = nanoid(32);

          await VerificationTokenController.createToken({
            identifier: user.email,
            token,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours expiration
          });

          // Send verification email
          await sendEmailVerification(user.email, token);

          throw new Error("Email not verified. Please check your inbox.");
        }

        // Return user object if authentication is successful
        return {
          id: user.id,
          username: user.username,
          email: user.email,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
