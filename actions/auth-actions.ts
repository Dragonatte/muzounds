"use server";

import { z } from "zod";
import { AuthError, Session } from "next-auth";
import { User } from "@prisma/client";
import { nanoid } from "nanoid";

import { sendEmailVerification } from "@/lib/mail";
import { LoginSchema, SignUpSchema } from "@/schema/Schemas";
import { signIn } from "@/auth";
import UserController from "@/controller/UserController";
import VerificationTokenController from "@/controller/VerificationTokenController";

export const loginAction = async (values: z.infer<typeof LoginSchema>) => {
  try {
    await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) return { error: error.cause?.err?.message };

    return { error: "An error occurred" };
  }
};

export const signUpAction = async (values: z.infer<typeof SignUpSchema>) => {
  try {
    const { data, success, error } = SignUpSchema.safeParse(values);

    if (!success) return { error: error };

    const userData = {
      fullname: data.fullName,
      email: data.email,
      username: data.username,
      password: data.password,
    };

    UserController.createUser(userData)
      .then((isCreated) => {
        if (isCreated) return { success: true };

        return { error: "An error occurred" };
      })
      .catch((err) => ({ error: err }));

    const token = nanoid(32);

    VerificationTokenController.createToken({
      identifier: data.email,
      token: token,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    })
      .then((isCreated) => {
        if (!isCreated) throw new Error("An error occurred");
      })
      .catch((err) => err);

    sendEmailVerification(data.email, token).then((res) => res);
  } catch (error) {
    if (error instanceof AuthError) return { error: error.cause?.err?.message };

    return { error: "An error occurred" };
  }
};

export const transformUser = async (session: Session): Promise<User | null> => {
  if (session) {
    if (!session.user) return null;

    return await UserController.getByEmail(session.user.email as string);
  }

  return null;
};
