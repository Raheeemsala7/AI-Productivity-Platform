import { ArrowRight } from "lucide-react";
import { SectionHeader } from "./sec-header";

export function HowItWorks() {
    const steps = [
        { n: "01", title: "Describe your business idea", desc: "One sentence is enough. ORICO fills the rest." },
        { n: "02", title: "AI analyzes your industry", desc: "Market size, competitors, trends and risk vectors." },
        { n: "03", title: "Generate a complete business plan", desc: "Ten modules assembled into a coherent document." },
        { n: "04", title: "Edit, export, and share", desc: "Refine, export as PDF/DOCX, and share with your team." },
    ];
    return (
        <section className="py-24 md:py-32 border-t border-border/60">
            <div className="max-w-7xl mx-auto px-6">
                <SectionHeader eyebrow="How it works" title="From idea to investor deck in four steps." />
                <div className="grid md:grid-cols-4 gap-5 mt-14">
                    {steps.map((s, i) => (
                        <div key={s.n} className="relative">
                            <div className="glass rounded-2xl p-6 h-full card-lift">
                                <div className="text-xs font-mono text-primary-glow">{s.n}</div>
                                <div className="mt-3 font-semibold">{s.title}</div>
                                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                            </div>
                            {i < steps.length - 1 && (
                                <ArrowRight className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 w-5 h-5 text-muted-foreground/40" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
