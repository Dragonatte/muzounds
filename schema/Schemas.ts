import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const LoginSchema = z.object({
  username: z
    .string({ required_error: "El nombre de usuario es necesario" })
    .min(3)
    .max(20),
  password: z.string({ required_error: "La contraseña en necesaria" }).min(8),
});

export const SignUpSchema = z.object({
  fullName: z
    .string({ required_error: "El nombre completo es necesario" })
    .min(3)
    .max(50),
  email: z
    .string({ required_error: "El correo electrónico es necesario" })
    .email({ message: "El correo electrónico no es válido" }),
  username: z
    .string({ required_error: "El nombre de usuario es necesario" })
    .min(3)
    .max(20),
  password: z.string({ required_error: "La contraseña en necesaria" }).min(8),
  verifyPassword: z
    .string({ required_error: "La verificación de contraseña es necesaria" })
    .min(8),
});
