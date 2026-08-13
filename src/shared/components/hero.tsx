"use client"
import { ArrowRight, CheckCircle2, DollarSign, FileText, LineChart, LineChartIcon, Megaphone, Play, ShieldAlert, Sparkles, Target, Users } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const PLAN_SECTION_KEYS = [
  "executiveSummary",
  "marketAnalysis",
  "competitorResearch",
  "revenueModel",
  "financialForecast",
  "marketingStrategy",
  "riskAnalysis",
  "investorPitch",
] as const;

const PLAN_SECTION_ICONS = [
  FileText,
  LineChart,
  Users,
  DollarSign,
  LineChartIcon,
  Megaphone,
  ShieldAlert,
  Target,
];
export function Hero() {
    const t = useTranslations("Hero");

    return (
        <section className="relative pt-32 pb-24 md:pt-40 md:pb-32">
            <div className="absolute inset-0 grid-bg pointer-events-none" />
            <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-hero)" }} />
            <div className="relative max-w-7xl mx-auto px-6">
                <div className="max-w-3xl mx-auto text-center fade-up">
                    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3 py-1 text-xs text-muted-foreground">
                        <Sparkles className="w-3.5 h-3.5 text-accent" />
                        {t("badge")}
                    </div>
                    <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]">
                        {t("title")}{" "}
                        <span className="text-gradient-brand">{t("titleHighlight")}</span>
                    </h1>
                    <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        {t("subtitle")}
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <button className="btn-primary rounded-xl px-6 py-3 text-sm font-medium inline-flex items-center gap-2">
                            {t("generatePlan")} <ArrowRight className="w-4 h-4" />
                        </button>
                        <button className="btn-ghost rounded-xl px-6 py-3 text-sm font-medium inline-flex items-center gap-2">
                            <Play className="w-4 h-4" /> {t("watchDemo")}
                        </button>
                    </div>
                </div>

                <div className="mt-16 md:mt-20 relative">
                    <PlanDashboard />
                </div>
            </div>
        </section>
    );
}

