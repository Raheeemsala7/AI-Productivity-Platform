import { z } from "zod";

export const couponSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  code: z.string().min(2, "Code must be at least 2 characters").toUpperCase(),
  discount: z.number().min(1, "Discount must be at least 1"),
  limit: z.number().min(1, "Usage limit must be at least 1"),
});

export type CouponFormType = z.infer<typeof couponSchema>;
