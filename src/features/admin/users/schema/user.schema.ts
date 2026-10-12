import { z } from "zod";

export const createUserSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    password_confirmation: z.string().min(6, "Password confirmation must be at least 6 characters"),
    credits: z.number().min(0, "Credits cannot be negative"),
    status: z.number(),
    role: z.enum(["user", "admin"]),
    subscription: z.union([z.string(), z.number()]).optional(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export type CreateUserFormType = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  status: z.number(),
  credits: z.number().min(0, "Credits cannot be negative").optional(),
  role: z.string().optional(),
  subscription: z.union([z.string(), z.number()]).optional().nullable(),
});

export type UpdateUserFormType = z.infer<typeof updateUserSchema>;
