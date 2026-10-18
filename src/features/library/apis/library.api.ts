"use server";

import { HEADERS } from "@/shared/constant/api.constant";
import { RESPONSES } from "@/shared/constant/api.responses";
import { getNextAuthToken } from "@/shared/lib/utils/auth.util";
import { ApiResponse } from "@/shared/types/api";
import { extractFilePath } from "../utils/library.util";

export type LibraryFile = {
    name: string;
    view_url: string;
    url?: string;
};

export async function getAllFilesLibrary(): Promise<ApiResponse<{ files: LibraryFile[] }>> {
    const token = await getNextAuthToken();

    if (!token?.token) {
        return RESPONSES.unauthorizedS as unknown as ApiResponse<{ files: LibraryFile[] }>;
    }

    try {
        const res = await fetch(`${process.env.API_URL}/user/library`, {
            method: "GET",
            headers: {
                ...HEADERS.JsonBody,
                ...HEADERS.authorize(token.token),
            },
            cache: "no-store",
        });

        const data: ApiResponse<{ files: LibraryFile[] }> = await res.json();

        if (!data.success) {
            return {
                success: false,
                code: 500,
                message: data.message || "Failed to get files",
                payload: { files: [] },
            };
        }

        return data;
    } catch (error) {
        console.error("Error in getAllFilesLibrary:", error);
        return {
            success: false,
            code: 500,
            message: "Failed to get files",
            payload: { files: [] },
        };
    }
}

export type OneFileLibraryResult = {
    success: boolean;
    dataUrl?: string;
    contentType?: string;
    size?: number;
    message?: string;
};

export async function getOneFileLibrary(path: string): Promise<OneFileLibraryResult> {
    const token = await getNextAuthToken();

    if (!token?.token) {
        return {
            success: false,
            message: "Unauthorized",
        };
    }

    try {
        const cleanPath = extractFilePath(path);
        const res = await fetch(`${process.env.API_URL}/user/files/view?path=${encodeURIComponent(cleanPath)}`, {
            method: "GET",
            headers: {
                ...HEADERS.authorize(token.token),
            },
            cache: "no-store",
        });

        if (!res.ok) {
            return {
                success: false,
                message: `Failed to fetch file: ${res.statusText || res.status}`,
            };
        }

        const contentType = res.headers.get("content-type") || "application/octet-stream";
        const arrayBuffer = await res.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64 = buffer.toString("base64");
        const dataUrl = `data:${contentType};base64,${base64}`;

        return {
            success: true,
            dataUrl,
            contentType,
            size: buffer.length,
        };
    } catch (error) {
        console.error("Error in getOneFileLibrary:", error);
        return {
            success: false,
            message: "Failed to get file",
        };
    }
}
