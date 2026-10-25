import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/utils";
import { TEMPLATES_DATA, TemplateToolItem } from "../data/templates.data";
import {
  ContentWritingGraphic,
  BusinessToolsGraphic,
} from "./template-card-graphics";

function renderGraphic(type: TemplateToolItem["graphicType"]) {
  switch (type) {
    case "writing":
      return <ContentWritingGraphic />;
    case "business":
      return <BusinessToolsGraphic />;
    default:
      return null;
  }
}

export function TemplatesCatalog() {
  const t = useTranslations("TemplatesCatalog");

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-4 sm:py-6 sm:px-6">
      {/* Hero Section */}
      <div className="my-8 sm:my-12 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
          {t("titlePrefix")}{" "}
          <span className="text-[#ea5b39] drop-shadow-sm">{t("titleHighlight")}</span>
        </h1>
        <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
          {t("subtitle")}
        </p>
      </div>

      {/* Grid of Cards: Side-by-side matching screenshot */}
      <div className="flex items-center sm:items-stretch justify-center flex-col sm:flex-row gap-6 max-w-4xl mx-auto w-full">
        {/* Card 1: Content Writing */}
        <TemplateCard item={TEMPLATES_DATA[0]} />

        {/* Card 2: Business Tools */}
        <TemplateCard item={TEMPLATES_DATA[1]} />
      </div>
    </div>
  );
}

function TemplateCard({ item }: { item: TemplateToolItem }) {
  const t = useTranslations("TemplatesCatalog");

  return (
    <Link
      href={item.href}
      className={cn(
        "group relative flex-1 max-w-105 w-full flex flex-col justify-between overflow-hidden rounded-xl",
        "bg-card border border-white/5 transition-all duration-300",
        "hover:bg-card/60 hover:border-[#ea5b39]/40 hover:-translate-y-1.5",
        "hover:shadow-2xl hover:shadow-[#ea5b39]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ea5b39]",
      )}
    >
      {/* Top Graphic Illustration - flush with top and side edges */}
      <div className="w-full overflow-hidden rounded-t-xl">
        {renderGraphic(item.graphicType)}
      </div>

      {/* Bottom Content Area */}
      <div className="flex flex-col text-start px-6 pt-5 pb-7">
        <h3 className="text-lg sm:text-xl font-bold text-white transition-colors duration-200 group-hover:text-[#ea5b39]">
          {t(`cards.${item.graphicType}.title`)}
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-[#8e919a] leading-relaxed font-normal">
          {t(`cards.${item.graphicType}.description`)}
        </p>
      </div>
    </Link>
  );
}
