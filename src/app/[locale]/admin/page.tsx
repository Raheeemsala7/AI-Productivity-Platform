import OverviewPage from "@/features/admin/components/overview-chunks/overview-page"
import { Link } from "@/i18n/navigation"
import { buttonVariants } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"
import { LayoutDashboard } from "lucide-react"
import { getTranslations } from "next-intl/server"

export const metadata = {
  title: 'Admin Dashboard Overview',
};

export default async function AdminPage() {
  const t = await getTranslations("Sidebar");

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between border-b px-4 py-3 bg-background/50 backdrop-blur-xs">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">{t("items.dashboard")}</h1>
          <p className="text-xs text-muted-foreground">{t("groups.overview")}</p>
        </div>
        <Link
          href="/dashboard"
          className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-2")}
        >
          <LayoutDashboard className="size-4" />
          <span>{t("user.brand")} ({t("items.dashboard")})</span>
        </Link>
      </div>
      <OverviewPage />
    </div>
  );
}
