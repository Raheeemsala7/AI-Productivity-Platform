import { Check } from "lucide-react";
import { SectionHeader } from "./sec-header";

export function Pricing() {
    const plans = [
        {
            name: "Starter",
            price: "$0",
            cadence: "forever",
            desc: "For founders exploring their first idea.",
            features: ["1 business plan / month", "Basic market analysis", "PDF export", "Community support"],
            cta: "Start free",
            featured: false,
        },
        {
            name: "Professional",
            price: "$29",
            cadence: "per month",
            desc: "For serious founders and freelancers.",
            features: [
                "Unlimited business plans",
                "Full financial forecasts",
                "Investor pitch decks",
                "Landing page & logo builder",
                "PDF, DOCX, PPTX export",
                "Priority AI",
            ],
            cta: "Start 14-day trial",
            featured: true,
        },
        {
            name: "Enterprise",
            price: "Custom",
            cadence: "annual",
            desc: "For accelerators, studios and teams.",
            features: ["Team workspaces", "Brand kits & templates", "SSO & audit logs", "Dedicated success manager"],
            cta: "Contact sales",
            featured: false,
        },
    ];
    return (
        <section id="pricing" className="py-24 md:py-32 border-t border-border/60">
            <div className="max-w-7xl mx-auto px-6">
                <SectionHeader eyebrow="Pricing" title="Simple plans that scale with you." />
                <div className="grid md:grid-cols-3 gap-5 mt-14 items-stretch">
                    {plans.map((p) => (
                        <div
                            key={p.name}
                            className={`relative rounded-2xl p-7 flex flex-col ${p.featured ? "border border-primary/40 bg-card/80" : "glass"
                                }`}
                            style={p.featured ? { boxShadow: "var(--shadow-elegant)" } : undefined}
                        >
                            {p.featured && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-primary-foreground bg-primary px-2.5 py-1 rounded-full">
                                    Most popular
                                </div>
                            )}
                            <div className="text-sm text-muted-foreground">{p.name}</div>
                            <div className="mt-2 flex items-baseline gap-1.5">
                                <div className="text-4xl font-semibold tracking-tight">{p.price}</div>
                                <div className="text-sm text-muted-foreground">/ {p.cadence}</div>
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                            <ul className="mt-6 space-y-2.5 text-sm flex-1">
                                {p.features.map((f) => (
                                    <li key={f} className="flex items-start gap-2">
                                        <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                                        <span className="text-foreground/90">{f}</span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                className={`mt-7 rounded-xl py-2.5 text-sm font-medium ${p.featured ? "btn-primary" : "btn-ghost"
                                    }`}
                            >
                                {p.cta}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}