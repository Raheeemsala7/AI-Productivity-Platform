import { cn } from "@/shared/lib/utils";
import { getTextDirection } from "@/shared/lib/text-direction";
import Markdown from "@/shared/components/ui/markdown";
import type { MessageRole } from "../types/chat";
import Shimmer from "./shimmer";
import ThinkingDots from "./thinking-dots";

type MessageBubbleProps = {
  role: MessageRole;
  text: string;
  isThinking?: boolean;
};

export default function MessageBubble({
  role,
  text,
  isThinking = false,
}: MessageBubbleProps) {
  const isUser = role === "user";
  const direction = getTextDirection(text);

  return (
    <div className={cn("flex gap-3", isUser && "flex-row-reverse")}>
      {/* <Avatar role={role} /> */}

<div
          className={cn(
            "flex max-w-[78%] min-w-0 flex-col gap-1",
            isUser ? "items-end" : "items-start",
          )}
        >
          {/* <span className="px-1 text-[10.5px] uppercase tracking-widest text-muted-foreground">
            {isUser ? "You" : "ORICO"}
          </span> */}

          <div
            dir={direction}
            className={cn(
              "max-w-full rounded-2xl px-4 py-2.5 text-sm leading-relaxed ",
              isUser
                ? "rounded-tr-sm bg-brand text-brand-foreground"
                : "rounded-tl-sm  text-card-foreground",
            )}
            style={{ textAlign: direction === "rtl" ? "right" : "left" }}
          >
            {isThinking ? (
              <Shimmer>
                Thinking
                <ThinkingDots />
              </Shimmer>
            ) : isUser ? (
              text.split("\n").map((line, index) => (
                <p key={index} className={line === "" ? "h-2" : "m-0"}>
                  {line.replace(/\*\*(.*?)\*\*/g, "$1")}
                </p>
              ))
            ) : (
              <Markdown content={text} />
            )}
          </div>
        </div>
    </div>
  );
}
