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

export type TemplateInput = {
  name: string;
  is_required: string | number | boolean;
  label: string;
  type: string;
  description?: string | null;
  placeholder?: string | null;
  options?: Array<{ label: string; value: string | number }> | string[];
};

export type TemplateDetails = {
  id: number;
  name: string;
  description: string;
  logo: string;
  slug: string;
  inputs: TemplateInput[];
};

export type TemplateDetailsResponse = {
  success: boolean;
  message: string;
  data: TemplateDetails;
};

export interface FetchTemplateDetailsParams {
  slug: string;
  lang: string;
}

export function isInputRequired(isRequired: string | number | boolean | null | undefined): boolean {
  if (isRequired === true || isRequired === 1 || isRequired === "1") {
    return true;
  }
  return false;
}

