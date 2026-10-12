import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function RhythmSection() {
  const t = await getTranslations("Landing.rhythm");

  const rhythmSteps = [
    ["01", t("step1")],
    ["02", t("step2")],
    ["03", t("step3")],
  ] as const;

  return (
    <section className="bg-background px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <p className="eyebrow" data-reveal>
          {t("eyebrow")}
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
  );
}
