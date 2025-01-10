import { Account } from "@prisma/client";

import { prisma } from "@/prisma";

class AccountModel {
  public static async get(id: string) {
    return prisma.account.findFirst({
      where: {
        userId: id,
      },
    });
  }

  public static async create(data: Account): Promise<void> {
    prisma.account.create({
      data: data,
    });
  }

  public static async getAll() {
    return prisma.account.findMany();
  }
}

export default AccountModel;
