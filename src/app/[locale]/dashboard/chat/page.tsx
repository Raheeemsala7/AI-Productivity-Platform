
import ComponentChat from "@/features/chat/_components/main/component-chat";
import { CANNED_REPLIES } from "@/features/chat/constant/chat.constant";
import { Link } from "@/i18n/navigation";
import { ThemeToggle } from "@/shared/components/theme-toggle";
import { SidebarTrigger } from "@/shared/components/ui/sidebar";
import { cn } from "@/shared/lib/utils";
import { ArrowLeft, RotateCcw, Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";




const iconButtonClass =
  "flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";


export default async function ChatPage() {
  const t = await getTranslations("Chat");

  return (
    <div className="flex h-dvh flex-col p-4 md:px-6 md:py-2">
      <div className="mx-auto flex w-full max-w-6xl flex-1 overflow-hidden rounded-2xl">

        <div className="relative flex h-full min-w-0 flex-1 flex-col">
          <header className="flex shrink-0 items-center justify-between border-b border-border bg-card/80 px-4 py-3 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="group-data-[state=collapsed] block md:hidden" />


              <Link href="/dashboard" aria-label="Go back" className={iconButtonClass}>
                <ArrowLeft size={16} />
              </Link>

              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[image:var(--gradient-primary)] text-white shadow-sm">
                  <Sparkles size={14} />
                </div>

                <div className="leading-tight">
                  <p className="font-display text-[15px] font-medium text-foreground">
                    ORICO AI
                  </p>
                  <p className="text-[10.5px] uppercase tracking-widest text-muted-foreground">
                    {t("subtitle")}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                // onClick={onClear}
                // disabled={!hasMessages}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40",
                )}
              >
                <RotateCcw size={13} />
                {t("newConversation")}
              </button>

              <ThemeToggle />
            </div>
          </header>

          <ComponentChat />
        </div>
      </div>
    </div>
  );
}
