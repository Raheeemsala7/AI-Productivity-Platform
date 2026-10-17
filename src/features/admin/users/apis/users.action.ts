"use server";

import { revalidatePath } from "next/cache";
import { HEADERS } from "@/shared/constant/api.constant";
import { RESPONSES } from "@/shared/constant/api.responses";
import { getNextAuthToken } from "@/shared/lib/utils/auth.util";
import { getErrorMessage } from "@/shared/lib/utils/get-error-message";
import {
  createUserSchema,
  CreateUserFormType,
  updateUserSchema,
  UpdateUserFormType,
} from "../schema/user.schema";
import { ApiResponsePayload } from "@/shared/types/api";
import { ShowUserData } from "../types/user";

export async function createUserAction(values: CreateUserFormType) {
  const token = await getNextAuthToken();

  if (!token?.token) {
    return RESPONSES.unauthorizedS;
  }

  const validation = createUserSchema.safeParse(values);
  if (!validation.success) {
    return {
      success: false as const,
      message: "Validation failed",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  try {
    const formData = new FormData();
    formData.append("name", validation.data.name);
    formData.append("email", validation.data.email);
    formData.append("password", validation.data.password);
    formData.append("password_confirmation", validation.data.password_confirmation);
    formData.append("status", String(validation.data.status ?? 1));
    formData.append("role", validation.data.role || "user");
    if (validation.data.credits !== undefined && validation.data.credits !== null) {
      formData.append("credits", String(validation.data.credits));
    }
    if (validation.data.subscription) {
      formData.append("subscription", String(validation.data.subscription));
    }

    const res = await fetch(`${process.env.API_URL}/admin/users`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.token}`,
        Accept: "application/json",
      },
      body: formData,
    });

    const data = await res.json();
    const isSuccess = data.success ?? data.status;

    if (!isSuccess) {
      return {
        success: false as const,
        message: getErrorMessage(data.message, "Failed to create user"),
      };
    }

    revalidatePath("/[locale]/admin/users", "page");
    return {
      success: true as const,
      message: data.message || "User created successfully",
      data: data.data || data.payload,
    };
  } catch (error) {
    return {
      success: false as const,
      message: getErrorMessage(error, "Failed to create user"),
    };
  }
}

export async function updateUserAction(id: string | number, values: UpdateUserFormType) {
  const token = await getNextAuthToken();

  if (!token?.token) {
    return RESPONSES.unauthorizedS;
  }

  const validation = updateUserSchema.safeParse(values);
  if (!validation.success) {
    return {
      success: false as const,
      message: "Validation failed",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  try {
    const body: Record<string, any> = {
      name: validation.data.name,
      email: validation.data.email,
      status: validation.data.status,
      credits: validation.data.credits,
    };

    if (validation.data.role) {
      body.role = validation.data.role;
    }

    if (validation.data.subscription) {
      body.subscription = validation.data.subscription;
    }

    const res = await fetch(`${process.env.API_URL}/admin/users/${id}`, {
      method: "PUT",
      headers: {
        ...HEADERS.JsonBody,
        Authorization: `Bearer ${token.token}`,
      },
      body: JSON.stringify(body),
    });

    console.log("Body :", body);

    const data: ApiResponsePayload<ShowUserData> = await res.json();
    console.log(data);

    if (!data.success) {
      return {
        success: false as const,
        message: getErrorMessage(data.message, "Failed to update user"),
      };
    }

    revalidatePath("/[locale]/admin/users", "page");
    return {
      success: true as const,
      message: data.message || "User updated successfully",
      data: data.data,
    };
  } catch (error) {
    return {
      success: false as const,
      message: getErrorMessage(error, "Failed to update user"),
    };
  }
}

export async function deleteUserAction(id: string | number) {
  const token = await getNextAuthToken();

  if (!token?.token) {
    return RESPONSES.unauthorizedS;
  }

  try {
    const res = await fetch(`${process.env.API_URL}/admin/users/${id}`, {
      method: "DELETE",
      headers: {
        ...HEADERS.JsonBody,
        Authorization: `Bearer ${token.token}`,
      },
    });

    const data = await res.json();
    const isSuccess = data.success ?? data.status;

    if (!isSuccess) {
      return {
        success: false as const,
        message: getErrorMessage(data.message, "Failed to delete user"),
      };
    }

    revalidatePath("/[locale]/admin/users", "page");
    return {
      success: true as const,
      message: data.message || "User deleted successfully",
    };
  } catch (error) {
    return {
      success: false as const,
      message: getErrorMessage(error, "Failed to delete user"),
    };
  }
}