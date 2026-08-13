import { Building2, Sparkles, Zap } from "lucide-react";
import { SectionHeader } from "./sec-header";
import { getTranslations } from "next-intl/server";

export async function WhyOrico() {
    const t = await getTranslations("WhyOrico");

    const cards = [
        { icon: Sparkles, key: "planning" as const },
        { icon: Building2, key: "investor" as const },
        { icon: Zap, key: "platform" as const },
    ];

    return (
        <section className="py-24 md:py-32">
            <div className="max-w-7xl mx-auto px-6">
                <SectionHeader eyebrow={t("eyebrow")} title={t("title")} />
                <div className="grid md:grid-cols-3 gap-5 mt-14">
                    {cards.map((c) => {
                        const Icon = c.icon;
                        return (
                            <div key={c.key} className="glass card-lift rounded-2xl p-7">
                                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-border bg-card/60">
                                    <Icon className="w-5 h-5 text-primary-glow" />
                                </div>
                                <h3 className="mt-5 text-lg font-semibold">{t(`cards.${c.key}.title`)}</h3>
                                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t(`cards.${c.key}.desc`)}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
