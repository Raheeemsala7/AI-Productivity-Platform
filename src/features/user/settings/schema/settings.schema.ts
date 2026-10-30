import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(100, { message: "Name must be less than 100 characters" }),
  slogan: z
    .string()
    .trim()
    .max(150, { message: "Slogan must be less than 150 characters" })
    .optional(),
});

export type UpdateProfileSchemaType = z.infer<typeof updateProfileSchema>;
