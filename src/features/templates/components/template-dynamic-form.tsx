"use client";

import React, { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import {
  Sparkles,
  Loader2,
  Copy,
  Check,
  RotateCcw,
  AlertCircle,
  FileCheck2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/shared/components/ui/field";
import {
  TemplateDetails,
  isInputRequired,
} from "../types/template";

interface TemplateDynamicFormProps {
  template: TemplateDetails;
}

export function TemplateDynamicForm({ template }: TemplateDynamicFormProps) {
  const t = useTranslations("TemplateDetails");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedValues, setSubmittedValues] = useState<Record<string, unknown> | null>(null);
  const [copied, setCopied] = useState(false);

  // 1. Build dynamic Zod Schema based on inputs
  const validationSchema = useMemo(() => {
    const shape: Record<string, z.ZodTypeAny> = {};

    for (const input of template.inputs || []) {
      const required = isInputRequired(input.is_required);
      const label = input.label || input.name;

      switch (input.type?.toLowerCase()) {
        case "number":
          if (required) {
            shape[input.name] = z.coerce
              .number({
                message: t("validation.numberInvalid", { field: label }),
              })
              .refine((val) => !isNaN(val), {
                message: t("validation.fieldRequired", { field: label }),
              });
          } else {
            shape[input.name] = z.coerce.number().optional();
          }
          break;

        case "checkbox":
          if (required) {
            shape[input.name] = z.boolean().refine((val) => val === true, {
              message: t("validation.fieldRequired", { field: label }),
            });
          } else {
            shape[input.name] = z.boolean().default(false);
          }
          break;

        case "email":
          if (required) {
            shape[input.name] = z
              .string()
              .trim()
              .min(1, { message: t("validation.fieldRequired", { field: label }) })
              .email({ message: t("validation.emailInvalid") });
          } else {
            shape[input.name] = z
              .string()
              .trim()
              .email({ message: t("validation.emailInvalid") })
              .or(z.literal(""));
          }
          break;

        case "url":
          if (required) {
            shape[input.name] = z
              .string()
              .trim()
              .min(1, { message: t("validation.fieldRequired", { field: label }) })
              .url({ message: t("validation.urlInvalid") });
          } else {
            shape[input.name] = z
              .string()
              .trim()
              .url({ message: t("validation.urlInvalid") })
              .or(z.literal(""));
          }
          break;

        default:
          if (required) {
            shape[input.name] = z
              .string()
              .trim()
              .min(1, { message: t("validation.fieldRequired", { field: label }) });
          } else {
            shape[input.name] = z.string().optional().default("");
          }
          break;
      }
    }

    return z.object(shape);
  }, [template.inputs, t]);

  // 2. Compute default values based on inputs
  const defaultValues = useMemo(() => {
    const defaults: Record<string, unknown> = {};
    for (const input of template.inputs || []) {
      if (input.type?.toLowerCase() === "checkbox") {
        defaults[input.name] = false;
      } else {
        defaults[input.name] = "";
      }
    }
    return defaults;
  }, [template.inputs]);

  // 3. React Hook Form instance
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Record<string, unknown>>({
    resolver: zodResolver(validationSchema),
    defaultValues,
    mode: "onBlur",
  });

  // 4. Handle form submission
  const onSubmit = async (values: Record<string, unknown>) => {
    setIsSubmitting(true);
    try {
      // Simulate submission & validate payload
      await new Promise((resolve) => setTimeout(resolve, 600));
      setSubmittedValues(values);
      toast.success(t("submitSuccess"));
    } catch {
      toast.error(t("submitError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyPayload = async () => {
    if (!submittedValues) return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(submittedValues, null, 2));
      setCopied(true);
      toast.success(t("copySuccess"));
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(t("copyError"));
    }
  };

  // 6. Handle empty inputs state
  if (!template.inputs || template.inputs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 sm:p-12 rounded-2xl bg-muted/20 border border-dashed border-border/70 text-center my-6">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground mb-3">
          <FileCheck2 className="size-6" />
        </div>
        <h3 className="text-base font-bold text-foreground">
          {t("emptyInputsTitle")}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-muted-foreground max-w-md">
          {t("emptyInputsMessage")}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-6">
      {/* Form Column */}
      <div className="lg:col-span-7 flex flex-col gap-6 rounded-2xl border border-border/80 bg-card/60 p-5 sm:p-6 shadow-xs backdrop-blur-sm">
        <div className="border-b border-border/40 pb-3">
          <h2 className="text-base sm:text-lg font-bold text-foreground">
            {t("formSectionTitle")}
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {t("formSectionSubtitle")}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {template.inputs.map((input) => {
            const required = isInputRequired(input.is_required);
            const inputType = input.type?.toLowerCase();
            const errorMessage = errors[input.name]?.message as string | undefined;

            return (
              <Field key={input.name} data-invalid={Boolean(errorMessage)}>
                {/* Field Label & Required Mark */}
                <FieldLabel htmlFor={input.name} className="flex items-center gap-1.5 font-semibold text-xs sm:text-sm text-foreground">
                  <span>{input.label || input.name}</span>
                  {required && (
                    <span className="text-brand font-bold" title={t("requiredField")}>
                      *
                    </span>
                  )}
                </FieldLabel>

                {/* Field Description / Helper Text */}
                {input.description && (
                  <FieldDescription className="text-xs text-muted-foreground -mt-1 leading-relaxed">
                    {input.description}
                  </FieldDescription>
                )}

                {/* Render Control by Input Type */}
                <Controller
                  name={input.name}
                  control={control}
                  render={({ field }) => {
                    if (inputType === "textarea") {
                      return (
                        <Textarea
                          id={input.name}
                          rows={4}
                          placeholder={input.placeholder || t("placeholders.textarea")}
                          aria-invalid={Boolean(errorMessage)}
                          className="bg-background/80"
                          value={String(field.value ?? "")}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                        />
                      );
                    }

                    if (inputType === "checkbox") {
                      return (
                        <div className="flex items-center gap-2.5 pt-1">
                          <input
                            type="checkbox"
                            id={input.name}
                            checked={Boolean(field.value)}
                            onChange={(e) => field.onChange(e.target.checked)}
                            onBlur={field.onBlur}
                            className="size-4.5 rounded-md border-border text-brand focus:ring-brand"
                          />
                          <label
                            htmlFor={input.name}
                            className="text-xs sm:text-sm text-foreground select-none cursor-pointer"
                          >
                            {input.label || input.name}
                          </label>
                        </div>
                      );
                    }

                    if (inputType === "select") {
                      const options = input.options || [];
                      return (
                        <select
                          id={input.name}
                          value={String(field.value ?? "")}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          className="h-10 w-full rounded-2xl border border-transparent bg-input/50 px-3.5 text-sm text-foreground transition-all outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 bg-background/80"
                        >
                          <option value="">{t("placeholders.select")}</option>
                          {options.map((opt, i) => {
                            const val = typeof opt === "string" ? opt : String(opt.value);
                            const lbl = typeof opt === "string" ? opt : opt.label;
                            return (
                              <option key={i} value={val}>
                                {lbl}
                              </option>
                            );
                          })}
                        </select>
                      );
                    }

                    // Default text, email, number, url, or fallback
                    return (
                      <Input
                        id={input.name}
                        type={
                          inputType === "email"
                            ? "email"
                            : inputType === "number"
                              ? "number"
                              : inputType === "url"
                                ? "url"
                                : "text"
                        }
                        placeholder={input.placeholder || t("placeholders.text")}
                        aria-invalid={Boolean(errorMessage)}
                        className="bg-background/80"
                        value={String(field.value ?? "")}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                      />
                    );
                  }}
                />

                {/* Field-Specific Error Message */}
                {errorMessage && (
                  <FieldError className="text-xs text-destructive flex items-center gap-1.5 mt-1">
                    <AlertCircle className="size-3.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </FieldError>
                )}
              </Field>
            );
          })}

          {/* Form Actions */}
          <div className="pt-2 flex items-center gap-3">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="gap-2 bg-brand text-brand-foreground hover:bg-brand/90 font-semibold px-5 py-2.5 rounded-full shadow-md shadow-brand/20 transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>{t("generating")}</span>
                </>
              ) : (
                <>
                  <Sparkles className="size-4" />
                  <span>{t("submitButton")}</span>
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => reset(defaultValues)}
              disabled={isSubmitting}
              className="rounded-full gap-1.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <RotateCcw className="size-3.5" />
              <span>{t("resetForm")}</span>
            </Button>
          </div>
        </form>
      </div>

      {/* Output / Preview Column */}
      <div className="lg:col-span-5 flex flex-col gap-4 rounded-2xl border border-border/80 bg-card/60 p-5 sm:p-6 shadow-xs backdrop-blur-sm">
        <div className="flex items-center justify-between border-b border-border/40 pb-3">
          <div>
            <h3 className="text-base font-bold text-foreground">
              {t("previewSectionTitle")}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {t("previewSectionSubtitle")}
            </p>
          </div>

          {submittedValues && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCopyPayload}
              className="rounded-full gap-1.5 text-xs cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="size-3.5 text-green-500" />
                  <span>{t("copied")}</span>
                </>
              ) : (
                <>
                  <Copy className="size-3.5" />
                  <span>{t("copyValues")}</span>
                </>
              )}
            </Button>
          )}
        </div>

        {submittedValues ? (
          <div className="flex flex-col gap-3 animate-in fade-in-50 duration-300">
            <div className="rounded-xl bg-background/80 border border-border/60 p-4 font-mono text-xs overflow-x-auto text-foreground dir-ltr leading-relaxed max-h-96">
              <pre>{JSON.stringify(submittedValues, null, 2)}</pre>
            </div>
            <p className="text-xs text-muted-foreground italic">
              {t("backendNotice")}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center text-muted-foreground my-6">
            <Sparkles className="size-8 stroke-[1.3] text-muted-foreground/60 mb-2" />
            <p className="text-xs sm:text-sm font-medium">
              {t("previewPlaceholderTitle")}
            </p>
            <p className="text-xs text-muted-foreground/80 mt-1 max-w-xs">
              {t("previewPlaceholderDesc")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
