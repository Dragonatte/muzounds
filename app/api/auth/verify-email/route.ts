import { NextRequest } from "next/server";
import { redirect } from "next/navigation";

import VerificationTokenController from "@/controller/VerificationTokenController";
import UserController from "@/controller/UserController";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const token = searchParams.get("token");

  if (!token) return new Response("Invalid token", { status: 400 });

  const verificationToken = await VerificationTokenController.getToken(token);

  if (!verificationToken) return new Response("Invalid token", { status: 400 });

  if (verificationToken.expires < new Date())
    return new Response("Token expired", { status: 400 });

  let user = await UserController.getByEmail(verificationToken.identifier);

  if (!user) return new Response("User not found", { status: 400 });

  if (user.emailVerified)
    return new Response("Email already verified", { status: 400 });

  await UserController.update(user.id, { ...user, emailVerified: new Date() });

  await VerificationTokenController.delete(verificationToken.identifier, token);

  redirect("/auth/signin");
}
