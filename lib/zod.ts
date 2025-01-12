import { object, string } from "zod";

export const siginSchema = object({
  username: string({ required_error: "El nombre de usuario es necesario" })
    .min(3)
    .max(20),
  password: string({ required_error: "La contraseña en necesaria" })
    .min(8)
    .max(20),
});
