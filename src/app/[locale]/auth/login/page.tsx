import { AuthShell } from "@/features/auth/_components/auth-shell";
import LoginForm from "@/features/auth/_components/login-form";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function LoginPage() {
  const t = await getTranslations("Auth");

  return (
    <AuthShell
      eyebrow={t("welcomeBack")}
      statement={
        <>
          Create without
          <br />
          <span className="font-serif font-normal italic text-brand">
            starting over.
          </span>
        </>
      }
      note="Your workspace for writing, designing, presenting and generating — right where you left off."
    >
      <div className="w-full">
        {/* Mobile italic lead */}
        <div className="mb-10 lg:hidden">
          <p className="font-serif text-2xl italic text-brand">
            Create without limits.
          </p>
        </div>

        {/* Form header */}
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
          {t("welcomeBack")}
        </p>
        <h1 className="font-display text-4xl font-semibold tracking-normal text-foreground sm:text-5xl">
          {t("signInTitle")}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {t("signInSubtitle")}
        </p>

        {/* Form body — existing logic preserved */}
        <div className="mt-9">
          <LoginForm />
        </div>
      </div>
    </AuthShell>
  );
}
