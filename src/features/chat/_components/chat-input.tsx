"use client";

import { cn } from "@/shared/lib/utils";
import { ArrowUp, Paperclip, Square } from "lucide-react";
import { useTranslations } from "next-intl";
import { type KeyboardEvent, type RefObject } from "react";
import { sendMessageMutation } from "../hooks/use-chat-history";
import { useChatStore } from "../store/chat.store";
import { useForm } from "react-hook-form";
import { ChatInputForm } from "../types/chat";
import { zodResolver } from "@hookform/resolvers/zod";
import { chatInputSchema } from "../schema/chat.schema";

type ChatInputProps = {
  textareaRef: RefObject<HTMLTextAreaElement | null>;
};


export default function ChatInput({
  textareaRef,
}: ChatInputProps) {
  const t = useTranslations("Chat");


  const conversationId = useChatStore(
    (state) => state.conversationId,
  );

  const addMessage = useChatStore(
    (state) => state.addMessage,
  );
  const updateMessage = useChatStore(
    (state) => state.updateMessage,
  );
  const { mutateAsync, isPending } = sendMessageMutation();

  const form =
    useForm<ChatInputForm>({
      resolver: zodResolver(chatInputSchema),
      defaultValues: {
        message: "",
      },
    });




  const onSubmit = async (data: ChatInputForm) => {
    const value = data.message?.trim();
    if (!value || isPending) return;

    // Add the user's message immediately to the chat UI.
    addMessage({
      id: crypto.randomUUID(),
      role: "user",
      text: value,
      thinking: false,
    });

    form.reset();


    // Create a temporary message that represents the assistant's thinking state.
    const thinkingMessageId = crypto.randomUUID();

    addMessage({
      id: thinkingMessageId,
      role: "assistant",
      text: "",
      thinking: true,
    });

    try {
      const result = await mutateAsync({
        message: value,
        conversation_id: conversationId,
      });

      updateMessage(thinkingMessageId, {
        thinking: false,
        text: result.response,
      })
    } catch (error) {
      console.error("SEND MESSAGE ERROR:", error);
    }
  };






  return (
    <div className="shrink-0 border-t border-border bg-background px-4 py-3 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-2xl">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(
            "flex items-end gap-2 rounded-2xl border border-border bg-muted/50 px-3 py-2 transition-colors",
            "focus-within:border-brand/50 focus-within:ring-1 focus-within:ring-brand/20",
          )}
        >
          <button
            type="button"
            aria-label={t("attachFile")}
            className="mb-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Paperclip size={15} />
          </button>

          <textarea
            rows={1}
            placeholder={t("inputPlaceholder")}
            disabled={isPending}
            className="field-sizing-content max-h-32 min-h-7 flex-1 resize-none bg-transparent py-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                form.handleSubmit(onSubmit)();
              }
            }}
            {...form.register("message")}
          />

          <button
            type="submit"
            disabled={isPending}
            aria-label={isPending ? t("stop") : t("send")}
            className={cn(
              "mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all",
              "bg-[image:var(--gradient-primary)] text-white shadow-sm",
              "hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30",
            )}
          >
            {isPending ? (
              <Square size={13} fill="currentColor" />
            ) : (
              <ArrowUp size={16} />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
