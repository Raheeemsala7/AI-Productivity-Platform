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
    avatar_color?: string;
    avatar?: any;
  }
): Promise<UpdateProfileActionResult> {
  let name = "";
  let slogan = "";
  let avatar_color = "#42a5f5";
  let avatarFile: File | null = null;
  let hasFile = false;

  if (data instanceof FormData) {
    name = (data.get("name") as string) || "";
    slogan = (data.get("slogan") as string) || "";
    avatar_color = (data.get("avatar_color") as string) || "#42a5f5";
    const file = data.get("avatar");
    if (file instanceof File && file.size > 0) {
      avatarFile = file;
      hasFile = true;
    }
  } else {
    name = data.name;
    slogan = data.slogan || "";
    avatar_color = data.avatar_color || "#42a5f5";
    if (data.avatar instanceof File && data.avatar.size > 0) {
      avatarFile = data.avatar;
      hasFile = true;
    }
  }

  // Validate fields with Zod
  const validation = updateProfileSchema.safeParse({
    name,
    slogan,
    avatar_color,
  });

  if (!validation.success) {
    return {
      success: false,
      message: "Please correct the errors in the form.",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  // Construct payload to forward
  let forwardPayload: FormData | Record<string, any>;

  if (hasFile && avatarFile) {
    const formData = new FormData();
    formData.append("name", validation.data.name);
    if (validation.data.slogan !== undefined) {
      formData.append("slogan", validation.data.slogan);
    }
    if (validation.data.avatar_color) {
      formData.append("avatar_color", validation.data.avatar_color);
    }
    formData.append("avatar", avatarFile);
    forwardPayload = formData;
  } else {
    const body: Record<string, any> = {
      name: validation.data.name,
      slogan: validation.data.slogan || "",
      avatar_color: validation.data.avatar_color,
    };
    forwardPayload = body;
  }

  const result = await updateProfileBackendApi(forwardPayload);

  if (result.success) {
    revalidatePath("/[locale]/dashboard/settings", "page");
    revalidatePath("/[locale]/dashboard", "layout");
  }

  return result;
}

