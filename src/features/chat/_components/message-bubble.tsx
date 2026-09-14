import { cn } from "@/shared/lib/utils";
import { getTextDirection } from "@/shared/lib/text-direction";
import Markdown from "@/shared/components/ui/markdown";
import type { MessageRole, MessageAttachment, MessageAudio } from "../types/chat";
import { formatFileSize, getDocumentIcon, getFileLabel } from "../constant/chat.attachment";
import Shimmer from "./shimmer";
import ThinkingDots from "./thinking-dots";
import VoiceMessagePlayer from "./voice-message-player";

type MessageBubbleProps = {
  role: MessageRole;
  text: string;
  isThinking?: boolean;
  attachments?: MessageAttachment[];
  audio?: MessageAudio | null;
};

export default function MessageBubble({
  role,
  text = "",
  isThinking = false,
  attachments,
  audio,
}: MessageBubbleProps) {
  const isUser = role === "user";
  const direction = getTextDirection(text);

  

  return (
    <div className={cn( isUser && "flex gap-3 flex-row ltr:flex-row-reverse")}>
      {/* <Avatar role={role} /> */}

      <div
        className={cn(
          "flex max-w-[99%] min-w-0 flex-col gap-1",
          isUser ? "items-end" : "items-start",
        )}
      >
        {isUser && attachments && attachments.length > 0 ? (
          <div className="flex w-full max-w-xs flex-wrap justify-end gap-1.5 sm:max-w-sm">
            {attachments.map((attachment) =>
              attachment.kind === "image" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={attachment.id}
                  src={attachment.url}
                  alt={attachment.name}
                  title={attachment.name}
                  loading="lazy"
                  className="h-16 w-16 rounded-xl object-cover ring-1 ring-black/5 dark:ring-white/10 sm:h-20 sm:w-20"
                />
              ) : (
                <div
                  key={attachment.id}
                  className="flex items-center gap-2 rounded-xl bg-background/80 p-2 ring-1 ring-border"
                >
                  <DocumentIcon name={attachment.name} />
                  <div className="min-w-0">
                    <p className="max-w-32 truncate text-xs font-medium">
                      {attachment.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {getFileLabel(attachment.name)} ·{" "}
                      {formatFileSize(attachment.size)}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        ) : null}

        {isUser && audio?.url ? (
          <VoiceMessagePlayer
            url={audio.url}
            duration={audio.duration}
            type={audio.type}
          />
        ) : null}

        {!isUser || text.trim().length > 0 ? (
          <div
            dir={direction}
            className={cn(
              "max-w-full w-full rounded-2xl px-4 py-2.5 text-sm leading-relaxed ",
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
              <p className="m-0 whitespace-pre-wrap [word-wrap:break-word] [overflow-wrap:anywhere]">
                {text.replace(/\*\*(.*?)\*\*/g, "$1")}
              </p>
            ) : (
              <Markdown content={text} />
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function DocumentIcon({ name }: { name: string }) {
  const icon = getDocumentIcon(name, 15);
  return (
    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
      {icon}
    </div>
  );
}
