import { AuthShell } from "@/features/auth/_components/auth-shell";
import ResetPasswordForm from "@/features/auth/_components/reset-password-form";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

type ResetPasswordPageProps = {
  searchParams: Promise<{
    token?: string;
    email?: string;
  }>;
};

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const t = await getTranslations("ResetPassword");
  const { token, email } = await searchParams;

  return (
    <AuthShell
      eyebrow={t("accountRecovery")}
      statement={
        <>
          Create a new
          <br />
          <span className="font-serif font-normal italic text-brand">
            password.
          </span>
        </>
      }
      note="Choose something secure and memorable. You can always update it again from your settings."
    >
      <div className="w-full">
        <div className="mb-10 lg:hidden">
          <p className="font-serif text-2xl italic text-brand">
            Almost back in.
          </p>
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
          {t("accountRecovery")}
        </p>
        <h1 className="font-display text-4xl font-semibold tracking-normal text-foreground sm:text-5xl">
          {t("resetPasswordTitle")}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {t("resetPasswordSubtitle")}
        </p>

        <div className="mt-9">
          <ResetPasswordForm token={token} email={email} />
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
