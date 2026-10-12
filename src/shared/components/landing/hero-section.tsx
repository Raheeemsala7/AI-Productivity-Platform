import { Link } from "@/i18n/navigation";
import { ArrowLink } from "@/shared/components/brand";
import { ArrowRight, Mic2, Play } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function HeroSection() {
  const t = await getTranslations("Landing.hero");
  const tDesk = await getTranslations("Landing.desk");

  return (
    <section className="hero-grid mx-auto min-h-[min(900px,100svh)] max-w-[1500px] px-5 pb-16 pt-28 md:px-10 md:pt-36">
      <div className="hero-copy" data-reveal>
        <p className="eyebrow">{t("eyebrow")}</p>
        <h1 className="hero-title">
          {t("title1")}
          <br />
          {t("title2")} <em>{t("titleEm")}</em>
          <br />
          {t("title3")}
        </h1>
        <p className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
          {t("subtitle")}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/auth/register"
            className="group inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-medium text-brand-foreground shadow-sm transition-opacity hover:opacity-90"
          >
            <ArrowLink>{t("ctaPrimary")}</ArrowLink>
          </Link>
          <a
            href="#workspace"
            className="inline-flex items-center gap-2 rounded-lg border border-border-strong bg-transparent px-6 py-3 text-sm font-medium transition-colors hover:border-brand/40 hover:bg-muted"
          >
            {t("ctaSecondary")} <ArrowRight className="size-4" />
          </a>
        </div>
        <p className="mt-6 whitespace-pre-line text-xs uppercase leading-relaxed tracking-[0.16em] text-muted-foreground">
          {t("tagline")}
        </p>
      </div>

      {/* Creative Desk */}
      <div
        className="creative-desk"
        data-reveal
        aria-label={tDesk("deskAriaLabel")}
      >
        <div className="desk-label">{tDesk("label")}</div>
        <div className="desk-image">
          <div className="sun-disc" />
          <span>{tDesk("imageTag")}</span>
          <strong>{tDesk("imageTitle")}</strong>
        </div>
        <div className="desk-doc">
          <span>{tDesk("draftTag")}</span>
          <h3>{tDesk("draftTitle")}</h3>
          <p>{tDesk("draftCopy")}</p>
          <div />
          <div />
        </div>
        <div className="desk-slide">
          <span>{tDesk("slideTag")}</span>
          <strong>{tDesk("slideTitle")}</strong>
          <i>{tDesk("slideDate")}</i>
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
          <span>{tDesk("filmLabel")}</span>
        </div>
      </div>
    </section>
  );
}
