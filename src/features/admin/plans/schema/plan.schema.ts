import { z } from "zod";

export const planSchema = z.object({
  name: z.string().min(1, "Name is required"),
  name_ar: z.string().min(1, "Arabic name is required"),
  description: z.string().min(1, "Description is required"),
  description_ar: z.string().min(1, "Arabic description is required"),
  price: z.number().min(0, "Price must be at least 0"),
  frequency: z.string().min(1, "Frequency is required"),
  credits: z.number().min(0, "Credits must be at least 0"),
  active: z.boolean(),
  is_featured: z.boolean(),
  trial_days: z.number().min(0, "Trial days must be at least 0"),
  features: z.array(z.string().min(1, "Feature item cannot be empty")).min(1, "At least one feature is required"),
  features_ar: z.array(z.string().min(1, "Arabic feature item cannot be empty")).min(1, "At least one Arabic feature is required"),
});

export type PlanFormType = z.infer<typeof planSchema>;
