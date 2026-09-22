import { Brand } from "@/shared/components/brand";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function VerifyEmailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations("AuthShell");
  const year = new Date().getFullYear();

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-10">
        <Brand />
        <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
          {t("emailVerification")}
        </span>
      </div>

      <div className="flex flex-1 items-center justify-center px-5 py-16">
        <div className="w-full max-w-md">{children}</div>
      </div>

      <div className="flex items-center justify-between border-t border-border px-5 py-4 text-xs text-muted-foreground sm:px-10">
        <span>{t("copyright", { year })}</span>
        <Link href="/" className="transition-colors hover:text-foreground">
          {t("backToHome")}
        </Link>
      </div>
    </main>
  );
}
