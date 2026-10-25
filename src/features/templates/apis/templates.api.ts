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
