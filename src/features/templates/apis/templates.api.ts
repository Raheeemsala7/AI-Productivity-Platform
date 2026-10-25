import { HEADERS } from "@/shared/constant/api.constant";
import { getNextAuthToken } from "@/shared/lib/utils/auth.util";
import {
  FetchTemplatesParams,
  TemplatesResponse,
  FetchTemplateDetailsParams,
  TemplateDetailsResponse,
} from "../types/template";

/**
 * Server-side data fetching for templates library list directly from the backend API.
 * Uses Next.js auth session token from secure server cookies.
 */
export async function getTemplatesServer({
  lang,
  type,
  category_id,
}: FetchTemplatesParams): Promise<TemplatesResponse> {
  const token = await getNextAuthToken();

  if (!token?.token) {
    return {
      success: false,
      message: "Unauthorized",
      data: {
        categories: [],
        selected_category_id: 0,
        templates: [],
      },
    };
  }

  const query = new URLSearchParams();
  query.set("lang", lang);
  query.set("type", type);
  if (category_id !== undefined && category_id !== null && category_id !== "") {
    query.set("category_id", String(category_id));
  }

  try {
    const res = await fetch(`${process.env.API_URL}/user/templates?${query.toString()}`, {
      method: "GET",
      headers: {
        ...HEADERS.JsonBody,
        ...HEADERS.AcceptLanguage(lang),
        ...HEADERS.authorize(token.token),
      },
      next: {
        revalidate: 60,
        tags: [`templates-${type}-${lang}`],
      },
    });

    const data: TemplatesResponse = await res.json();
    return data;
  } catch (error) {
    console.error("[getTemplatesServer] Fetch failed:", error);
    return {
      success: false,
      message: "Failed to fetch templates from server",
      data: {
        categories: [],
        selected_category_id: 0,
        templates: [],
      },
    };
  }
}

/**
 * Server-side data fetching for a single template details & dynamic inputs.
 */
export async function getTemplateDetailsServer({
  slug,
  lang,
}: FetchTemplateDetailsParams): Promise<TemplateDetailsResponse> {
  const token = await getNextAuthToken();

  if (!token?.token) {
    return {
      success: false,
      message: "Unauthorized",
      data: {
        id: 0,
        name: "",
        description: "",
        logo: "",
        slug: "",
        inputs: [],
      },
    };
  }

  try {
    const res = await fetch(
      `${process.env.API_URL}/user/templates/${encodeURIComponent(slug)}?lang=${encodeURIComponent(lang)}`,
      {
        method: "GET",
        headers: {
          ...HEADERS.JsonBody,
          ...HEADERS.AcceptLanguage(lang),
          ...HEADERS.authorize(token.token),
        },
        next: {
          revalidate: 60,
          tags: [`template-details-${slug}-${lang}`],
        },
      }
    );

    const data: TemplateDetailsResponse = await res.json();
    return data;
  } catch (error) {
    console.error("[getTemplateDetailsServer] Fetch failed:", error);
    return {
      success: false,
      message: "Failed to fetch template details from server",
      data: {
        id: 0,
        name: "",
        description: "",
        logo: "",
        slug: "",
        inputs: [],
      },
    };
  }
}

/**
 * Client-side fetcher for template details from Route Handler /api/user/templates/{slug}.
 */
export async function getTemplateDetailsApi({
  slug,
  lang,
}: FetchTemplateDetailsParams): Promise<TemplateDetailsResponse> {
  const res = await fetch(
    `/api/user/templates/${encodeURIComponent(slug)}?lang=${encodeURIComponent(lang)}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );

  const data: TemplateDetailsResponse = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to fetch template details");
  }
  return data;
}

/**
 * Safely extracts generated result text from various potential API response shapes.
 */
export function extractGeneratedResultText(data: unknown): string {
  if (!data) return "";
  if (typeof data === "string") return data.trim();

  if (typeof data === "object") {
    const record = data as Record<string, unknown>;

    // Priority 1: Direct string candidate keys
    const directKeys = [
      "result",
      "content",
      "output",
      "generated_text",
      "text",
      "response",
      "data",
      "payload",
    ];

    for (const key of directKeys) {
      const val = record[key];
      if (typeof val === "string" && val.trim() !== "") {
        return val.trim();
      }
    }

    // Priority 2: Nested data or payload objects
    if (record.data && typeof record.data === "object") {
      const extracted = extractGeneratedResultText(record.data);
      if (extracted) return extracted;
    }

    if (record.payload && typeof record.payload === "object") {
      const extracted = extractGeneratedResultText(record.payload);
      if (extracted) return extracted;
    }
  }

  return "";
}

export interface GenerateTemplateResultResult {
  success: boolean;
  message?: string;
  generatedText: string;
  raw: unknown;
}

/**
 * Client-side API caller for generating template results via POST /api/user/templates/result.
 */
export async function generateTemplateResultApi(
  payload: Record<string, unknown>
): Promise<GenerateTemplateResultResult> {
  const res = await fetch("/api/user/templates/result", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok || (data && data.success === false)) {
    const errorMsg =
      data?.message ||
      (data?.errors ? Object.values(data.errors).flat().join(", ") : null) ||
      `Generation failed with status ${res.status}`;
    throw new Error(errorMsg);
  }

  const generatedText = extractGeneratedResultText(data);

  if (!generatedText) {
    // If the backend returned a success without text, check if there's a fallback message
    const fallback =
      typeof data?.message === "string" && data.message !== "Success"
        ? data.message
        : "";
    if (fallback) {
      return {
        success: true,
        message: data?.message,
        generatedText: fallback,
        raw: data,
      };
    }
    throw new Error("No generated content received from the template API.");
  }

  return {
    success: true,
    message: data?.message,
    generatedText,
    raw: data,
  };
}
