import bcrypt from "bcryptjs";
import { User } from "@prisma/client";

import UserModel from "@/model/UserModel";

class UserController {
  public static async update(id: string, data: User) {
    return await UserModel.update(id, data);
  }
  public static async getByEmail(email: string) {
    return await UserModel.getByEmail(email);
  }
  public static async getUserByUser(username: string) {
    return await UserModel.getByUserName(username);
  }
  public static async get(id: string) {
    return await UserModel.get(id);
  }
  public static async createUser(data: any): Promise<boolean> {
    const user = await UserModel.getByUserName(data.username);

    if (user) throw new Error("User already exists");

    const emailUser = await UserModel.getByEmail(data.email);

    if (emailUser) throw new Error("Email already exists");

    data.password = await bcrypt.hash(data.password, 10);

    return await UserModel.create(data);
  }

  public static async deleteUser(id: string) {
    return await UserModel.delete(id);
  }

  public static async getUser(id: string) {
    return await UserModel.get(id);
  }
}

export default UserController;
