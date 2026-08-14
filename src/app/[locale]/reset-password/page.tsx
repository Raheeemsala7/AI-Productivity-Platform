import ResetPasswordForm from "@/features/auth/_components/reset-password-form";
import { Link } from "@/i18n/navigation";
import { Sparkles } from "lucide-react";
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
  const t = await getTranslations("Auth");
  const { token, email } = await searchParams;

  return (
    <>
      <div className="mb-8 flex flex-col items-center text-center">
        <Link href="/" className="mb-6 inline-flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)]">
            <Sparkles className="h-4 w-4 text-[color:var(--primary-foreground)]" />
          </span>
          <span className="text-lg font-semibold tracking-tight">ORICO</span>
        </Link>

        <span className="rounded-full border border-[color:var(--border-strong)] px-3 py-1 text-[11px] uppercase tracking-widest text-muted-foreground">
          {t("accountRecovery")}
        </span>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-gradient">
          {t("resetPasswordTitle")}
        </h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          {t("resetPasswordSubtitle")}
        </p>
      </div>

      <div className="glass rounded-2xl p-6 sm:p-7">
        <ResetPasswordForm token={token} email={email} />
      </div>
    </>
  );
}
