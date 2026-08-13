import { ArrowRight } from "lucide-react";
import { SectionHeader } from "./sec-header";
import { getTranslations } from "next-intl/server";

const STEP_KEYS = ["describe", "analyze", "generate", "export"] as const;

export async function HowItWorks() {
    const t = await getTranslations("HowItWorks");

    const steps = STEP_KEYS.map((key, index) => ({
        n: String(index + 1).padStart(2, "0"),
        title: t(`steps.${key}.title`),
        desc: t(`steps.${key}.desc`),
    }));

    return (
        <section className="py-24 md:py-32 border-t border-border/60">
            <div className="max-w-7xl mx-auto px-6">
                <SectionHeader eyebrow={t("eyebrow")} title={t("title")} />
                <div className="grid md:grid-cols-4 gap-5 mt-14">
                    {steps.map((s, i) => (
                        <div key={s.n} className="relative">
                            <div className="glass rounded-2xl p-6 h-full card-lift">
                                <div className="text-xs font-mono text-primary-glow">{s.n}</div>
                                <div className="mt-3 font-semibold">{s.title}</div>
                                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                            </div>
                            {i < steps.length - 1 && (
                                <ArrowRight className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 w-5 h-5 text-muted-foreground/40 rtl:rotate-180" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
