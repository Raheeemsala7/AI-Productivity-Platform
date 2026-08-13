"use client"
import { CheckCircle2, Download, FileText } from "lucide-react";
import { SectionHeader } from "./sec-header";
import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

const STEP_KEYS = [
    "executiveSummary",
    "targetAudience",
    "marketAnalysis",
    "revenueForecast",
    "marketingStrategy",
    "investmentPlan",
] as const;

export function DemoSection() {
    const t = useTranslations("DemoSection");
    const steps = useMemo(
        () => STEP_KEYS.map((key) => t(`steps.${key}`)),
        [t],
    );
    const prompt = t("promptText");

    const [i, setI] = useState(-1);
    const [typed, setTyped] = useState("");

    useEffect(() => {
        let n = 0;
        const timer = setInterval(() => {
            n++;
            setTyped(prompt.slice(0, n));
            if (n >= prompt.length) clearInterval(timer);
        }, 45);
        return () => clearInterval(timer);
    }, [prompt]);

    useEffect(() => {
        const timer = setInterval(() => {
            setI((v) => (v < steps.length ? v + 1 : v));
        }, 900);
        return () => clearInterval(timer);
    }, [steps.length]);

    const done = i >= steps.length;

    return (
        <section id="demo" className="py-24 md:py-32 border-t border-border/60">
            <div className="max-w-7xl mx-auto px-6">
                <SectionHeader eyebrow={t("eyebrow")} title={t("title")} />
                <div className="grid lg:grid-cols-2 gap-6 mt-14 items-stretch">
                    <div className="glass rounded-2xl p-6">
                        <div className="text-xs text-muted-foreground mb-2">{t("prompt")}</div>
                        <div className="rounded-lg border border-border bg-surface/60 p-4 font-mono text-sm">
                            <span className="text-accent">›</span> {typed}
                            <span className="inline-block w-1.5 h-4 bg-primary-glow ml-0.5 align-middle animate-pulse" />
                        </div>
                        <div className="mt-6 space-y-2.5">
                            {steps.map((s, idx) => {
                                const state = idx < i ? "done" : idx === i ? "loading" : "idle";
                                return (
                                    <div
                                        key={s}
                                        className={`flex items-center justify-between rounded-lg border px-4 py-3 text-sm transition ${state === "done"
                                                ? "border-accent/30 bg-accent/5"
                                                : state === "loading"
                                                    ? "border-primary/30 bg-primary/5"
                                                    : "border-border bg-card/30"
                                            }`}
                                    >
                                        <span className={state === "idle" ? "text-muted-foreground" : "text-foreground"}>{s}</span>
                                        {state === "done" ? (
                                            <CheckCircle2 className="w-4 h-4 text-accent" />
                                        ) : state === "loading" ? (
                                            <span className="text-xs text-primary-glow inline-flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-primary-glow pulse-dot" /> {t("generating")}
                                            </span>
                                        ) : (
                                            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="glass rounded-2xl p-6 flex flex-col">
                        <div className="text-xs text-muted-foreground mb-2">{t("result")}</div>
                        <div className={`flex-1 rounded-xl border border-border p-6 relative overflow-hidden transition ${done ? "bg-card/60" : "bg-card/30"}`}>
                            <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ background: done ? "var(--gradient-hero)" : "transparent" }} />
                            <div className="relative flex flex-col h-full">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <FileText className="w-3.5 h-3.5" /> business-plan.pdf
                                </div>
                                <div className="mt-6 flex-1 flex items-center justify-center">
                                    {done ? (
                                        <div className="text-center fade-up">
                                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl border border-accent/40 bg-accent/10 mb-4">
                                                <CheckCircle2 className="w-7 h-7 text-accent" />
                                            </div>
                                            <div className="text-xl font-semibold">{t("planReady")}</div>
                                            <p className="text-sm text-muted-foreground mt-1">{t("pagesInfo")}</p>
                                            <button className="mt-5 btn-primary rounded-lg px-5 py-2.5 text-sm font-medium inline-flex items-center gap-2">
                                                <Download className="w-4 h-4" /> {t("downloadPdf")}
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="w-full space-y-2.5">
                                            {[92, 78, 88, 60, 84, 70].map((w, k) => (
                                                <div key={k} className="h-2 rounded-full bg-surface/70 overflow-hidden">
                                                    <div className="h-full shimmer" style={{ width: `${w}%` }} />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
