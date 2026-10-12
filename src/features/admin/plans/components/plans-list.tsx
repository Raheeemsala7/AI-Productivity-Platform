import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Check, Coins, Sparkles, Layers, ShieldCheck, ShieldAlert, Plus, Edit2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { Plan } from "../types/plan";
import { DeletePlanButton } from "./delete-plan-button";

interface PlansListProps {
  plans: Plan[];
}

export async function PlansList({ plans }: PlansListProps) {
  const t = await getTranslations("AdminPlans");

  return (
    <div className="space-y-6 p-4 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t("title") || "Plans & Pricing"}</h2>
          <p className="text-muted-foreground">
            {t("description") || "Configure subscription plans, pricing tiers, credits, and AI feature access."}
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/plans/create"
            className={cn(buttonVariants(), "gap-2")}
          >
            <Plus className="h-4 w-4" />
            <span>{t("createPlan") || "Create Plan"}</span>
          </Link>
        </div>
      </div>


      {/* Plans Grid */}
      {plans && plans.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {plans.map((plan) => {
            const isFeatured = Boolean(plan.is_featured);
            const isActive = Boolean(plan.active);

            return (
              <Card
                key={plan.id}
                className={`relative flex flex-col transition-all duration-200 hover:shadow-md ${
                  isFeatured
                    ? "border-primary shadow-sm ring-1 ring-primary/20 bg-primary/[0.02]"
                    : "border-border/60"
                }`}
              >
                {isFeatured && (
                  <div className="absolute top-3 right-6 rtl:right-auto rtl:left-6 z-10">
                    <Badge className="bg-primary text-primary-foreground shadow-xs gap-1 font-semibold text-xs py-0.5 px-3">
                      <Sparkles className="h-3 w-3" />
                      {t("popularBadge") || "Most Popular"}
                    </Badge>
                  </div>
                )}

                <CardContent className="p-6 flex-1 flex flex-col justify-between mt-4">
                  <div>
                    {/* Header: Name & Actions */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-2xl font-bold tracking-tight">{plan.name}</h3>
                        {plan.name_ar && plan.name_ar !== plan.name && (
                          <p className="text-xs text-muted-foreground mt-0.5" dir="rtl">
                            {plan.name_ar}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <Link
                          href={`/admin/plans/${plan.id}/edit`}
                          className={cn(
                            buttonVariants({ variant: "ghost", size: "icon" }),
                            "h-8 w-8 text-muted-foreground hover:text-foreground"
                          )}
                          title={t("edit") || "Edit"}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Link>
                        <DeletePlanButton planId={plan.id} planName={plan.name} />
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-5 line-clamp-2 min-h-[40px]">
                      {plan.description || t("noDescription") || "No description provided."}
                    </p>

                    {/* Price & Billing */}
                    <div className="mb-6 pb-4 border-b border-border/60">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-extrabold tracking-tight">
                          ${plan.price}
                        </span>
                        <span className="text-sm text-muted-foreground font-medium">
                          /{plan.frequency || "month"}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        <Badge variant="secondary" className="gap-1 font-medium text-xs">
                          <Coins className="h-3.5 w-3.5 text-amber-500" />
                          <span>{Number(plan.credits || 0).toLocaleString()} {t("credits") || "Credits"}</span>
                        </Badge>

                        {Number(plan.trial_days) > 0 && (
                          <Badge variant="outline" className="text-xs">
                            {plan.trial_days} {t("trialDays") || "Trial Days"}
                          </Badge>
                        )}

                        <Badge
                          variant={isActive ? "default" : "secondary"}
                          className={`text-xs gap-1 ${
                            isActive
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/20"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {isActive ? (
                            <>
                              <ShieldCheck className="h-3 w-3" />
                              {t("statusActive") || "Active"}
                            </>
                          ) : (
                            <>
                              <ShieldAlert className="h-3 w-3" />
                              {t("statusInactive") || "Inactive"}
                            </>
                          )}
                        </Badge>
                      </div>
                    </div>

                    {/* Features list */}
                    <div className="space-y-2.5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {t("includedFeatures") || "What's included"}
                      </p>
                      <ul className="space-y-2">
                        {plan.features && plan.features.length > 0 ? (
                          plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-sm">
                              <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span className="text-foreground/90">{feature}</span>
                            </li>
                          ))
                        ) : (
                          <li className="text-xs text-muted-foreground italic">
                            {t("noFeatures") || "No features listed"}
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* Footer status info */}
                  <div className="mt-8 pt-4 border-t border-border/40 text-xs text-muted-foreground flex items-center justify-between">
                    <span>{plan.type || "Subscription"}</span>
                    {plan.stripe_price_id && (
                      <span className="font-mono text-[10px] truncate max-w-[140px]" title={plan.stripe_price_id}>
                        {plan.stripe_price_id}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="p-12 text-center flex flex-col items-center justify-center">
          <div className="p-4 rounded-full bg-muted/50 mb-3">
            <Layers className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-1">{t("noPlansFound") || "No plans found"}</h3>
          <p className="text-sm text-muted-foreground max-w-sm mb-4">
            {t("noPlansFoundDesc") || "You haven't created any subscription plans yet. Click the button below to add your first plan."}
          </p>
          <Link
            href="/admin/plans/create"
            className={cn(buttonVariants(), "gap-2")}
          >
            <Plus className="h-4 w-4" />
            <span>{t("createPlan") || "Create Plan"}</span>
          </Link>
        </Card>
      )}
    </div>
  );
}
