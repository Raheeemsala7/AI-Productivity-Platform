import { Building2, Sparkles, Zap } from "lucide-react";
import { SectionHeader } from "./sec-header";

export function WhyOrico() {
    const cards = [
        {
            icon: Sparkles,
            title: "AI-Powered Business Planning",
            desc: "Create complete startup business plans in minutes, tailored to your industry and market.",
        },
        {
            icon: Building2,
            title: "Investor Ready",
            desc: "Generate polished, professional documents formatted to the standards investors expect.",
        },
        {
            icon: Zap,
            title: "Everything in One Platform",
            desc: "Landing pages, presentations, images, marketing copy, voice tools, and much more.",
        },
    ];
    return (
        <section className="py-24 md:py-32">
            <div className="max-w-7xl mx-auto px-6">
                <SectionHeader eyebrow="Why ORICO" title="The clearest path from idea to launch." />
                <div className="grid md:grid-cols-3 gap-5 mt-14">
                    {cards.map((c) => {
                        const Icon = c.icon;
                        return (
                            <div key={c.title} className="glass card-lift rounded-2xl p-7">
                                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-border bg-card/60">
                                    <Icon className="w-5 h-5 text-primary-glow" />
                                </div>
                                <h3 className="mt-5 text-lg font-semibold">{c.title}</h3>
                                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}


