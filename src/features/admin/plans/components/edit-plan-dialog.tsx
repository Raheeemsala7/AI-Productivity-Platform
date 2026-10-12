"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Edit2, Plus, Trash2, Loader2, Sparkles, DollarSign, Coins, Clock, Star, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Plan } from "../types/plan";
import { planSchema, PlanFormType } from "../schema/plan.schema";
import { updatePlanAction, getPlanDetailsAction } from "../apis/plans.action";

interface EditPlanDialogProps {
  plan: Plan;
}

interface FeatureItem {
  en: string;
  ar: string;
}

export function EditPlanDialog({ plan }: EditPlanDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const t = useTranslations("AdminPlans");

  const buildInitialFeatures = (p: Plan): FeatureItem[] => {
    const enArr = p.features || [];
    const arArr = p.features_ar || [];
    const maxLen = Math.max(enArr.length, arArr.length);

    if (maxLen === 0) return [{ en: "", ar: "" }];

    const items: FeatureItem[] = [];
    for (let i = 0; i < maxLen; i++) {
      items.push({
        en: enArr[i] || "",
        ar: arArr[i] || "",
      });
    }
    return items;
  };

  const [featuresList, setFeaturesList] = useState<FeatureItem[]>(() => buildInitialFeatures(plan));

  const form = useForm<PlanFormType>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      name: plan.name || "",
      name_ar: plan.name_ar || plan.name || "",
      description: plan.description || "",
      description_ar: plan.description_ar || plan.description || "",
      price: Number(plan.price) || 0,
      frequency: plan.frequency || "monthly",
      credits: Number(plan.credits) || 0,
      active: Boolean(plan.active),
      is_featured: Boolean(plan.is_featured),
      trial_days: Number(plan.trial_days) || 0,
      features: plan.features && plan.features.length > 0 ? plan.features : [""],
      features_ar: plan.features_ar && plan.features_ar.length > 0 ? plan.features_ar : [""],
    },
  });

  const handleOpenChange = async (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      // Fetch full details if name_ar or features_ar is missing
      if (!plan.name_ar || !plan.features_ar) {
        setIsLoadingDetails(true);
        try {
          const res = await getPlanDetailsAction(plan.id);
          if (res.success && res.data) {
            const fullPlan = res.data;
            form.reset({
              name: fullPlan.name || "",
              name_ar: fullPlan.name_ar || fullPlan.name || "",
              description: fullPlan.description || "",
              description_ar: fullPlan.description_ar || fullPlan.description || "",
              price: Number(fullPlan.price) || 0,
              frequency: fullPlan.frequency || "monthly",
              credits: Number(fullPlan.credits) || 0,
              active: Boolean(fullPlan.active),
              is_featured: Boolean(fullPlan.is_featured),
              trial_days: Number(fullPlan.trial_days) || 0,
              features: fullPlan.features || [""],
              features_ar: fullPlan.features_ar || [""],
            });
            setFeaturesList(buildInitialFeatures(fullPlan));
          }
        } catch {
          // ignore error, stick to initial values
        } finally {
          setIsLoadingDetails(false);
        }
      }
    }
  };

  const handleAddFeature = () => {
    setFeaturesList((prev) => [...prev, { en: "", ar: "" }]);
  };

  const handleRemoveFeature = (index: number) => {
    setFeaturesList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateFeature = (index: number, lang: "en" | "ar", val: string) => {
    setFeaturesList((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [lang]: val };
      return next;
    });
  };

  const onSubmit = (values: PlanFormType) => {
    const enFeatures = featuresList.map((f) => f.en.trim()).filter(Boolean);
    const arFeatures = featuresList.map((f) => f.ar.trim()).filter(Boolean);

    if (enFeatures.length === 0 || arFeatures.length === 0) {
      toast.error(t("atLeastOneFeature") || "Please provide at least one feature in both English and Arabic.");
      return;
    }

    const payload: PlanFormType = {
      ...values,
      features: enFeatures,
      features_ar: arFeatures,
    };

    startTransition(async () => {
      try {
        const res = await updatePlanAction(plan.id, payload);
        if (res.success) {
          toast.success(t("updateSuccess") || "Plan updated successfully");
          setOpen(false);
          router.refresh();
        } else {
          toast.error(res.message || "Failed to update plan");
        }
      } catch {
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            title={t("edit") || "Edit"}
          />
        }
      >
        <Edit2 className="h-4 w-4" />
      </DialogTrigger>

      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span>{t("editPlanTitle") || "Edit Plan"}</span>
          </DialogTitle>
          <DialogDescription>
            {t("editPlanSubtitle") || "Update plan pricing, billing cycle, credits, and localized features."}
          </DialogDescription>
        </DialogHeader>

        {isLoadingDetails ? (
          <div className="flex items-center justify-center py-12 gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>{t("loading") || "Loading plan details..."}</span>
          </div>
        ) : (
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-2">
            {/* Names */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className="font-medium">
                      {t("nameEn") || "Plan Name (EN)"}
                    </FieldLabel>
                    <Input
                      placeholder="e.g. Pro, Premium"
                      disabled={isPending}
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError className="text-red-500 text-xs" errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="name_ar"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field dir="rtl">
                    <FieldLabel className="font-medium">
                      {t("nameAr") || "اسم الباقة (بالعربية)"}
                    </FieldLabel>
                    <Input
                      placeholder="مثال: إحترافية، المتميزة"
                      disabled={isPending}
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError className="text-red-500 text-xs" errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            {/* Descriptions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className="font-medium">
                      {t("descEn") || "Description (EN)"}
                    </FieldLabel>
                    <Input
                      placeholder="e.g. Pro plan with AI features"
                      disabled={isPending}
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError className="text-red-500 text-xs" errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="description_ar"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field dir="rtl">
                    <FieldLabel className="font-medium">
                      {t("descAr") || "الوصف (بالعربية)"}
                    </FieldLabel>
                    <Input
                      placeholder="مثال: باقة إحترافية مع خدمات الذكاء الاصطناعي"
                      disabled={isPending}
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError className="text-red-500 text-xs" errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            {/* Pricing & Billing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Controller
                name="price"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className="flex items-center gap-1.5 font-medium">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <span>{t("price") || "Price ($)"}</span>
                    </FieldLabel>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      disabled={isPending}
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                    {fieldState.invalid && (
                      <FieldError className="text-red-500 text-xs" errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="frequency"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className="flex items-center gap-1.5 font-medium">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{t("frequency") || "Frequency"}</span>
                    </FieldLabel>
                    <select
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      disabled={isPending}
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="monthly">{t("frequencies.monthly") || "Monthly"}</option>
                      <option value="yearly">{t("frequencies.yearly") || "Yearly"}</option>
                      <option value="weekly">{t("frequencies.weekly") || "Weekly"}</option>
                      <option value="one_time">{t("frequencies.one_time") || "One-time"}</option>
                      <option value="lifetime">{t("frequencies.lifetime") || "Lifetime"}</option>
                    </select>
                    {fieldState.invalid && (
                      <FieldError className="text-red-500 text-xs" errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="credits"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className="flex items-center gap-1.5 font-medium">
                      <Coins className="h-4 w-4 text-primary" />
                      <span>{t("credits") || "Credits"}</span>
                    </FieldLabel>
                    <Input
                      type="number"
                      min="0"
                      disabled={isPending}
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                    {fieldState.invalid && (
                      <FieldError className="text-red-500 text-xs" errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="trial_days"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className="flex items-center gap-1.5 font-medium">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{t("trialDays") || "Trial Days"}</span>
                    </FieldLabel>
                    <Input
                      type="number"
                      min="0"
                      disabled={isPending}
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                    {fieldState.invalid && (
                      <FieldError className="text-red-500 text-xs" errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            {/* Status & Featured */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Controller
                name="active"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel className="flex items-center gap-1.5 font-medium">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      <span>{t("active") || "Status"}</span>
                    </FieldLabel>
                    <select
                      value={field.value ? "true" : "false"}
                      onChange={(e) => field.onChange(e.target.value === "true")}
                      disabled={isPending}
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="true">{t("statusActive") || "Active"}</option>
                      <option value="false">{t("statusInactive") || "Inactive"}</option>
                    </select>
                  </Field>
                )}
              />

              <Controller
                name="is_featured"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel className="flex items-center gap-1.5 font-medium">
                      <Star className="h-4 w-4 text-primary" />
                      <span>{t("featured") || "Featured (Popular)"}</span>
                    </FieldLabel>
                    <select
                      value={field.value ? "true" : "false"}
                      onChange={(e) => field.onChange(e.target.value === "true")}
                      disabled={isPending}
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="false">{t("standardPlan") || "Standard Plan"}</option>
                      <option value="true">{t("featuredPlan") || "Featured (Most Popular)"}</option>
                    </select>
                  </Field>
                )}
              />
            </div>

            {/* Features Builder */}
            <div className="space-y-3 pt-2 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold">{t("features") || "Plan Features"}</h4>
                  <p className="text-xs text-muted-foreground">
                    {t("featuresHelp") || "Add plan bullet points in both English and Arabic."}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddFeature}
                  disabled={isPending}
                  className="gap-1.5"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>{t("addFeature") || "Add Feature"}</span>
                </Button>
              </div>

              <div className="space-y-3">
                {featuresList.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row gap-2 items-start sm:items-center p-2.5 rounded-lg border bg-muted/20"
                  >
                    <div className="flex-1 w-full">
                      <Input
                        placeholder={t("featureEnPlaceholder") || "Feature (English)"}
                        value={item.en}
                        onChange={(e) => handleUpdateFeature(index, "en", e.target.value)}
                        disabled={isPending}
                      />
                    </div>
                    <div className="flex-1 w-full" dir="rtl">
                      <Input
                        placeholder={t("featureArPlaceholder") || "الميزة (بالعربية)"}
                        value={item.ar}
                        onChange={(e) => handleUpdateFeature(index, "ar", e.target.value)}
                        disabled={isPending}
                      />
                    </div>
                    {featuresList.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveFeature(index)}
                        disabled={isPending}
                        className="text-destructive hover:bg-destructive/10 h-8 w-8 shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isPending}
              >
                {t("cancel") || "Cancel"}
              </Button>
              <Button type="submit" disabled={isPending} className="gap-2">
                {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                <span>{t("saveChanges") || "Save Changes"}</span>
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
