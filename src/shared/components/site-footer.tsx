import { getTranslations } from "next-intl/server";
import { Brand } from "./brand";

export async function SiteFooter() {
  const t = await getTranslations("SiteFooter");
  const year = new Date().getFullYear();

  const cols = [
    {
      title: t("columns.product"),
      items: [
        [t("links.aiChat"), "#product"],
        [t("links.aiEditor"), "#product"],
        [t("links.templates"), "#templates"],
        [t("links.presentations"), "#tools"],
        [t("links.image"), "#tools"],
        [t("links.audio"), "#tools"],
        [t("links.video"), "#tools"],
      ],
    },
    {
      title: t("columns.company"),
      items: [
        [t("links.about"), "#"],
        [t("links.contact"), "#"],
        [t("links.careers"), "#"],
      ],
    },
    {
      title: t("columns.resources"),
      items: [
        [t("links.documentation"), "#"],
        [t("links.helpCenter"), "#"],
        [t("links.blog"), "#"],
      ],
    },
    {
      title: t("columns.legal"),
      items: [
        [t("links.privacy"), "#"],
        [t("links.terms"), "#"],
      ],
    },
  ] as { title: string; items: [string, string][] }[];

  return (
    <footer className="bg-background px-5 pb-8 pt-20 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-14 border-b border-border pb-16 md:grid-cols-[1.5fr_repeat(4,1fr)]">
          <div>
            <Brand />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t("tagline")}
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[.16em]">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.items.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-muted-foreground transition-colors hover:text-brand"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 pt-7 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>{t("copyright", { year })}</span>
          <div className="flex gap-6">
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-brand"
            >
              {t("socialX")}
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-brand"
            >
              {t("socialLinkedIn")}
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-brand"
            >
              {t("socialInstagram")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
