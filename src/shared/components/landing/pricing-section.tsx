import { Check, Coins, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { cn } from "@/shared/lib/utils";
import { Plan } from "@/features/admin/plans/types/plan";
import { PlanCtaButton } from "./plan-cta-button";

const PLAN_KEYS = ["starter", "pro", "business"] as const;

interface PricingSectionProps {
  plans?: Plan[];
}

export async function PricingSection({ plans = [] }: PricingSectionProps) {
  const t = await getTranslations("Landing.pricing");

  const displayPlans =
    plans && plans.length > 0
      ? plans.map((p) => ({
          key: String(p.id),
          name: p.name,
          price:
            typeof p.price === "number" || !String(p.price).startsWith("$")
              ? `$${p.price}`
              : String(p.price),
          copy: p.description,
          frequency: p.frequency,
          credits: p.credits ? Number(p.credits) : undefined,
          features: Array.isArray(p.features) ? p.features : [],
          featured: Boolean(p.is_featured),
        }))
      : PLAN_KEYS.map((key) => ({
          key,
          name: t(`plans.${key}.name`),
          price: t(`plans.${key}.price`),
          copy: t(`plans.${key}.copy`),
          frequency: undefined as string | undefined,
          credits: key === "starter" ? 200 : key === "pro" ? 2500 : 15000,
          features: [
            t(`plans.${key}.f1`),
            t(`plans.${key}.f2`),
            t(`plans.${key}.f3`),
          ],
          featured: key === "pro",
        }));

  return (
    <section
      id="pricing"
      className="bg-coral-soft px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div
          className="flex flex-col justify-between gap-6 md:flex-row md:items-end"
          data-reveal
        >
          <div>
            <p className="eyebrow">{t("eyebrow")}</p>
            <h2 className="section-title">
              {t("title")}
              <br />
              <em>{t("titleAccent")}</em>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-16 space-y-12" data-reveal>
          <div
            className={cn(
              "grid gap-8 items-stretch",
              displayPlans.length === 2
                ? "md:grid-cols-2 max-w-4xl mx-auto"
                : displayPlans.length >= 4
                ? "md:grid-cols-2 lg:grid-cols-4"
                : "lg:grid-cols-3"
            )}
          >
            {displayPlans.map((plan) => (
              <article
                key={plan.key}
                className={cn(
                  "relative rounded-3xl p-8 md:p-10 flex flex-col justify-between transition-all duration-300",
                  plan.featured
                    ? "bg-ink text-paper shadow-2xl lg:-translate-y-3 hover:-translate-y-4 border-2 border-brand ring-4 ring-brand/10"
                    : "bg-background text-foreground border border-border shadow-sm hover:shadow-xl hover:border-brand/40 hover:-translate-y-1"
                )}
              >
                {/* Featured Badge */}
                {plan.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rtl:left-auto rtl:right-1/2 rtl:translate-x-1/2 z-10">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-[0.7rem] font-bold uppercase tracking-wider bg-brand text-brand-foreground shadow-md">
                      <Sparkles className="size-3.5" />
                      {t("mostPopular")}
                    </span>
                  </div>
                )}

                <div>
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
                        {plan.name}
                      </h3>
                      <p
                        className={cn(
                          "mt-2 text-sm leading-relaxed min-h-[40px]",
                          plan.featured ? "text-paper/70" : "text-muted-foreground"
                        )}
                      >
                        {plan.copy}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mt-6 flex items-baseline gap-1.5">
                    <strong className="font-display text-5xl md:text-6xl font-extrabold tracking-tight">
                      {plan.price}
                    </strong>
                    <span
                      className={cn(
                        "text-xs uppercase tracking-wider font-semibold",
                        plan.featured ? "text-paper/60" : "text-muted-foreground"
                      )}
                    >
                      {plan.frequency ? `/${plan.frequency}` : t("perMonth")}
                    </span>
                  </div>

                  {/* Credits Pill */}
                  {Boolean(plan.credits && plan.credits > 0) && (
                    <div className="mt-4">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold",
                          plan.featured
                            ? "bg-brand/20 text-brand border border-brand/30"
                            : "bg-brand/10 text-brand border border-brand/20"
                        )}
                      >
                        <Coins className="size-3.5 text-brand shrink-0" />
                        <span>
                          {Number(plan.credits).toLocaleString()}{" "}
                          {t("creditsLabel", { credits: "" }).trim() || "credits / month"}
                        </span>
                      </span>
                    </div>
                  )}

                  {/* Divider */}
                  <div
                    className={cn(
                      "my-8 border-t",
                      plan.featured ? "border-paper/10" : "border-border/60"
                    )}
                  />

                  {/* Features List */}
                  <p
                    className={cn(
                      "text-xs font-bold uppercase tracking-wider mb-4",
                      plan.featured ? "text-paper/60" : "text-muted-foreground"
                    )}
                  >
                    {t("featuresLabel") || "What's included"}
                  </p>
                  <ul className="space-y-3.5 text-sm">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div
                          className={cn(
                            "size-5 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                            plan.featured
                              ? "bg-brand/25 text-brand"
                              : "bg-brand/10 text-brand"
                          )}
                        >
                          <Check className="size-3 stroke-[2.5]" />
                        </div>
                        <span
                          className={cn(
                            "leading-snug",
                            plan.featured ? "text-paper/90" : "text-foreground/90"
                          )}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="mt-10 pt-4">
                  <PlanCtaButton
                    plan={{
                      id: plan.key,
                      name: plan.name,
                      price: plan.price,
                      frequency: plan.frequency,
                      credits: plan.credits,
                      copy: plan.copy,
                      features: plan.features,
                    }}
                    label={t("choosePlan", { plan: plan.name.split(" /")[0] })}
                    featured={plan.featured}
                  />
                </div>
              </article>
            ))}
          </div>

          {/* Trust & Reassurance Badges */}
          <div className="pt-8 border-t border-border/40 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs font-medium text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-brand shrink-0" />
              <span>{t("reassurance1") || "Cancel anytime, no commitments"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="size-4 text-brand shrink-0" />
              <span>{t("reassurance2") || "Instant AI credits activation"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-brand shrink-0" />
              <span>{t("reassurance3") || "Commercial license included"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
