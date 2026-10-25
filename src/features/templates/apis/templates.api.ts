import {
  FetchTemplatesParams,
  TemplatesResponse,
} from "../types/template";

/**
 * Fetches templates from the Next.js Route Handler /api/user/templates.
 * Sends lang, type (writing | business), and optional category_id.
 */
export async function getTemplatesApi({
  lang,
  type,
  category_id,
}: FetchTemplatesParams): Promise<TemplatesResponse> {
  const query = new URLSearchParams();
  query.set("lang", lang);
  query.set("type", type);
  if (category_id !== undefined && category_id !== null && category_id !== "") {
    query.set("category_id", String(category_id));
  }

  const res = await fetch(`/api/user/templates?${query.toString()}`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
    },
  });

  const data: TemplatesResponse = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to fetch templates");
  }

  return data;
}
