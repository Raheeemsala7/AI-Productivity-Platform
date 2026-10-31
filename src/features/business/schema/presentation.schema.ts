import { z } from "zod";

export const presentationFormSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(3, { message: "يرجى كتابة فكرة أو وصف لا يقل عن 3 أحرف" })
    .max(1500, { message: "الوصف طويل جداً (الحد الأقصى 1500 حرف)" }),
  mode: z.enum(["general", "presentation", "landing", "document", "carousel"]),
  language: z.enum(["ar", "en"]),
  theme: z.enum(["obsidian", "corporate", "emerald", "sunset"]),
  slidesCount: z.number().min(4).max(20),
  sectionsCount: z.number().min(3).max(8),
  tone: z.enum(["persuasive", "executive", "educational", "creative"]),
  audience: z.enum(["investors", "clients", "internal", "conference"]),
  format: z.enum(["16:9", "4:3"]),
  model: z.enum(["lite", "pro"]),
});

export type PresentationFormValues = z.infer<typeof presentationFormSchema>;
