import { User } from "@prisma/client";

import { prisma } from "@/prisma";

class UserModel {
  public static async getByEmail(email: string) {
    return prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }
  public static async getByUserName(username: string) {
    return prisma.user.findFirst({
      where: {
        username: username,
      },
    });
  }

  public static async create(data: User): Promise<boolean> {
    const newUser = await prisma.user.create({
      data: {
        fullname: data.fullname,
        email: data.email,
        username: data.username,
        password: data.password,
      },
    });

    //const newUser = {};
    if (newUser !== null || newUser !== undefined) return true;
    else return false;
  }
  public static async delete(id: string): Promise<void> {
    prisma.user.delete({
      where: {
        id: id,
      },
    });
  }

  public static async get(id: string) {
    return prisma.user.findFirst({
      where: {
        id: id,
      },
    });
  }

  public static async getAll() {
    return prisma.user.findMany();
  }

  public static async update(id: string, data: User): Promise<boolean> {
    const res = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        fullname: data.fullname,
        email: data.email,
        username: data.username,
        password: data.password,
        emailVerified: data.emailVerified,
      },
    });

    if (res === null) throw new Error("User not found");

    return true;
  }
}

export default UserModel;
