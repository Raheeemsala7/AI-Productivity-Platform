import { ArrowRight, AudioLines, CheckCircle2, FileBadge, ImageIcon, Languages, LayoutTemplate, MessageSquare, Mic, Palette, PenLine, Presentation, Share2, Star } from "lucide-react";
import { SectionHeader } from "./sec-header";

export function CoreFeatures() {
    const secondary = [
        { icon: LayoutTemplate, title: "Landing Page Builder" },
        { icon: Presentation, title: "Presentation Builder" },
        { icon: ImageIcon, title: "AI Image Generator" },
        { icon: MessageSquare, title: "AI Chat Assistant" },
        { icon: Mic, title: "Voice AI" },
        { icon: AudioLines, title: "Speech to Text" },
        { icon: AudioLines, title: "Text to Speech" },
        { icon: Languages, title: "AI Translation" },
        { icon: Palette, title: "Logo Generator" },
        { icon: FileBadge, title: "Resume Builder" },
        { icon: PenLine, title: "Marketing Copy" },
        { icon: Share2, title: "Social Media Content" },
    ];
    const planItems = [
        "Executive Summary",
        "Market Research",
        "SWOT Analysis",
        "Business Model Canvas",
        "Pricing Strategy",
        "Financial Forecast",
        "Marketing Plan",
        "Sales Strategy",
        "Operations Plan",
        "Funding Requirements",
    ];
    return (
        <section id="features" className="py-24 md:py-32 border-t border-border/60">
            <div className="max-w-7xl mx-auto px-6">
                <SectionHeader
                    eyebrow="Core Features"
                    title="Built around the Business Plan Generator."
                    subtitle="A complete AI business suite, anchored by the deepest planning engine on the market."
                />

                <div className="grid lg:grid-cols-5 gap-5 mt-14">
                    {/* Hero feature */}
                    <div className="lg:col-span-3 glass rounded-2xl p-8 relative overflow-hidden card-lift">
                        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-30 blur-3xl" style={{ background: "var(--gradient-primary)" }} />
                        <div className="relative">
                            <div className="inline-flex items-center gap-2 text-xs text-highlight">
                                <Star className="w-3.5 h-3.5 fill-highlight" /> Flagship
                            </div>
                            <h3 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">
                                AI Business Plan Generator
                            </h3>
                            <p className="mt-3 text-muted-foreground max-w-lg">
                                Ten deeply-researched modules working together — from executive summary to funding requirements — assembled into one investor-ready plan.
                            </p>
                            <div className="mt-6 grid grid-cols-2 gap-2">
                                {planItems.map((p) => (
                                    <div key={p} className="flex items-center gap-2 text-sm text-foreground/90">
                                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                                        {p}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-7 flex items-center gap-3">
                                <button className="btn-primary rounded-lg px-5 py-2.5 text-sm font-medium inline-flex items-center gap-2">
                                    Generate now <ArrowRight className="w-4 h-4" />
                                </button>
                                <span className="text-xs text-muted-foreground">Avg. draft time: <span className="text-foreground">3 min 12s</span></span>
                            </div>
                        </div>
                    </div>

                    {/* Secondary grid */}
                    <div className="lg:col-span-2 grid grid-cols-2 gap-3">
                        {secondary.map((f) => {
                            const Icon = f.icon;
                            return (
                                <div key={f.title} className="glass card-lift rounded-xl p-4 flex flex-col gap-2">
                                    <div className="w-9 h-9 rounded-lg border border-border bg-surface/60 flex items-center justify-center">
                                        <Icon className="w-4 h-4 text-primary-glow" />
                                    </div>
                                    <div className="text-sm font-medium leading-snug">{f.title}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
