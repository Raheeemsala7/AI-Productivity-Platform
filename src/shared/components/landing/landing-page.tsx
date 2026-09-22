"use client";

import { Link } from "@/i18n/navigation";
import { ArrowLink } from "@/shared/components/brand";
import { useReveal } from "@/shared/hooks/use-reveal";
import {
  ArrowRight,
  ChevronRight,
  Mic2,
  Paperclip,
  Play,
  Send,
  Sparkle,
} from "lucide-react";

export function LandingPage() {
  useReveal();

  return (
    <div className="overflow-clip bg-background text-foreground">
      <main>
        {/* ── HERO ── */}
        <section className="hero-grid mx-auto min-h-[min(900px,100svh)] max-w-[1500px] px-5 pb-16 pt-28 md:px-10 md:pt-36">
          <div className="hero-copy" data-reveal>
            <p className="eyebrow">Create without limits</p>
            <h1 className="hero-title">
              Your ideas
              <br />
              deserve <em>more</em>
              <br />
              than one tool.
            </h1>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              A single intelligent workspace to write, design, present, and turn
              imagination into finished work.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/auth/register"
                className="group inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-medium text-brand-foreground shadow-sm transition-opacity hover:opacity-90"
              >
                <ArrowLink>Start Creating</ArrowLink>
              </Link>
              <a
                href="#workspace"
                className="inline-flex items-center gap-2 rounded-lg border border-border-strong bg-transparent px-6 py-3 text-sm font-medium transition-colors hover:border-brand/40 hover:bg-muted"
              >
                Explore the Workspace <ArrowRight className="size-4" />
              </a>
            </div>
            <p className="mt-6 text-xs uppercase leading-relaxed tracking-[0.16em] text-muted-foreground">
              Write. Design. Present. Generate.
              <br />
              One workspace.
            </p>
          </div>
          <CreativeDesk />
        </section>

        {/* ── PRODUCT ── */}
        <section
          id="product"
          className="border-y border-border bg-bone px-5 py-24 md:px-10 md:py-36"
        >
          <div className="mx-auto max-w-[1400px]">
            <p className="eyebrow" data-reveal>
              Inside ORICO
            </p>
            <h2
              className="section-title max-w-5xl"
              data-reveal
            >
              Everything you need to turn an idea into{" "}
              <em>something real.</em>
            </h2>

            {/* 01 Chat */}
            <div
              className="mt-20 grid items-center gap-12 border-t border-border pt-12 lg:grid-cols-[.72fr_1.28fr]"
              data-reveal
            >
              <div>
                <span className="section-number">01 / CONVERSATION</span>
                <h3 className="module-title">
                  Start with
                  <br />a thought.
                </h3>
                <p className="module-copy">
                  Bring a half-formed idea, a file, or a difficult question.
                  ORICO holds the context and helps you find the shape.
                </p>
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
                <span className="section-number">02 / WRITING</span>
                <h3 className="module-title">
                  Write better.
                  <br />
                  <span className="font-serif font-normal italic">
                    Stay in flow.
                  </span>
                </h3>
                <p className="module-copy">
                  Transform the sentence in front of you without leaving the
                  page — or losing the voice that made it yours.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── TOOLS ── */}
        <section
          id="tools"
          className="bg-ink px-5 py-24 text-[var(--color-paper)] md:px-10 md:py-36"
        >
          <div className="mx-auto max-w-[1400px]">
            <div
              className="flex flex-col justify-between gap-8 md:flex-row md:items-end"
              data-reveal
            >
              <div>
                <p className="eyebrow text-brand">Four more ways to make</p>
                <h2 className="section-title max-w-4xl text-[var(--color-paper)]">
                  Not just words.
                  <br />
                  <em>Worlds.</em>
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-[var(--color-paper)]/55">
                Move from prompt to polished output without stitching together a
                dozen disconnected tools.
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
                Start from an idea.
                <br />
                Or start from <em>a template.</em>
              </h2>
              <p className="max-w-md self-end text-base leading-relaxed text-muted-foreground lg:justify-self-end">
                Not empty boxes. Thoughtful starting points built for the work
                people actually make.
              </p>
            </div>
            <TemplateGallery />
          </div>
        </section>

        {/* ── WORKSPACE ── */}
        <section
          id="workspace"
          className="border-y border-border bg-bone px-5 py-24 md:px-10 md:py-36"
        >
          <div className="mx-auto max-w-[1400px]">
            <div className="text-center" data-reveal>
              <p className="eyebrow">The complete workspace</p>
              <h2 className="section-title mx-auto max-w-4xl">
                One workspace.
                <br />
                <em>Countless possibilities.</em>
              </h2>
            </div>
            <WorkspacePreview />
          </div>
        </section>

        {/* ── RHYTHM ── */}
        <section className="bg-background px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-[1400px]">
            <p className="eyebrow" data-reveal>
              A simple rhythm
            </p>
            <div className="mt-10 border-y border-border" data-reveal>
              {[
                ["01", "Start with an idea"],
                ["02", "Shape it with AI"],
                ["03", "Create something real"],
              ].map(([n, title]) => (
                <div
                  key={n}
                  className="group grid grid-cols-[4rem_1fr_auto] items-center border-b border-border py-7 last:border-0 md:grid-cols-[8rem_1fr_auto]"
                >
                  <span className="font-mono text-xs text-brand">{n}</span>
                  <h3 className="font-display text-2xl font-medium md:text-5xl">
                    {title}
                  </h3>
                  <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-2 group-hover:text-brand md:size-8" />
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
                <p className="eyebrow">Choose your canvas</p>
                <h2 className="section-title">
                  Make one thing.
                  <br />
                  Then <em>make everything.</em>
                </h2>
              </div>
              <p className="max-w-sm text-sm text-muted-foreground">
                Start free. Upgrade when your ideas need more room.
              </p>
            </div>
            <PricingCards />
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-ink px-5 py-28 text-[var(--color-paper)] md:px-10 md:py-40">
          <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-12 md:flex-row md:items-end">
            <h2
              className="font-display text-[clamp(3.6rem,9vw,9rem)] font-semibold leading-[.86] tracking-normal"
              data-reveal
            >
              Your next idea
              <br />
              <span className="font-serif font-normal italic text-brand">
                starts here.
              </span>
            </h2>
            <Link
              href="/auth/register"
              className="group inline-flex shrink-0 items-center gap-2 rounded-lg bg-brand px-8 py-4 text-base font-medium text-brand-foreground shadow-sm transition-opacity hover:opacity-90"
            >
              <ArrowLink>Start Creating</ArrowLink>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ─── Creative Desk ─────────────────────────────────────── */
function CreativeDesk() {
  return (
    <div
      className="creative-desk"
      data-reveal
      aria-label="A composition of writing, image, presentation, audio, and video tools"
    >
      <div className="desk-label">ONE IDEA / MANY FORMS</div>
      <div className="desk-image">
        <div className="sun-disc" />
        <span>IMAGE / 01</span>
        <strong>
          Other
          <br />
          worlds
        </strong>
      </div>
      <div className="desk-doc">
        <span>DRAFT 03</span>
        <h3>
          The shape of
          <br />
          an unfinished idea
        </h3>
        <p>
          Creativity rarely arrives complete. It begins as a phrase, a feeling,
          a fragment worth following.
        </p>
        <div />
        <div />
      </div>
      <div className="desk-slide">
        <span>04</span>
        <strong>
          THE NEW
          <br />
          CREATIVE
          <br />
          SYSTEM
        </strong>
        <i>FORM / 2026</i>
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
        <span>CONCEPT FILM · 00:18</span>
      </div>
    </div>
  );
}

/* ─── Chat Preview ──────────────────────────────────────── */
function ChatPreview() {
  return (
    <div className="product-window chat-window">
      <div className="window-bar">
        <span />
        <span>Conversation / Campaign concept</span>
        <i>•••</i>
      </div>
      <div className="chat-body">
        <div className="chat-prompt">
          <small>YOU</small>
          <p>
            Help me turn the attached research into a campaign idea that feels
            human, not techy.
          </p>
          <span>
            <Paperclip className="size-3" /> field-notes.pdf · 2.4 MB
          </span>
        </div>
        <div className="chat-answer">
          <small>ORICO</small>
          <h4>Let&apos;s build it around unfinished thoughts.</h4>
          <p>
            Instead of promising instant perfection, the campaign celebrates the
            strange, half-formed beginnings behind meaningful work.
          </p>
          <div className="idea-strip">
            <span>Campaign line</span>
            <strong>Start messy. Make it real.</strong>
          </div>
          <div className="chat-actions">
            <span>Make a brief</span>
            <span>Draft concepts</span>
            <span>Open in editor</span>
          </div>
        </div>
      </div>
      <div className="chat-input">
        <span>Keep shaping this idea…</span>
        <button
          type="button"
          aria-label="Send"
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
  return (
    <div className="product-window editor-window">
      <div className="editor-tools">
        <span>Untitled essay</span>
        <div>
          B&nbsp;&nbsp; <i>I</i>&nbsp;&nbsp; H1&nbsp;&nbsp; &quot;
        </div>
        <span>Saved</span>
      </div>
      <div className="editor-page">
        <p className="eyebrow">Essay / Draft</p>
        <h4>
          What we make
          <br />
          shapes us, too.
        </h4>
        <p>
          Every creative decision leaves a trace.{" "}
          <mark>
            The tools we choose can flatten that process, or they can create
            space for better questions.
          </mark>
        </p>
        <p>We built ORICO for the second kind of work.</p>
        <div className="selection-menu">
          <span>Rewrite</span>
          <span>Improve</span>
          <span>Expand</span>
          <span>Summarize</span>
        </div>
      </div>
      <aside>
        <span>WORDS</span>
        <strong>284</strong>
        <span>TONE</span>
        <strong>Reflective</strong>
        <span>READING</span>
        <strong>2 min</strong>
      </aside>
    </div>
  );
}

/* ─── Creative Tools ────────────────────────────────────── */
function CreativeTools() {
  return (
    <div className="tools-layout mt-16" data-reveal>
      {/* Image */}
      <article className="tool-image">
        <div className="tool-meta">
          <span>IMAGE / 03</span>
          <h3>
            Turn words
            <br />
            into visuals.
          </h3>
        </div>
        <div className="image-canvas">
          <span className="shape-a" />
          <span className="shape-b" />
          <span className="shape-c" />
          <p>
            A study in
            <br />
            form and light
          </p>
        </div>
      </article>

      {/* Slides */}
      <article className="tool-slides">
        <div className="slide-stack">
          <div />
          <div />
          <div>
            <small>IDEA / 01</small>
            <strong>
              MAKE
              <br />
              THE POINT.
            </strong>
          </div>
        </div>
        <div className="tool-meta">
          <span>PRESENTATIONS</span>
          <h3>
            Turn ideas
            <br />
            into slides.
          </h3>
        </div>
      </article>

      {/* Audio */}
      <article className="tool-audio">
        <div className="audio-lines">
          {Array.from({ length: 42 }, (_, i) => (
            <i key={i} style={{ height: `${10 + ((i * 17) % 55)}px` }} />
          ))}
        </div>
        <div className="tool-meta">
          <span>AUDIO</span>
          <h3>
            Turn text into <em>voice.</em>
          </h3>
        </div>
        <div className="timecode">01:42 / 03:10</div>
      </article>

      {/* Video */}
      <article className="tool-video">
        <div className="frame-grid">
          <span />
          <span />
          <span />
          <span />
        </div>
        <button
          type="button"
          aria-label="Play video"
          className="flex size-10 items-center justify-center rounded-full bg-brand text-brand-foreground"
        >
          <Play className="size-4" />
        </button>
        <div className="tool-meta">
          <span>VIDEO</span>
          <h3>
            Turn concepts
            <br />
            into motion.
          </h3>
        </div>
      </article>
    </div>
  );
}

/* ─── Template Gallery ──────────────────────────────────── */
const TEMPLATES = [
  { kind: "SOCIAL", title: "Ideas worth sharing", cls: "template-social" },
  { kind: "BUSINESS", title: "Annual perspective", cls: "template-business" },
  {
    kind: "EDUCATION",
    title: "The science of seeing",
    cls: "template-education",
  },
  {
    kind: "MARKETING",
    title: "Made for movement",
    cls: "template-marketing",
  },
  { kind: "WRITING", title: "Notes on attention", cls: "template-writing" },
  {
    kind: "PRESENTATION",
    title: "New rituals",
    cls: "template-presentation",
  },
];

function TemplateGallery() {
  return (
    <div className="template-gallery mt-16" data-reveal>
      {TEMPLATES.map((item, index) => (
        <article className={`template ${item.cls}`} key={item.kind}>
          <div className="template-art">
            <span className="template-index">0{index + 1}</span>
            <strong>{item.title}</strong>
            <i />
          </div>
          <div className="mt-4 flex items-center justify-between px-3 pb-3">
            <span className="text-xs text-muted-foreground">{item.kind}</span>
            <ChevronRight className="size-4 text-muted-foreground" />
          </div>
        </article>
      ))}
    </div>
  );
}

/* ─── Workspace Preview ─────────────────────────────────── */
function WorkspacePreview() {
  return (
    <div className="workspace-scene mt-16" data-reveal>
      <div className="workspace-sidebar">
        <div className="text-[var(--color-paper)] font-display font-semibold text-base">
          ORICO
        </div>
        <div>
          <span className="active">＋ New</span>
          <span>⌁ Chat</span>
          <span>▤ Documents</span>
          <span>▦ Presentations</span>
          <span>◫ Media</span>
        </div>
        <small>JH&nbsp;&nbsp; Jordan Hall</small>
      </div>
      <div className="workspace-main">
        <div className="workspace-top">
          <span>Campaign / New rituals</span>
          <span>Share&nbsp;&nbsp; •••</span>
        </div>
        <div className="workspace-board">
          <div className="ws-doc">
            <small>CONCEPT NOTE</small>
            <h4>
              A better way
              <br />
              to begin.
            </h4>
            <p>Tools should meet ideas where they are.</p>
          </div>
          <div className="ws-image">
            <span />
            <strong>
              NEW
              <br />
              RITUALS
            </strong>
          </div>
          <div className="ws-chat">
            <small>ORICO</small>
            <p>
              I&apos;ve shaped three directions from your brief. The second
              feels closest to the tone you described.
            </p>
            <button type="button">Open direction 02 →</button>
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
const PLANS = [
  {
    name: "Free / Starter",
    price: "$0",
    copy: "For finding your first idea.",
    features: [
      "Core chat and editor",
      "20 generations / month",
      "Essential templates",
    ],
    featured: false,
  },
  {
    name: "Pro",
    price: "$24",
    copy: "For making ideas happen.",
    features: [
      "Every creative tool",
      "Unlimited projects",
      "Premium generation",
    ],
    featured: true,
  },
  {
    name: "Business",
    price: "$64",
    copy: "For teams making together.",
    features: ["Shared workspaces", "Brand systems", "Priority support"],
    featured: false,
  },
];

function PricingCards() {
  return (
    <div
      className="mt-16 grid border border-border bg-background lg:grid-cols-3"
      data-reveal
    >
      {PLANS.map((plan) => (
        <article
          key={plan.name}
          className={`relative p-7 md:p-10 ${
            plan.featured
              ? "bg-ink text-[var(--color-paper)]"
              : "border-b border-border last:border-0 lg:border-b-0 lg:border-r"
          }`}
        >
          {plan.featured && (
            <span className="absolute right-5 top-5 bg-brand px-2 py-1 text-[.6rem] font-semibold uppercase text-brand-foreground">
              Most popular
            </span>
          )}
          <p className="text-xs uppercase tracking-[.16em] opacity-60">
            {plan.name}
          </p>
          <div className="mt-10 flex items-end gap-2">
            <strong className="font-display text-5xl font-semibold">
              {plan.price}
            </strong>
            <span className="mb-1 text-xs opacity-60">/ month</span>
          </div>
          <p className="mt-4 text-sm opacity-65">{plan.copy}</p>
          <ul className="my-9 space-y-3 text-sm">
            {plan.features.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="text-brand">—</span>
                {f}
              </li>
            ))}
          </ul>
          <Link
            href="/auth/register"
            className={`block w-full rounded-none py-3 text-center text-sm font-medium transition-opacity hover:opacity-90 ${
              plan.featured
                ? "bg-brand text-brand-foreground"
                : "border border-border hover:border-brand hover:text-brand"
            }`}
          >
            Choose {plan.name.split(" /")[0]}
          </Link>
        </article>
      ))}
    </div>
  );
}
