import z from "zod";


export const chatInputSchema = z.object({
    message: z.string().trim().min(1),
  });