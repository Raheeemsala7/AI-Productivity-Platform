import { cn } from "@/shared/lib/utils";
import { Sparkles } from "lucide-react";
import type { MessageRole } from "../types/chat";

type AvatarProps = {
  role: MessageRole;
};

export default function Avatar({ role }: AvatarProps) {
  if (role === "assistant") {
    return (
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[image:var(--gradient-primary)] text-white shadow-sm">
        <Sparkles size={13} strokeWidth={2} />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
        "bg-muted text-[11px] font-semibold text-muted-foreground",
      )}
    >
      YM
    </div>
  );
}