function PlanDashboard() {
    const t = useTranslations("Hero");
    const planSections = PLAN_SECTION_KEYS.map((key, index) => ({
        label: t(`sections.${key}`),
        icon: PLAN_SECTION_ICONS[index],
    }));
    const [progress, setProgress] = useState(0);
    const [completed, setCompleted] = useState<number>(-1);
    const ref = useRef<HTMLDivElement>(null);
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const t = setInterval(() => {
            setCompleted((c) => (c < planSections.length - 1 ? c + 1 : c));
        }, 700);
        return () => clearInterval(t);
    }, [planSections.length]);

    useEffect(() => {
        const t = setInterval(() => {
            setProgress((p) => (p >= 100 ? 100 : p + 2));
        }, 120);
        return () => clearInterval(t);
    }, []);

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
            const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
            setMouse({ x, y });
        };
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
    }, []);

    return (
        <div
            ref={ref}
            className="relative mx-auto max-w-6xl fade-up"
            style={{
                transform: `perspective(1600px) rotateX(${mouse.y * -2}deg) rotateY(${mouse.x * 2}deg)`,
                transition: "transform 0.2s ease-out",
            }}
        >
            <div className="absolute -inset-8 -z-10 opacity-60" style={{ background: "var(--shadow-glow)" }} />
            <div className="glass rounded-2xl overflow-hidden">
                {/* Window chrome */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface/50">
                    <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">orico.ai / business-plan</div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent pulse-dot" />
                        {t("live")}
                    </div>
                </div>

                <div className="grid md:grid-cols-[260px_1fr] min-h-[520px]">
                    <aside className="border-r border-border p-4 bg-surface/40 hidden md:block">
                        <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-3">{t("businessPlan")}</div>
                        <div className="space-y-1">
                            {planSections.map((s, i) => {
                                const done = i <= completed;
                                const Icon = s.icon;
                                return (
                                    <div
                                        key={s.label}
                                        className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition ${i === completed + 1
                                                ? "bg-primary/10 text-foreground"
                                                : done
                                                    ? "text-foreground"
                                                    : "text-muted-foreground"
                                            }`}
                                    >
                                        <Icon className="w-3.5 h-3.5 opacity-80" />
                                        <span className="flex-1 truncate">{s.label}</span>
                                        {done ? (
                                            <CheckCircle2 className="w-4 h-4 text-accent" />
                                        ) : i === completed + 1 ? (
                                            <span className="text-[10px] text-primary-glow">{t("generating")}</span>
                                        ) : (
                                            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </aside>

                    {/* Main */}
                    <div className="p-5 md:p-7 space-y-5">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <div className="text-xs text-muted-foreground">{t("draft")}</div>
                                <h3 className="text-lg md:text-xl font-semibold mt-0.5">{t("projectTitle")}</h3>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-2.5 py-1 text-xs text-muted-foreground">
                                    <span className="w-1.5 h-1.5 rounded-full bg-highlight" /> {t("aiDrafting")}
                                </span>
                                <button className="rounded-md btn-ghost text-xs px-3 py-1.5">{t("export")}</button>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                                <span>{t("overallCompletion")}</span>
                                <span className="font-mono text-foreground">{Math.min(progress, 100)}%</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-card overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-200"
                                    style={{ width: `${Math.min(progress, 100)}%`, background: "var(--gradient-primary)" }}
                                />
                            </div>
                        </div>

                        {/* KPI grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <KPI label="TAM" value="$12.4B" trend="+8.2%" />
                            <KPI label="Break-even" value="14 mo" trend={t("kpi.onPlan")} />
                            <KPI label="CAC" value="$18" trend="-12%" />
                            <KPI label="Yr 1 ARR" value="$420K" trend="+34%" />
                        </div>

                        {/* Chart + Summary */}
                        <div className="grid md:grid-cols-5 gap-3">
                            <div className="md:col-span-3 rounded-xl border border-border bg-card/40 p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="text-xs text-muted-foreground">{t("revenueForecast")}</div>
                                    <div className="flex gap-1.5 text-[10px]">
                                        <span className="inline-flex items-center gap-1 text-muted-foreground"><span className="w-2 h-2 rounded-sm bg-primary-glow" />{t("revenue")}</span>
                                        <span className="inline-flex items-center gap-1 text-muted-foreground"><span className="w-2 h-2 rounded-sm bg-accent" />{t("profit")}</span>
                                    </div>
                                </div>
                                <MiniChart />
                            </div>
                            <div className="md:col-span-2 rounded-xl border border-border bg-card/40 p-4">
                                <div className="text-xs text-muted-foreground mb-2">{t("executiveSummary")}</div>
                                <p className="text-sm text-foreground/90 leading-relaxed">
                                    {t("summaryText")}
                                </p>
                                <div className="mt-3 flex flex-wrap gap-1.5">
                                    {(["d2c", "subscription", "specialty", "sustainability"] as const).map((tag) => (
                                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full border border-border text-muted-foreground bg-surface/50">{t(`tags.${tag}`)}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function KPI({ label, value, trend }: { label: string; value: string; trend: string }) {
    return (
        <div className="rounded-xl border border-border bg-card/40 p-3">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
            <div className="mt-1 text-lg font-semibold">{value}</div>
            <div className="text-[11px] text-accent mt-0.5">{trend}</div>
        </div>
    );
}

function MiniChart() {
    const points = useMemo(() => {
        const n = 24;
        const rev = Array.from({ length: n }, (_, i) => 20 + i * 3 + Math.sin(i / 2) * 4);
        const prof = rev.map((r, i) => Math.max(2, r * 0.35 - 6 + Math.cos(i / 3) * 2));
        return { rev, prof };
    }, []);
    const w = 420, h = 140, pad = 8;
    const max = Math.max(...points.rev);
    const toPath = (arr: number[]) =>
        arr
            .map((v, i) => {
                const x = pad + (i * (w - pad * 2)) / (arr.length - 1);
                const y = h - pad - (v / max) * (h - pad * 2);
                return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
            })
            .join(" ");
    const area = (arr: number[]) => `${toPath(arr)} L${w - pad},${h - pad} L${pad},${h - pad} Z`;
    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-32">
            <defs>
                <linearGradient id="revF" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#79B79B" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#79B79B" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="prF" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#5B9179" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#5B9179" stopOpacity="0" />
                </linearGradient>
            </defs>
            <path d={area(points.rev)} fill="url(#revF)" />
            <path d={toPath(points.rev)} fill="none" stroke="#79B79B" strokeWidth="1.75" />
            <path d={area(points.prof)} fill="url(#prF)" />
            <path d={toPath(points.prof)} fill="none" stroke="#5B9179" strokeWidth="1.75" />
        </svg>
    );
}

/* ------------------------------ TRUST BAR ------------------------------ */
function TrustBar() {
    const items = ["Y COMBINATOR", "TECHSTARS", "SEQUOIA", "500 GLOBAL", "ANTLER", "PLUG&PLAY"];
    return (
        <section className="border-y border-border/60 bg-surface/40">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-6">
                    Trusted by founders backed by
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70">
                    {items.map((i) => (
                        <span key={i} className="text-sm font-semibold tracking-widest text-muted-foreground/80">{i}</span>
                    ))}
                </div>
            </div>
        </section>
    );
}
