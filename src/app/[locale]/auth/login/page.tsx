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
        <h3 className="font-display text-4xl font-semibold tracking-normal text-foreground sm:text-5xl">
          {t("signInTitle")}
        </h3>
        <p className="mt-2 mb-4 text-sm leading-relaxed text-muted-foreground ">
          {t("signInSubtitle")}
        </p>

        <div>
          <LoginForm />
        </div>


      </div>
    </AuthShell>
  );
}
