import { ArrowRight, AudioLines, CheckCircle2, FileBadge, ImageIcon, Languages, LayoutTemplate, MessageSquare, Mic, Palette, PenLine, Presentation, Share2, Star } from "lucide-react";
import { SectionHeader } from "./sec-header";
import { getTranslations } from "next-intl/server";

const PLAN_ITEM_KEYS = [
    "executiveSummary",
    "marketResearch",
    "swotAnalysis",
    "businessModelCanvas",
    "pricingStrategy",
    "financialForecast",
    "marketingPlan",
    "salesStrategy",
    "operationsPlan",
    "fundingRequirements",
] as const;

const SECONDARY_KEYS = [
    { icon: LayoutTemplate, key: "landingPage" as const },
    { icon: Presentation, key: "presentation" as const },
    { icon: ImageIcon, key: "imageGenerator" as const },
    { icon: MessageSquare, key: "chatAssistant" as const },
    { icon: Mic, key: "voiceAi" as const },
    { icon: AudioLines, key: "speechToText" as const },
    { icon: AudioLines, key: "textToSpeech" as const },
    { icon: Languages, key: "translation" as const },
    { icon: Palette, key: "logoGenerator" as const },
    { icon: FileBadge, key: "resumeBuilder" as const },
    { icon: PenLine, key: "marketingCopy" as const },
    { icon: Share2, key: "socialMedia" as const },
];

export async function CoreFeatures() {
    const t = await getTranslations("CoreFeatures");

    return (
        <section id="features" className="py-24 md:py-32 border-t border-border/60">
            <div className="max-w-7xl mx-auto px-6">
                <SectionHeader
                    eyebrow={t("eyebrow")}
                    title={t("title")}
                    subtitle={t("subtitle")}
                />

                <div className="grid lg:grid-cols-5 gap-5 mt-14">
                    <div className="lg:col-span-3 glass rounded-2xl p-8 relative overflow-hidden card-lift">
                        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-30 blur-3xl" style={{ background: "var(--gradient-primary)" }} />
                        <div className="relative">
                            <div className="inline-flex items-center gap-2 text-xs text-highlight">
                                <Star className="w-3.5 h-3.5 fill-highlight" /> {t("flagship")}
                            </div>
                            <h3 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">
                                {t("generatorTitle")}
                            </h3>
                            <p className="mt-3 text-muted-foreground max-w-lg">
                                {t("generatorDesc")}
                            </p>
                            <div className="mt-6 grid grid-cols-2 gap-2">
                                {PLAN_ITEM_KEYS.map((key) => (
                                    <div key={key} className="flex items-center gap-2 text-sm text-foreground/90">
                                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                                        {t(`planItems.${key}`)}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-7 flex items-center gap-3">
                                <button className="btn-primary rounded-lg px-5 py-2.5 text-sm font-medium inline-flex items-center gap-2">
                                    {t("generateNow")} <ArrowRight className="w-4 h-4" />
                                </button>
                                <span className="text-xs text-muted-foreground">{t("avgDraftTime")} <span className="text-foreground">{t("avgDraftTimeValue")}</span></span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 grid grid-cols-2 gap-3">
                        {SECONDARY_KEYS.map((f) => {
                            const Icon = f.icon;
                            return (
                                <div key={f.key} className="glass card-lift rounded-xl p-4 flex flex-col gap-2">
                                    <div className="w-9 h-9 rounded-lg border border-border bg-surface/60 flex items-center justify-center">
                                        <Icon className="w-4 h-4 text-primary-glow" />
                                    </div>
                                    <div className="text-sm font-medium leading-snug">{t(`secondary.${f.key}`)}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
