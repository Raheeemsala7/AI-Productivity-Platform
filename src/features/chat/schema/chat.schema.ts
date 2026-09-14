import z from "zod";


export const chatInputSchema = z.object({
    // Message may be empty when the user sends attachments / a voice message.
    message: z.string().trim(),
  });