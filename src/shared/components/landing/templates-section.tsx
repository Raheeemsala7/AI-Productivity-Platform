import { ChevronRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

const TEMPLATE_KEYS = [
  { kindKey: "kindSocial" as const, titleKey: "social" as const, cls: "template-social" },
  { kindKey: "kindBusiness" as const, titleKey: "business" as const, cls: "template-business" },
  { kindKey: "kindEducation" as const, titleKey: "education" as const, cls: "template-education" },
  { kindKey: "kindMarketing" as const, titleKey: "marketing" as const, cls: "template-marketing" },
  { kindKey: "kindWriting" as const, titleKey: "writing" as const, cls: "template-writing" },
  { kindKey: "kindPresentation" as const, titleKey: "presentation" as const, cls: "template-presentation" },
];

export async function TemplatesSection() {
  const t = await getTranslations("Landing.templates");
  const tGallery = await getTranslations("Landing.templates.gallery");

  return (
    <section
      id="templates"
      className="bg-background px-5 py-24 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-8 lg:grid-cols-2" data-reveal>
          <h2 className="section-title">
            {t("title")}
            <br />
            <em>{t("titleAccent")}</em>
          </h2>
          <p className="max-w-md self-end text-base leading-relaxed text-muted-foreground lg:justify-self-end">
            {t("subtitle")}
          </p>
        </div>

        {/* Gallery */}
        <div className="template-gallery mt-16" data-reveal>
          {TEMPLATE_KEYS.map((item, index) => (
            <article className={`template ${item.cls}`} key={item.kindKey}>
              <div className="template-art">
                <span className="template-index">0{index + 1}</span>
                <strong>{tGallery(item.titleKey)}</strong>
                <i />
              </div>
              <div className="mt-4 flex items-center justify-between px-3 pb-3">
                <span className="text-xs text-muted-foreground">
                  {tGallery(item.kindKey)}
                </span>
                <ChevronRight className="size-4 text-muted-foreground rtl:rotate-180" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
