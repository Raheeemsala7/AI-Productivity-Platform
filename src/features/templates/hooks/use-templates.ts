"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTemplatesApi } from "../apis/templates.api";
import { TemplateType, TemplatesResponse } from "../types/template";

export interface UseTemplatesOptions {
  lang: string;
  type: TemplateType;
  categoryId?: number | string | null;
  enabled?: boolean;
}

export function getTemplatesQueryKey(options: {
  lang: string;
  type: TemplateType;
  categoryId?: number | string | null;
}) {
  return [
    "templates",
    {
      lang: options.lang,
      type: options.type,
      categoryId: options.categoryId ?? "default",
    },
  ] as const;
}

export function useTemplates({
  lang,
  type,
  categoryId,
  enabled = true,
}: UseTemplatesOptions) {
  return useQuery<TemplatesResponse, Error>({
    queryKey: getTemplatesQueryKey({ lang, type, categoryId }),
    queryFn: () =>
      getTemplatesApi({
        lang,
        type,
        category_id: categoryId,
      }),
    enabled: Boolean(enabled && type && lang),
    staleTime: 60 * 1000, // 1 minute fresh
    gcTime: 5 * 60 * 1000, // 5 minutes cache retention
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}
