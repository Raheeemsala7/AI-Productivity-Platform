import { Paperclip, Send } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function ProductSection() {
  const t = await getTranslations("Landing.product");

  return (
    <section
      id="product"
      className="border-y border-border bg-secondary px-5 py-24 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-[1400px]">
        <p className="eyebrow" data-reveal>
          {t("eyebrow")}
        </p>
        <h2 className="section-title max-w-5xl" data-reveal>
          {t("title", { em: "" }).replace("{em}", "")}{" "}
          <em>{t("titleEm")}</em>
        </h2>

        {/* 01 Chat */}
        <div
          className="mt-20 grid items-center gap-12 border-t border-border pt-12 lg:grid-cols-[.72fr_1.28fr]"
          data-reveal
        >
          <div>
            <span className="section-number">
              {t("module1.number")}
            </span>
            <h3 className="module-title">
              {t("module1.title")}
            </h3>
            <p className="module-copy">{t("module1.copy")}</p>
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
              {t("module2.number")}
            </span>
            <h3 className="module-title">
              {t("module2.title")}
              <br />
              <span className="font-serif font-normal italic">
                {t("module2.titleItalic")}
              </span>
            </h3>
            <p className="module-copy">{t("module2.copy")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

async function ChatPreview() {
  const t = await getTranslations("Landing.chatPreview");
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

async function EditorPreview() {
  const t = await getTranslations("Landing.editorPreview");
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
