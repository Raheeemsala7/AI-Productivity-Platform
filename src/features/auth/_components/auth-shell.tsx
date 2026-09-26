import { Brand } from "@/shared/components/brand";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

type AuthShellProps = {
  eyebrow: string;
  statement: ReactNode;
  note: string;
  children: ReactNode;
};

export async function AuthShell({
  eyebrow,
  statement,
  note,
  children,
}: AuthShellProps) {
  const t = await getTranslations("AuthShell");
  const year = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-background lg:grid lg:grid-cols-[minmax(0,1.08fr)_minmax(28rem,.92fr)]">
      {/* ── Left panel ── */}
      <section className="relative hidden min-h-screen overflow-hidden bg-ink p-10 text-[var(--color-paper)] lg:flex lg:flex-col lg:justify-between xl:p-16">
        <Brand inverted />

        <div className="auth-art" aria-hidden="true">
          <div className="auth-art-paper">
            <span>NEW DOCUMENT</span>
            <strong>Ideas, shaped.</strong>
            <i />
          </div>
          <div className="auth-art-image" />
          <div className="auth-art-wave">
            <i /><i /><i /><i /><i /><i />
          </div>
        </div>

        <div className="relative z-10 max-w-xl">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            {eyebrow}
          </p>
          <h1 className="font-display text-6xl font-semibold leading-[.96] tracking-normal xl:text-7xl">
            {statement}
          </h1>
          <p className="mt-7 max-w-md text-base leading-relaxed text-[var(--color-paper)]/65">
            {note}
          </p>
        </div>

        <p className="relative z-10 text-xs uppercase tracking-[0.16em] text-[var(--color-paper)]/45">
          {t("tagline")}
        </p>
      </section>

      {/* ── Right panel ── */}
      <section className="flex min-h-screen flex-col px-5 py-4 sm:px-10 lg:px-16 xl:px-24">
        <div className="flex items-center justify-between lg:hidden">
          <Brand />
          <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            {eyebrow}
          </span>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-1 items-center py-12">
          {children}
        </div>

        <div className="flex justify-between border-t border-border pt-5 text-xs text-muted-foreground">
          <span>{t("copyright", { year })}</span>
          <Link href="/" className="transition-colors hover:text-foreground">
            {t("backToHome")}
          </Link>
        </div>
      </section>
    </main>
  );
}
