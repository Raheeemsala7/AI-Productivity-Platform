import { Check } from "lucide-react";
import { SectionHeader } from "./sec-header";
import { getTranslations } from "next-intl/server";

const PLAN_KEYS = ["starter", "professional", "enterprise"] as const;

const FEATURE_KEYS = {
    starter: ["plan", "analysis", "export", "support"],
    professional: ["plans", "forecasts", "pitch", "builder", "export", "priority"],
    enterprise: ["workspaces", "brandKits", "sso", "manager"],
} as const;

export async function Pricing() {
    const t = await getTranslations("Pricing");

    const plans = PLAN_KEYS.map((key) => ({
        key,
        price: key === "starter" ? "$0" : key === "professional" ? "$29" : t(`plans.${key}.price`),
        featured: key === "professional",
        featureKeys: FEATURE_KEYS[key],
    }));

    return (
        <section id="pricing" className="py-24 md:py-32 border-t border-border/60">
            <div className="max-w-7xl mx-auto px-6">
                <SectionHeader eyebrow={t("eyebrow")} title={t("title")} />
                <div className="grid md:grid-cols-3 gap-5 mt-14 items-stretch">
                    {plans.map((p) => (
                        <div
                            key={p.key}
                            className={`relative rounded-2xl p-7 flex flex-col ${p.featured ? "border border-primary/40 bg-card/80" : "glass"
                                }`}
                            style={p.featured ? { boxShadow: "var(--shadow-elegant)" } : undefined}
                        >
                            {p.featured && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-primary-foreground bg-primary px-2.5 py-1 rounded-full">
                                    {t("mostPopular")}
                                </div>
                            )}
                            <div className="text-sm text-muted-foreground">{t(`plans.${p.key}.name`)}</div>
                            <div className="mt-2 flex items-baseline gap-1.5">
                                <div className="text-4xl font-semibold tracking-tight">{p.price}</div>
                                <div className="text-sm text-muted-foreground">/ {t(`plans.${p.key}.cadence`)}</div>
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">{t(`plans.${p.key}.desc`)}</p>
                            <ul className="mt-6 space-y-2.5 text-sm flex-1">
                                {p.featureKeys.map((featureKey) => (
                                    <li key={featureKey} className="flex items-start gap-2">
                                        <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                                        <span className="text-foreground/90">{t(`plans.${p.key}.features.${featureKey}`)}</span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                className={`mt-7 rounded-xl py-2.5 text-sm font-medium ${p.featured ? "btn-primary" : "btn-ghost"
                                    }`}
                            >
                                {t(`plans.${p.key}.cta`)}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
