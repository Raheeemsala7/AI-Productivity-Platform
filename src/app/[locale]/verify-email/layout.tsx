import { Brand } from "@/shared/components/brand";
import { Link } from "@/i18n/navigation";

/**
 * Verify-email has a single centred state (loading/success/error/invalid),
 * so it uses a simpler centred layout rather than the 2-col AuthShell.
 */
export default function VerifyEmailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-10">
        <Brand />
        <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
          Email Verification
        </span>
      </div>

      {/* Centred content */}
      <div className="flex flex-1 items-center justify-center px-5 py-16">
        <div className="w-full max-w-md">{children}</div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-border px-5 py-4 text-xs text-muted-foreground sm:px-10">
        <span>© {new Date().getFullYear()} ORICO</span>
        <Link href="/" className="transition-colors hover:text-foreground">
          Back to home
        </Link>
      </div>
    </main>
  );
}
