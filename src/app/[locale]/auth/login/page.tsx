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
          {t("login.statement")}
          <br />
          <span className="font-serif font-normal italic text-brand">
            {t("login.statementAccent")}
          </span>
        </>
      }
      note={t("login.note")}
    >
      <div className="w-full">
        <div className="mb-10 lg:hidden">
          <p className="font-serif text-2xl italic text-brand">
            {t("login.mobileLead")}
          </p>
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
          {t("welcomeBack")}
        </p>
        <h1 className="font-display text-4xl font-semibold tracking-normal text-foreground sm:text-5xl">
          {t("signInTitle")}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {t("signInSubtitle")}
        </p>

        <div className="mt-9">
          <LoginForm />
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          {t("newToOrico")}{" "}
          <Link
            href="/auth/register"
            className="font-medium text-foreground transition-colors hover:text-brand"
          >
            {t("createAccount")}
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
