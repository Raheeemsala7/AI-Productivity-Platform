export type TemplateType = "writing" | "business";

export const VALID_TEMPLATE_TYPES: readonly TemplateType[] = ["writing", "business"] as const;

export function isValidTemplateType(type: unknown): type is TemplateType {
  return typeof type === "string" && (type === "writing" || type === "business");
}

export type TemplateCategory = {
  id: number;
  name: string;
};

export type Template = {
  name: string;
  logo: string;
  description: string;
  slug: string;
};

export type TemplatesData = {
  categories: TemplateCategory[];
  selected_category_id: number;
  templates: Template[];
};

export type TemplatesResponse = {
  success: boolean;
  message: string;
  data: TemplatesData;
};

export interface FetchTemplatesParams {
  lang: string;
  type: TemplateType;
  category_id?: number | string | null;
}
