"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Link, useRouter } from "@/i18n/navigation";
import { ArrowLink } from "@/shared/components/brand";
import { useReveal } from "@/shared/hooks/use-reveal";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib/utils";
import { Plan } from "@/features/admin/plans/types/plan";
import {
  CheckoutDialog,
  CheckoutPlanItem,
} from "@/features/checkout/components/checkout-dialog";
import {
  ArrowRight,
  ChevronRight,
  Mic2,
  Paperclip,
  Play,
  Send,
  Check,
  Sparkles,
  Coins,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface LandingPageProps {
  plans?: Plan[];
}

export function LandingPage({ plans = [] }: LandingPageProps) {
  useReveal();
  const t = useTranslations("Landing");

  const rhythmSteps = [
    ["01", t("rhythm.step1")],
    ["02", t("rhythm.step2")],
    ["03", t("rhythm.step3")],
  ] as const;

  return (
    <div className="overflow-clip bg-background text-foreground">
      <main>
        {/* ── HERO ── */}
        <section className="hero-grid mx-auto min-h-[min(900px,100svh)] max-w-[1500px] px-5 pb-16 pt-28 md:px-10 md:pt-36">
          <div className="hero-copy" data-reveal>
            <p className="eyebrow">{t("hero.eyebrow")}</p>
            <h1 className="hero-title">
              {t("hero.title1")}
              <br />
              {t("hero.title2")} <em>{t("hero.titleEm")}</em>
              <br />
              {t("hero.title3")}
            </h1>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              {t("hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/auth/register"
                className="group inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-medium text-brand-foreground shadow-sm transition-opacity hover:opacity-90"
              >
                <ArrowLink>{t("hero.ctaPrimary")}</ArrowLink>
              </Link>
              <a
                href="#workspace"
                className="inline-flex items-center gap-2 rounded-lg border border-border-strong bg-transparent px-6 py-3 text-sm font-medium transition-colors hover:border-brand/40 hover:bg-muted"
              >
                {t("hero.ctaSecondary")} <ArrowRight className="size-4" />
              </a>
            </div>
            <p className="mt-6 whitespace-pre-line text-xs uppercase leading-relaxed tracking-[0.16em] text-muted-foreground">
              {t("hero.tagline")}
            </p>
          </div>
          <CreativeDesk />
        </section>

        {/* ── PRODUCT ── */}
        <section
          id="product"
          className="border-y border-border bg-secondary px-5 py-24 md:px-10 md:py-36"
        >
          <div className="mx-auto max-w-[1400px]">
            <p className="eyebrow" data-reveal>
              {t("product.eyebrow")}
            </p>
            <h2 className="section-title max-w-5xl" data-reveal>
              {t("product.title", { em: "" }).replace("{em}", "")}{" "}
              <em>{t("product.titleEm")}</em>
            </h2>

            {/* 01 Chat */}
            <div
              className="mt-20 grid items-center gap-12 border-t border-border pt-12 lg:grid-cols-[.72fr_1.28fr]"
              data-reveal
            >
              <div>
                <span className="section-number">
                  {t("product.module1.number")}
                </span>
                <h3 className="module-title">
                  {t("product.module1.title")}
                </h3>
                <p className="module-copy">{t("product.module1.copy")}</p>
              </div>
              <ChatPreview />
            </div>

            {/* 02 Editor */}
            <div
              className="mt-28 grid items-center gap-12 border-t border-border pt-12 lg:grid-cols-[1.28fr_.72fr]"
              data-reveal
            >
              <EditorPreview />
              <div className="lg:order-2">
                <span className="section-number">
                  {t("product.module2.number")}
                </span>
                <h3 className="module-title">
                  {t("product.module2.title")}
                  <br />
                  <span className="font-serif font-normal italic">
                    {t("product.module2.titleItalic")}
                  </span>
                </h3>
                <p className="module-copy">{t("product.module2.copy")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── TOOLS ── */}
        <section
          id="tools"
          className="bg-ink px-5 py-24 text-paper md:px-10 md:py-36"
        >
          <div className="mx-auto max-w-[1400px]">
            <div
              className="flex flex-col justify-between gap-8 md:flex-row md:items-end"
              data-reveal
            >
              <div>
                <p className="eyebrow text-brand">{t("tools.eyebrow")}</p>
                <h2 className="section-title max-w-4xl text-paper">
                  {t("tools.title")}
                  <br />
                  <em>{t("tools.titleEm")}</em>
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-paper/55">
                {t("tools.subtitle")}
              </p>
            </div>
            <CreativeTools />
          </div>
        </section>

        {/* ── TEMPLATES ── */}
        <section
          id="templates"
          className="bg-background px-5 py-24 md:px-10 md:py-36"
        >
          <div className="mx-auto max-w-[1400px]">
            <div className="grid gap-8 lg:grid-cols-2" data-reveal>
              <h2 className="section-title">
                {t("templates.title")}
                <br />
                <em>{t("templates.titleAccent")}</em>
              </h2>
              <p className="max-w-md self-end text-base leading-relaxed text-muted-foreground lg:justify-self-end">
                {t("templates.subtitle")}
              </p>
            </div>
            <TemplateGallery />
          </div>
        </section>

        {/* ── WORKSPACE ── */}
        <section
          id="workspace"
          className="border-y border-border bg-secondary px-5 py-24 md:px-10 md:py-36"
        >
          <div className="mx-auto max-w-[1400px]">
            <div className="text-center" data-reveal>
              <p className="eyebrow">{t("workspace.eyebrow")}</p>
              <h2 className="section-title mx-auto max-w-4xl">
                {t("workspace.title")}
                <br />
                <em>{t("workspace.titleEm")}</em>
              </h2>
            </div>
            <WorkspacePreview />
          </div>
        </section>

        {/* ── RHYTHM ── */}
        <section className="bg-background px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-[1400px]">
            <p className="eyebrow" data-reveal>
              {t("rhythm.eyebrow")}
            </p>
            <div className="mt-10 border-y border-border" data-reveal>
              {rhythmSteps.map(([n, title]) => (
                <div
                  key={n}
                  className="group grid grid-cols-[4rem_1fr_auto] items-center border-b border-border py-7 last:border-0 md:grid-cols-[8rem_1fr_auto]"
                >
                  <span className="font-mono text-xs text-brand">{n}</span>
                  <h3 className="font-display text-2xl font-medium md:text-5xl">
                    {title}
                  </h3>
                  <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-2 group-hover:text-brand md:size-8 rtl:rotate-180 rtl:group-hover:-translate-x-2 rtl:group-hover:translate-x-0" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section
          id="pricing"
          className="bg-coral-soft px-5 py-24 md:px-10 md:py-32"
        >
          <div className="mx-auto max-w-[1400px]">
            <div
              className="flex flex-col justify-between gap-6 md:flex-row md:items-end"
              data-reveal
            >
              <div>
                <p className="eyebrow">{t("pricing.eyebrow")}</p>
                <h2 className="section-title">
                  {t("pricing.title")}
                  <br />
                  <em>{t("pricing.titleAccent")}</em>
                </h2>
              </div>
              <p className="max-w-sm text-sm text-muted-foreground">
                {t("pricing.subtitle")}
              </p>
            </div>
            <PricingCards plans={plans} />
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-ink px-5 py-28 text-paper md:px-10 md:py-40">
          <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-12 md:flex-row md:items-end">
            <h2
              className="font-display text-[clamp(3.6rem,9vw,9rem)] font-semibold leading-[.86] tracking-normal"
              data-reveal
            >
              {t("cta.title")}
              <br />
              <span className="font-serif font-normal italic text-brand">
                {t("cta.titleEm")}
              </span>
            </h2>
            <Link
              href="/auth/register"
              className="group inline-flex shrink-0 items-center gap-2 rounded-lg bg-brand px-8 py-4 text-base font-medium text-brand-foreground shadow-sm transition-opacity hover:opacity-90"
            >
              <ArrowLink>{t("cta.button")}</ArrowLink>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ─── Creative Desk ─────────────────────────────────────── */
function CreativeDesk() {
  const t = useTranslations("Landing.desk");
  return (
    <div
      className="creative-desk"
      data-reveal
      aria-label={t("deskAriaLabel")}
    >
      <div className="desk-label">{t("label")}</div>
      <div className="desk-image">
        <div className="sun-disc" />
        <span>{t("imageTag")}</span>
        <strong>{t("imageTitle")}</strong>
      </div>
      <div className="desk-doc">
        <span>{t("draftTag")}</span>
        <h3>{t("draftTitle")}</h3>
        <p>{t("draftCopy")}</p>
        <div />
        <div />
      </div>
      <div className="desk-slide">
        <span>{t("slideTag")}</span>
        <strong>{t("slideTitle")}</strong>
        <i>{t("slideDate")}</i>
      </div>
      <div className="desk-audio">
        <Mic2 className="size-4" />
        <div>
          {Array.from({ length: 21 }, (_, i) => (
            <i key={i} style={{ height: `${12 + ((i * 13) % 36)}px` }} />
          ))}
        </div>
        <span>00:24</span>
      </div>
      <div className="desk-video">
        <Play className="size-4" />
        <span>{t("filmLabel")}</span>
      </div>
    </div>
  );
}

/* ─── Chat Preview ──────────────────────────────────────── */
function ChatPreview() {
  const t = useTranslations("Landing.chatPreview");
  return (
    <div className="product-window chat-window">
      <div className="window-bar">
        <span />
        <span>{t("windowTitle")}</span>
        <i>•••</i>
      </div>
      <div className="chat-body">
        <div className="chat-prompt">
          <small>{t("youLabel")}</small>
          <p>{t("prompt")}</p>
          <span>
            <Paperclip className="size-3" /> {t("attachment")}
          </span>
        </div>
        <div className="chat-answer">
          <small>{t("oricoLabel")}</small>
          <h4>{t("responseTitle")}</h4>
          <p>{t("responseBody")}</p>
          <div className="idea-strip">
            <span>{t("campaignLineLabel")}</span>
            <strong>{t("campaignLine")}</strong>
          </div>
          <div className="chat-actions">
            <span>{t("actionBrief")}</span>
            <span>{t("actionDraft")}</span>
            <span>{t("actionEditor")}</span>
          </div>
        </div>
      </div>
      <div className="chat-input">
        <span>{t("placeholder")}</span>
        <button
          type="button"
          aria-label={t("sendAriaLabel")}
          className="flex size-8 items-center justify-center rounded-full bg-brand text-brand-foreground"
        >
          <Send className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

/* ─── Editor Preview ────────────────────────────────────── */
function EditorPreview() {
  const t = useTranslations("Landing.editorPreview");
  return (
    <div className="product-window editor-window">
      <div className="editor-tools">
        <span>{t("docTitle")}</span>
        <div>B&nbsp;&nbsp; <i>I</i>&nbsp;&nbsp; H1&nbsp;&nbsp; &quot;</div>
        <span>{t("saved")}</span>
      </div>
      <div className="editor-page">
        <p className="eyebrow">{t("draftLabel")}</p>
        <h4>{t("editorTitle")}</h4>
        <p>
          {t("p1")}{" "}
          <mark>{t("p1Highlight")}</mark>
        </p>
        <p>{t("p2")}</p>
        <div className="selection-menu">
          <span>{t("actionRewrite")}</span>
          <span>{t("actionImprove")}</span>
          <span>{t("actionExpand")}</span>
          <span>{t("actionSummarize")}</span>
        </div>
      </div>
      <aside>
        <span>{t("statsWords")}</span>
        <strong>284</strong>
        <span>{t("statsTone")}</span>
        <strong>{t("statsToneValue")}</strong>
        <span>{t("statsReading")}</span>
        <strong>{t("statsReadingValue")}</strong>
      </aside>
    </div>
  );
}

/* ─── Creative Tools ────────────────────────────────────── */
function CreativeTools() {
  const t = useTranslations("Landing.tools");
  return (
    <div className="tools-layout mt-16" data-reveal>
      <article className="tool-image">
        <div className="tool-meta">
          <span>{t("image.tag")}</span>
          <h3>{t("image.title")}</h3>
        </div>
        <div className="image-canvas">
          <span className="shape-a" />
          <span className="shape-b" />
          <span className="shape-c" />
        </div>
      </article>

      <article className="tool-slides">
        <div className="slide-stack">
          <div />
          <div />
          <div>
            <small>IDEA / 01</small>
            <strong>MAKE<br />THE POINT.</strong>
          </div>
        </div>
        <div className="tool-meta">
          <span>{t("slides.tag")}</span>
          <h3>{t("slides.title")}</h3>
        </div>
      </article>

      <article className="tool-audio">
        <div className="audio-lines">
          {Array.from({ length: 42 }, (_, i) => (
            <i key={i} style={{ height: `${10 + ((i * 17) % 55)}px` }} />
          ))}
        </div>
        <div className="tool-meta">
          <span>{t("audio.tag")}</span>
          <h3>{t("audio.title")}</h3>
        </div>
        <div className="timecode">01:42 / 03:10</div>
      </article>

      <article className="tool-video">
        <div className="frame-grid">
          <span /><span /><span /><span />
        </div>
        <button
          type="button"
          aria-label={t("video.title")}
          className="flex size-10 items-center justify-center rounded-full bg-brand text-brand-foreground"
        >
          <Play className="size-4" />
        </button>
        <div className="tool-meta">
          <span>{t("video.tag")}</span>
          <h3>{t("video.title")}</h3>
        </div>
      </article>
    </div>
  );
}

/* ─── Template Gallery ──────────────────────────────────── */
const TEMPLATE_KEYS = [
  { kindKey: "kindSocial" as const, titleKey: "social" as const, cls: "template-social" },
  { kindKey: "kindBusiness" as const, titleKey: "business" as const, cls: "template-business" },
  { kindKey: "kindEducation" as const, titleKey: "education" as const, cls: "template-education" },
  { kindKey: "kindMarketing" as const, titleKey: "marketing" as const, cls: "template-marketing" },
  { kindKey: "kindWriting" as const, titleKey: "writing" as const, cls: "template-writing" },
  { kindKey: "kindPresentation" as const, titleKey: "presentation" as const, cls: "template-presentation" },
];

function TemplateGallery() {
  const t = useTranslations("Landing.templates.gallery");
  return (
    <div className="template-gallery mt-16" data-reveal>
      {TEMPLATE_KEYS.map((item, index) => (
        <article className={`template ${item.cls}`} key={item.kindKey}>
          <div className="template-art">
            <span className="template-index">0{index + 1}</span>
            <strong>{t(item.titleKey)}</strong>
            <i />
          </div>
          <div className="mt-4 flex items-center justify-between px-3 pb-3">
            <span className="text-xs text-muted-foreground">
              {t(item.kindKey)}
            </span>
            <ChevronRight className="size-4 text-muted-foreground rtl:rotate-180" />
          </div>
        </article>
      ))}
    </div>
  );
}

/* ─── Workspace Preview ─────────────────────────────────── */
function WorkspacePreview() {
  const t = useTranslations("Landing.workspacePreview");
  return (
    <div className="workspace-scene mt-16" data-reveal>
      <div className="workspace-sidebar">
        <div className="font-display font-semibold text-base text-paper">
          {t("brandName")}
        </div>
        <div>
          <span className="active">{t("navNew")}</span>
          <span>{t("navChat")}</span>
          <span>{t("navDocs")}</span>
          <span>{t("navPresentations")}</span>
          <span>{t("navMedia")}</span>
        </div>
        <small>JH&nbsp;&nbsp; Jordan Hall</small>
      </div>
      <div className="workspace-main">
        <div className="workspace-top">
          <span>{t("campaignTitle")}</span>
          <span>{t("shareLabel")}&nbsp;&nbsp; •••</span>
        </div>
        <div className="workspace-board">
          <div className="ws-doc">
            <small>{t("conceptLabel")}</small>
            <h4>{t("conceptTitle")}</h4>
            <p>{t("conceptBody")}</p>
          </div>
          <div className="ws-image">
            <span />
            <strong>{t("imageTitle")}</strong>
          </div>
          <div className="ws-chat">
            <small>{t("oricoLabel")}</small>
            <p>{t("oricoMessage")}</p>
            <button type="button">{t("openDirection")}</button>
          </div>
          <div className="ws-wave">
            {Array.from({ length: 18 }, (_, i) => (
              <i key={i} style={{ height: `${8 + ((i * 11) % 30)}px` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Pricing ───────────────────────────────────────────── */
const PLAN_KEYS = ["starter", "pro", "business"] as const;

function PricingCards({ plans = [] }: { plans?: Plan[] }) {
  const t = useTranslations("Landing.pricing");
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<CheckoutPlanItem | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handlePlanSelect = (item: CheckoutPlanItem) => {
    if (status !== "authenticated" || !session) {
      router.push("/auth/register");
      return;
    }

    setSelectedPlan(item);
    setIsCheckoutOpen(true);
  };

  const displayPlans =
    plans && plans.length > 0
      ? plans.map((p) => ({
          key: String(p.id),
          name: p.name,
          price:
            typeof p.price === "number" || !String(p.price).startsWith("$")
              ? `$${p.price}`
              : String(p.price),
          copy: p.description,
          frequency: p.frequency,
          credits: p.credits ? Number(p.credits) : undefined,
          features: Array.isArray(p.features) ? p.features : [],
          featured: Boolean(p.is_featured),
        }))
      : PLAN_KEYS.map((key) => ({
          key,
          name: t(`plans.${key}.name`),
          price: t(`plans.${key}.price`),
          copy: t(`plans.${key}.copy`),
          frequency: undefined as string | undefined,
          credits: key === "starter" ? 200 : key === "pro" ? 2500 : 15000,
          features: [
            t(`plans.${key}.f1`),
            t(`plans.${key}.f2`),
            t(`plans.${key}.f3`),
          ],
          featured: key === "pro",
        }));

  return (
    <div className="mt-16 space-y-12" data-reveal>
      <div
        className={cn(
          "grid gap-8 items-stretch",
          displayPlans.length === 2
            ? "md:grid-cols-2 max-w-4xl mx-auto"
            : displayPlans.length >= 4
            ? "md:grid-cols-2 lg:grid-cols-4"
            : "lg:grid-cols-3"
        )}
      >
        {displayPlans.map((plan) => (
          <article
            key={plan.key}
            className={cn(
              "relative rounded-3xl p-8 md:p-10 flex flex-col justify-between transition-all duration-300",
              plan.featured
                ? "bg-ink text-paper shadow-2xl lg:-translate-y-3 hover:-translate-y-4 border-2 border-brand ring-4 ring-brand/10"
                : "bg-background text-foreground border border-border shadow-sm hover:shadow-xl hover:border-brand/40 hover:-translate-y-1"
            )}
          >
            {/* Featured Badge */}
            {plan.featured && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rtl:left-auto rtl:right-1/2 rtl:translate-x-1/2 z-10">
                <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-[0.7rem] font-bold uppercase tracking-wider bg-brand text-brand-foreground shadow-md">
                  <Sparkles className="size-3.5" />
                  {t("mostPopular")}
                </span>
              </div>
            )}

            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
                    {plan.name}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 text-sm leading-relaxed min-h-[40px]",
                      plan.featured ? "text-paper/70" : "text-muted-foreground"
                    )}
                  >
                    {plan.copy}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="mt-6 flex items-baseline gap-1.5">
                <strong className="font-display text-5xl md:text-6xl font-extrabold tracking-tight">
                  {plan.price}
                </strong>
                <span
                  className={cn(
                    "text-xs uppercase tracking-wider font-semibold",
                    plan.featured ? "text-paper/60" : "text-muted-foreground"
                  )}
                >
                  {plan.frequency ? `/${plan.frequency}` : t("perMonth")}
                </span>
              </div>

              {/* Credits Pill */}
              {Boolean(plan.credits && plan.credits > 0) && (
                <div className="mt-4">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold",
                      plan.featured
                        ? "bg-brand/20 text-brand border border-brand/30"
                        : "bg-brand/10 text-brand border border-brand/20"
                    )}
                  >
                    <Coins className="size-3.5 text-brand shrink-0" />
                    <span>
                      {Number(plan.credits).toLocaleString()}{" "}
                      {t("creditsLabel", { credits: "" }).trim() || "credits / month"}
                    </span>
                  </span>
                </div>
              )}

              {/* Divider */}
              <div
                className={cn(
                  "my-8 border-t",
                  plan.featured ? "border-paper/10" : "border-border/60"
                )}
              />

              {/* Features List */}
              <p
                className={cn(
                  "text-xs font-bold uppercase tracking-wider mb-4",
                  plan.featured ? "text-paper/60" : "text-muted-foreground"
                )}
              >
                {t("featuresLabel") || "What's included"}
              </p>
              <ul className="space-y-3.5 text-sm">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className={cn(
                        "size-5 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                        plan.featured
                          ? "bg-brand/25 text-brand"
                          : "bg-brand/10 text-brand"
                      )}
                    >
                      <Check className="size-3 stroke-[2.5]" />
                    </div>
                    <span
                      className={cn(
                        "leading-snug",
                        plan.featured ? "text-paper/90" : "text-foreground/90"
                      )}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <div className="mt-10 pt-4">
              <button
                type="button"
                onClick={() =>
                  handlePlanSelect({
                    id: plan.key,
                    name: plan.name,
                    price: plan.price,
                    frequency: plan.frequency,
                    credits: plan.credits,
                    copy: plan.copy,
                    features: plan.features,
                  })
                }
                className={cn(
                  "w-full py-3.5 px-6 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 group transition-all duration-200 shadow-sm cursor-pointer",
                  plan.featured
                    ? "bg-brand text-brand-foreground hover:bg-brand/90 hover:shadow-brand/25 hover:shadow-lg"
                    : "bg-card border-2 border-border-strong hover:border-brand hover:bg-brand/5 hover:text-brand"
                )}
              >
                <span>{t("choosePlan", { plan: plan.name.split(" /")[0] })}</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Trust & Reassurance Badges */}
      <div className="pt-8 border-t border-border/40 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs font-medium text-muted-foreground">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-4 text-brand shrink-0" />
          <span>{t("reassurance1") || "Cancel anytime, no commitments"}</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="size-4 text-brand shrink-0" />
          <span>{t("reassurance2") || "Instant AI credits activation"}</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-brand shrink-0" />
          <span>{t("reassurance3") || "Commercial license included"}</span>
        </div>
      </div>

      {/* Checkout Dialog */}
      <CheckoutDialog
        plan={selectedPlan}
        open={isCheckoutOpen}
        onOpenChange={setIsCheckoutOpen}
      />
    </div>
  );
}
