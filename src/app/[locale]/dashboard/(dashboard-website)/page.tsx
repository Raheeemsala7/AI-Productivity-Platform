import { authOptions } from "@/auth";
import { Link } from "@/i18n/navigation";
import {
  BarChart3,
  BotMessageSquare,
  FileText,
  Image,
  Mic2,
  Monitor,
  Play,
  Presentation,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";

/* ─────────────────────────────────────────────────────────
   Static data — replace with real API calls when ready
───────────────────────────────────────────────────────── */
const STATS = [
  { key: "businessPlans", value: "3", delta: "+1 this week", icon: FileText },
  { key: "marketAnalysis", value: "5", delta: "+2 this week", icon: BarChart3 },
  { key: "pitchDecks", value: "2", delta: "Latest: today", icon: Presentation },
  { key: "projects", value: "4", delta: "2 active", icon: TrendingUp },
] as const;

const TOOLS = [
  {
    href: "/dashboard/chat",
    icon: BotMessageSquare,
    label: "AI Chat",
    desc: "Shape ideas, write content, and get instant answers.",
    accent: "brand",
  },
  {
    href: "/dashboard/plans",
    icon: FileText,
    label: "Business Plan",
    desc: "Generate investor-ready plans in minutes.",
    accent: "ink",
  },
  {
    href: "/dashboard/presentations",
    icon: Monitor,
    label: "Presentations",
    desc: "Turn your ideas into polished slide decks.",
    accent: "sand",
  },
  {
    href: "/dashboard/images",
    icon: Image,
    label: "AI Images",
    desc: "Create visuals from words.",
    accent: "paper",
  },
  {
    href: "/dashboard/audio",
    icon: Mic2,
    label: "Voice AI",
    desc: "Convert text to natural-sounding speech.",
    accent: "paper",
  },
  {
    href: "/dashboard/video",
    icon: Play,
    label: "Video",
    desc: "Bring concepts to life with motion.",
    accent: "paper",
  },
] as const;

const RECENT = [
  {
    kind: "Plan",
    title: "Coastal Roast — Online Coffee Shop",
    date: "Today",
    pages: "32 pages",
  },
  {
    kind: "Deck",
    title: "Q3 Investor Update",
    date: "Yesterday",
    pages: "18 slides",
  },
  {
    kind: "Analysis",
    title: "Arabic FMCG Market Overview",
    date: "3 days ago",
    pages: "12 pages",
  },
];

/* ─────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────── */
export default async function DashboardPage() {
  const t = await getTranslations("Dashboard");
  const session = await getServerSession(authOptions);
  const firstName = session?.user?.name?.split(" ")[0] ?? "there";

  return (
    <div className="mx-auto max-w-[1200px] space-y-10 py-2">
      {/* ── Welcome banner ── */}
      <section className="relative overflow-hidden rounded-2xl bg-ink px-7 py-9 text-[var(--color-paper)] md:px-10 md:py-11">
        {/* decorative coral orb */}
        <span
          className="pointer-events-none absolute -right-8 -top-8 size-48 rounded-full opacity-25"
          style={{ background: "var(--color-brand)" }}
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute -bottom-10 right-32 size-28 rounded-full opacity-15"
          style={{ background: "var(--color-brand)" }}
          aria-hidden="true"
        />

        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
          {t("overview")}
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold leading-tight tracking-normal md:text-4xl">
          {t("welcome", { name: firstName })}
          <span className="font-serif font-normal italic text-brand">.</span>
        </h1>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-[var(--color-paper)]/60">
          {t("subtitle")}
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/dashboard/chat"
            className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90"
          >
            <Sparkles className="size-3.5" />
            Start a new conversation
          </Link>
          <Link
            href="/dashboard/plans"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-paper)]/20 px-5 py-2.5 text-sm font-medium text-[var(--color-paper)]/80 transition-colors hover:border-[var(--color-paper)]/40 hover:text-[var(--color-paper)]"
          >
            <FileText className="size-3.5" />
            Generate business plan
          </Link>
        </div>
      </section>

      {/* ── Stats ── */}
      <section>
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Your activity
        </p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {STATS.map(({ key, value, delta, icon: Icon }) => (
            <div
              key={key}
              className="rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-[var(--shadow-lift)]"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  {t(key)}
                </span>
                <Icon className="size-3.5 text-brand" />
              </div>
              <p className="font-display text-3xl font-semibold">{value}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">{delta}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Quick-access tools ── */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Creative tools
          </p>
          <span className="inline-flex items-center gap-1 rounded-full border border-signal/30 bg-signal/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-signal-foreground">
            <Zap className="size-2.5" /> AI Active
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-brand/40 hover:shadow-[var(--shadow-soft)]"
            >
              <span
                className={`flex size-9 items-center justify-center rounded-lg ${
                  tool.accent === "brand"
                    ? "bg-brand text-brand-foreground"
                    : tool.accent === "ink"
                      ? "bg-ink text-[var(--color-paper)]"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                <tool.icon className="size-4" />
              </span>
              <div>
                <p className="text-sm font-medium leading-tight">{tool.label}</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
                  {tool.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Recent work ── */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Recent work
          </p>
          <Link
            href="/dashboard/projects"
            className="text-xs font-medium text-brand transition-opacity hover:opacity-75"
          >
            View all →
          </Link>
        </div>

        <div className="overflow-hidden rounded-xl border border-border">
          {RECENT.map((item, i) => (
            <div
              key={item.title}
              className={`flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-muted/40 ${
                i < RECENT.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="shrink-0 rounded-md border border-border bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {item.kind}
                </span>
                <p className="truncate text-sm font-medium">{item.title}</p>
              </div>
              <div className="flex shrink-0 items-center gap-4 text-xs text-muted-foreground">
                <span className="hidden sm:block">{item.pages}</span>
                <span>{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA strip ── */}
      <section className="rounded-2xl border border-brand/20 bg-coral-soft px-7 py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              Pro plan
            </p>
            <p className="mt-1 text-sm font-medium">
              840 / 1,000 credits used this month
            </p>
            <div className="mt-2 h-1.5 w-48 overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-brand"
                style={{ width: "84%" }}
              />
            </div>
          </div>
          <Link
            href="/dashboard/settings"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:border-brand/40 hover:text-brand"
          >
            Manage plan
          </Link>
        </div>
      </section>
    </div>
  );
}
