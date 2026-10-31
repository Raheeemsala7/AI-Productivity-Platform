import { z } from "zod";

export const presentationFormSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(5, { message: "يجب كتابة وصف للعرض التقديمي لا يقل عن 5 أحرف" })
    .max(1000, { message: "الوصف طويل جداً (الحد الأقصى 1000 حرف)" }),
  language: z.enum(["ar", "en"]),
  theme: z.enum(["obsidian", "corporate", "emerald", "sunset"]),
  slidesCount: z.number().min(4).max(20),
  tone: z.enum(["persuasive", "executive", "educational"]),
  audience: z.enum(["investors", "clients", "internal", "conference"]),
  format: z.enum(["16:9", "4:3"]),
});

export type PresentationFormValues = z.infer<typeof presentationFormSchema>;
