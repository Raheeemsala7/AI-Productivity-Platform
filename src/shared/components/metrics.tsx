import { Counter } from "./counter";
import { getTranslations } from "next-intl/server";

export async function Metrics() {
    const t = await getTranslations("Metrics");

    const stats = [
        { v: 250000, s: "K+", label: t("plansGenerated"), d: 1000 },
        { v: 40000, s: "K+", label: t("startupsLaunched"), d: 1000 },
        { v: 98, s: "%", label: t("satisfaction"), d: 1 },
        { v: 120, s: "+", label: t("countries"), d: 1 },
    ];

    return (
        <section className="py-24 md:py-32 border-t border-border/60">
            <div className="max-w-7xl mx-auto px-6">
                <div className="glass rounded-3xl p-10 md:p-14 relative overflow-hidden">
                    <div className="absolute -top-32 -left-24 w-96 h-96 rounded-full opacity-30 blur-3xl" style={{ background: "var(--gradient-primary)" }} />
                    <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((s) => (
                            <Counter key={s.label} target={s.v} divisor={s.d} suffix={s.s} label={s.label} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
