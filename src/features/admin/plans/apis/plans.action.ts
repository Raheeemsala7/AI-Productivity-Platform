"use server";

import { revalidatePath } from "next/cache";
import { HEADERS } from "@/shared/constant/api.constant";
import { RESPONSES } from "@/shared/constant/api.responses";
import { getNextAuthToken } from "@/shared/lib/utils/auth.util";
import { getErrorMessage } from "@/shared/lib/utils/get-error-message";
import { planSchema, PlanFormType } from "../schema/plan.schema";
import { getPlanByIdApi } from "./plans.api";

export async function createPlanAction(values: PlanFormType) {
  const token = await getNextAuthToken();

  if (!token?.token) {
    return RESPONSES.unauthorizedS;
  }

  const validation = planSchema.safeParse(values);
  if (!validation.success) {
    return {
      success: false as const,
      message: "Validation failed",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await fetch(`${process.env.API_URL}/admin/plans`, {
      method: "POST",
      headers: {
        ...HEADERS.JsonBody,
        Authorization: `Bearer ${token.token}`,
      },
      body: JSON.stringify(validation.data),
    });

    const data = await res.json();
    const isSuccess = data.status ?? data.success ?? res.ok;

    if (!isSuccess) {
      return {
        success: false as const,
        message: getErrorMessage(data.message, "Failed to create plan"),
      };
    }

    revalidatePath("/[locale]/admin/plans", "page");
    return {
      success: true as const,
      message: data.message || "Plan created successfully",
      data: data.payload || data.data,
    };
  } catch (error) {
    return {
      success: false as const,
      message: getErrorMessage(error, "Failed to create plan"),
    };
  }
}

export async function updatePlanAction(id: string | number, values: PlanFormType) {
  const token = await getNextAuthToken();

  if (!token?.token) {
    return RESPONSES.unauthorizedS;
  }

  const validation = planSchema.safeParse(values);
  if (!validation.success) {
    return {
      success: false as const,
      message: "Validation failed",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await fetch(`${process.env.API_URL}/admin/plans/${id}`, {
      method: "PUT",
      headers: {
        ...HEADERS.JsonBody,
        Authorization: `Bearer ${token.token}`,
      },
      body: JSON.stringify(validation.data),
    });

    const data = await res.json();
    const isSuccess = data.status ?? data.success ?? res.ok;

    if (!isSuccess) {
      return {
        success: false as const,
        message: getErrorMessage(data.message, "Failed to update plan"),
      };
    }

    revalidatePath("/[locale]/admin/plans", "page");
    return {
      success: true as const,
      message: data.message || "Plan updated successfully",
      data: data.payload || data.data,
    };
  } catch (error) {
    return {
      success: false as const,
      message: getErrorMessage(error, "Failed to update plan"),
    };
  }
}

export async function deletePlanAction(id: string | number) {
  const token = await getNextAuthToken();

  if (!token?.token) {
    return RESPONSES.unauthorizedS;
  }

  try {
    const res = await fetch(`${process.env.API_URL}/admin/plans/${id}`, {
      method: "DELETE",
      headers: {
        ...HEADERS.JsonBody,
        Authorization: `Bearer ${token.token}`,
      },
    });

    const data = await res.json();
    const isSuccess = data.status ?? data.success ?? res.ok;

    if (!isSuccess) {
      return {
        success: false as const,
        message: getErrorMessage(data.message, "Failed to delete plan"),
      };
    }

    revalidatePath("/[locale]/admin/plans", "page");
    return {
      success: true as const,
      message: data.message || "Plan deleted successfully",
    };
  } catch (error) {
    return {
      success: false as const,
      message: getErrorMessage(error, "Failed to delete plan"),
    };
  }
}

export async function getPlanDetailsAction(id: string | number) {
  return await getPlanByIdApi(id);
}
