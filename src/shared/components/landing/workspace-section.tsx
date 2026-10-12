import { getTranslations } from "next-intl/server";

export async function WorkspaceSection() {
  const t = await getTranslations("Landing.workspace");
  const tWs = await getTranslations("Landing.workspacePreview");

  return (
    <section
      id="workspace"
      className="border-y border-border bg-secondary px-5 py-24 md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="text-center" data-reveal>
          <p className="eyebrow">{t("eyebrow")}</p>
          <h2 className="section-title mx-auto max-w-4xl">
            {t("title")}
            <br />
            <em>{t("titleEm")}</em>
          </h2>
        </div>

        {/* Workspace Preview */}
        <div className="workspace-scene mt-16" data-reveal>
          <div className="workspace-sidebar">
            <div className="font-display font-semibold text-base text-paper">
              {tWs("brandName")}
            </div>
            <div>
              <span className="active">{tWs("navNew")}</span>
              <span>{tWs("navChat")}</span>
              <span>{tWs("navDocs")}</span>
              <span>{tWs("navPresentations")}</span>
              <span>{tWs("navMedia")}</span>
            </div>
            <small>JH&nbsp;&nbsp; Jordan Hall</small>
          </div>
          <div className="workspace-main">
            <div className="workspace-top">
              <span>{tWs("campaignTitle")}</span>
              <span>{tWs("shareLabel")}&nbsp;&nbsp; •••</span>
            </div>
            <div className="workspace-board">
              <div className="ws-doc">
                <small>{tWs("conceptLabel")}</small>
                <h4>{tWs("conceptTitle")}</h4>
                <p>{tWs("conceptBody")}</p>
              </div>
              <div className="ws-image">
                <span />
                <strong>{tWs("imageTitle")}</strong>
              </div>
              <div className="ws-chat">
                <small>{tWs("oricoLabel")}</small>
                <p>{tWs("oricoMessage")}</p>
                <button type="button">{tWs("openDirection")}</button>
              </div>
              <div className="ws-wave">
                {Array.from({ length: 18 }, (_, i) => (
                  <i key={i} style={{ height: `${8 + ((i * 11) % 30)}px` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
