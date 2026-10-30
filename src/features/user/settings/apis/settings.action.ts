"use server";

import { revalidatePath } from "next/cache";
import { updateProfileSchema } from "../schema/settings.schema";
import { updateProfileBackendApi } from "./settings.api";
import { User } from "@/features/auth/types/auth";

export interface UpdateProfileActionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  user?: User;
}

export async function updateProfileAction(
  data: FormData | {
    name: string;
    slogan?: string;
  }
): Promise<UpdateProfileActionResult> {
  let name = "";
  let slogan = "";

  if (data instanceof FormData) {
    name = (data.get("name") as string) || "";
    slogan = (data.get("slogan") as string) || "";
  } else {
    name = data.name;
    slogan = data.slogan || "";
  }

  // Validate fields with Zod
  const validation = updateProfileSchema.safeParse({
    name,
    slogan,
  });

  if (!validation.success) {
    return {
      success: false,
      message: "Please correct the errors in the form.",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const payload: Record<string, any> = {
    name: validation.data.name,
    slogan: validation.data.slogan || "",
  };

  const result = await updateProfileBackendApi(payload);

  if (result.success) {
    revalidatePath("/[locale]/dashboard/settings", "page");
    revalidatePath("/[locale]/dashboard", "layout");
  }

  return result;
}
