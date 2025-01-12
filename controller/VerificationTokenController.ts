import VerificationTokenModel from "@/model/VerificationTokenModel";

class VerificationTokenController {
  static delete(email: string, token: string) {
    return VerificationTokenModel.delete(email, token);
  }
  public static async createToken({
    identifier,
    token,
    expires,
  }: {
    identifier: string;
    token: string;
    expires: Date;
  }): Promise<boolean> {
    console.log({ identifier, token, expires });

    return await VerificationTokenModel.create({ identifier, token, expires });
  }

  public static async getToken(token: string) {
    return await VerificationTokenModel.getByToken(token);
  }

  public static async getByIdentifier(id: string) {
    return await VerificationTokenModel.get(id);
  }
}

export default VerificationTokenController;
