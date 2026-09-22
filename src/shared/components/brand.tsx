import { cn } from "@/shared/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

export function Brand({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2.5 font-display text-lg font-semibold",
        inverted ? "text-[var(--color-paper)]" : "text-foreground",
      )}
    >
      {/* 2×2 grid logo */}
      <span
        className="grid size-7 grid-cols-2 gap-0.5 border border-current p-1"
        aria-hidden="true"
      >
        <span className="bg-current" />
        <span className="border border-current" />
        <span className="border border-current" />
        <span className="bg-brand" />
      </span>
      <span>ORICO</span>
    </Link>
  );
}

export function ArrowLink({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      {children}
      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </span>
  );
}
