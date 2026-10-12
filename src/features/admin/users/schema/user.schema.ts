import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  status: z.number(),
  credits: z.number().min(0, "Credits cannot be negative").optional(),
  slogan: z.string().optional().nullable(),
});

export type UpdateUserFormType = z.infer<typeof updateUserSchema>;
