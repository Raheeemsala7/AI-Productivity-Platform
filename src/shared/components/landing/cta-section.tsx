import { Link } from "@/i18n/navigation";
import { ArrowLink } from "@/shared/components/brand";
import { getTranslations } from "next-intl/server";

export async function CtaSection() {
  const t = await getTranslations("Landing.cta");

  return (
    <section className="bg-ink px-5 py-28 text-paper md:px-10 md:py-40">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-12 md:flex-row md:items-end">
        <h2
          className="font-display text-[clamp(3.6rem,9vw,9rem)] font-semibold leading-[.86] tracking-normal"
          data-reveal
        >
          {t("title")}
          <br />
          <span className="font-serif font-normal italic text-brand">
            {t("titleEm")}
          </span>
        </h2>
        <Link
          href="/auth/register"
          className="group inline-flex shrink-0 items-center gap-2 rounded-lg bg-brand px-8 py-4 text-base font-medium text-brand-foreground shadow-sm transition-opacity hover:opacity-90"
        >
          <ArrowLink>{t("button")}</ArrowLink>
        </Link>
      </div>
    </section>
  );
}
