import { prisma } from "@/prisma";
import { VerificationToken } from "@prisma/client";

class VerificationTokenModel {
  static delete(email: string, token: string) {
    return prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: email,
          token: token,
        },
      },
    });
  }
  public static async get(id: string) {
    return prisma.verificationToken.findFirst({
      where: {
        identifier: id,
      },
    });
  }

  public static async getByToken(token: string) {
    return prisma.verificationToken.findFirst({
      where: {
        token: token,
      },
    });
  }

  public static async create(data: VerificationToken): Promise<boolean> {
    console.log({ data });

    const res = await prisma.verificationToken.create({
      data: {
        identifier: data.identifier,
        token: data.token,
        expires: data.expires,
      },
    });

    console.log({ res });

    if (res !== null) return true;

    return false;
  }
}

export default VerificationTokenModel;
