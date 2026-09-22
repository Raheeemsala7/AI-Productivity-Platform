import { AuthShell } from "@/features/auth/_components/auth-shell";
import RegisterForm from "@/features/auth/_components/register-form";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function RegisterPage() {
  const t = await getTranslations("Auth");

  return (
    <AuthShell
      eyebrow={t("createAccount")}
      statement={
        <>
          Start creating.
          <br />
          <span className="font-serif font-normal italic text-brand">
            From one workspace.
          </span>
        </>
      }
      note="Build, write and generate from a single creative workspace — business plans, presentations, images and more."
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
          ORICO account
        </p>
        <h1 className="font-display text-4xl font-semibold tracking-normal text-foreground sm:text-5xl">
          {t("signUpTitle")}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {t("signUpSubtitle")}
        </p>

        {/* Form body — existing logic preserved */}
        <div className="mt-9">
          <RegisterForm />
        </div>

        {/* Login link */}
        <p className="mt-8 text-center text-sm text-muted-foreground">
          {t("alreadyHaveAccount")}{" "}
          <Link
            href="/auth/login"
            className="font-medium text-foreground transition-colors hover:text-brand"
          >
            {t("signIn")}
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
