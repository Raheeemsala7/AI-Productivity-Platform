import { AuthShell } from "@/features/auth/_components/auth-shell";
import ForgotPasswordForm from "@/features/auth/_components/forgot-password-form";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function ForgotPasswordPage() {
  const t = await getTranslations("ForgetPassword");

  return (
    <AuthShell
      eyebrow={t("accountRecovery")}
      statement={
        <>
          Forgot your
          <br />
          <span className="font-serif font-normal italic text-brand">
            password?
          </span>
        </>
      }
      note="Enter your email and we'll send you a secure link to get back into your workspace."
    >
      <div className="w-full">
        <div className="mb-10 lg:hidden">
          <p className="font-serif text-2xl italic text-brand">
            We&apos;ll help you back in.
          </p>
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
          {t("accountRecovery")}
        </p>
        <h1 className="font-display text-4xl font-semibold tracking-normal text-foreground sm:text-5xl">
          {t("forgotPasswordTitle")}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {t("forgotPasswordSubtitle")}
        </p>

        <div className="mt-9">
          <ForgotPasswordForm />
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          <Link
            href="/auth/login"
            className="font-medium text-foreground transition-colors hover:text-brand"
          >
            ← {t("backToSignIn")}
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
