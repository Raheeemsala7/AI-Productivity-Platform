"use server";

import { revalidatePath } from "next/cache";
import { HEADERS } from "@/shared/constant/api.constant";
import { RESPONSES } from "@/shared/constant/api.responses";
import { getNextAuthToken } from "@/shared/lib/utils/auth.util";
import { getErrorMessage } from "@/shared/lib/utils/get-error-message";
import { updateUserSchema, UpdateUserFormType } from "../schema/user.schema";

export async function deleteUserAction(id: string | number) {
    const token = await getNextAuthToken();

    if (!token?.token) {
        return RESPONSES.unauthorized;
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
        const isSuccess = data.status ?? data.success;

        if (!isSuccess) {
            return {
                status: false as const,
                message: getErrorMessage(data.message, "Failed to delete user"),
            };
        }

        revalidatePath("/[locale]/admin/users", "page");
        return {
            status: true as const,
            message: data.message || "User deleted successfully",
        };
    } catch (error) {
        return {
            status: false as const,
            message: getErrorMessage(error, "Failed to delete user"),
        };
    }
}

export async function updateUserAction(id: string | number, values: UpdateUserFormType) {
    const token = await getNextAuthToken();

    if (!token?.token) {
        return RESPONSES.unauthorized;
    }

    const validation = updateUserSchema.safeParse(values);
    if (!validation.success) {
        return {
            status: false as const,
            message: "Validation failed",
            errors: validation.error.flatten().fieldErrors,
        };
    }

    try {
        const res = await fetch(`${process.env.API_URL}/admin/users/${id}`, {
            method: "PUT",
            headers: {
                ...HEADERS.JsonBody,
                Authorization: `Bearer ${token.token}`,
            },
            body: JSON.stringify(validation.data),
        });

        const data = await res.json();
        const isSuccess = data.status ?? data.success;

        if (!isSuccess) {
            return {
                status: false as const,
                message: getErrorMessage(data.message, "Failed to update user"),
            };
        }

        revalidatePath("/[locale]/admin/users", "page");
        return {
            status: true as const,
            message: data.message || "User updated successfully",
            payload: data.payload,
        };
    } catch (error) {
        return {
            status: false as const,
            message: getErrorMessage(error, "Failed to update user"),
        };
    }
}