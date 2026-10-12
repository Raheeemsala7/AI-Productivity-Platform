import { Play } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function ToolsSection() {
  const t = await getTranslations("Landing.tools");

  return (
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
            <p className="eyebrow text-brand">{t("eyebrow")}</p>
            <h2 className="section-title max-w-4xl text-paper">
              {t("title")}
              <br />
              <em>{t("titleEm")}</em>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-paper/55">
            {t("subtitle")}
          </p>
        </div>
        <CreativeTools />
      </div>
    </section>
  );
}

async function CreativeTools() {
  const t = await getTranslations("Landing.tools");

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
            <strong>
              MAKE
              <br />
              THE POINT.
            </strong>
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
          <span />
          <span />
          <span />
          <span />
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
