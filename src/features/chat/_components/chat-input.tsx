"use client";

import { cn } from "@/shared/lib/utils";
import {
  ArrowUp,
  Image as ImageIcon,
  Mic,
  Paperclip,
  Plus,
  Square,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { sendFileMessageMutation, sendMessageMutation } from "../hooks/use-chat-history";
import { useChatStore } from "../store/chat.store";
import { useForm } from "react-hook-form";
import { ChatInputForm, StagedAttachment, Message, responseSendMessage } from "../types/chat";
import { zodResolver } from "@hookform/resolvers/zod";
import { chatInputSchema } from "../schema/chat.schema";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import AttachmentPreview from "./attachment-preview";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
  getFileKind,
  isSupportedFile,
  MAX_ATTACHMENTS,
  MAX_ATTACHMENT_SIZE,
  SUPPORTED_ATTACHMENT_EXTENSIONS,
} from "../constant/chat.attachment";

const IMAGE_ACCEPT = [
  "png",
  "jpg",
  "jpeg",
  "gif",
  "webp",
  "bmp",
]
  .map((ext) => `.${ext}`)
  .join(",");

const FILE_ACCEPT = SUPPORTED_ATTACHMENT_EXTENSIONS.map(
  (ext) => `.${ext}`,
).join(",");

export default function ChatInput() {
  // Translation
  const t = useTranslations("Chat");
  // Hooks
  const router = useRouter();
  const queryClient = useQueryClient();

  // Store Actions
  const setConversationId = useChatStore((state) => state.setConversationId);
  const setPendingNewChat = useChatStore((state) => state.setPendingNewChat);
  const pendingSuggestion = useChatStore((state) => state.pendingSuggestion);
  const setPendingSuggestion = useChatStore(
    (state) => state.setPendingSuggestion,
  );

  // Mutations 
  const { mutateAsync: mutateMessageAsync, isPending: isPendingMessage } = sendMessageMutation();
  const { mutateAsync: mutateFileAsync, isPending: isPendingFile } = sendFileMessageMutation();

  // Form
  const form = useForm<ChatInputForm>({
    resolver: zodResolver(chatInputSchema),
    defaultValues: {
      message: "",
    },
  });

  // State
  const [attachments, setAttachments] = useState<StagedAttachment[]>([]);

  const status = useChatStore((state) => state.status);
  const isStreaming = status === "streaming";

  // Refs
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const mediaUrlsRef = useRef<string[]>([]);

  const trackUrl = (url: string) => {
    mediaUrlsRef.current.push(url);
    return url;
  };

  useEffect(
    () => () => {
      mediaUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    },
    [],
  );

  const handleStop = useCallback(() => {
    useChatStore.getState().setStatus("idle");
    const currentId = useChatStore.getState().conversationId;
    if (currentId) {
      queryClient.setQueryData<Message[]>(
        ["conversation", currentId],
        (old = []) =>
          old.map((m) => (m.streaming ? { ...m, streaming: false } : m)),
      );
    }
  }, [queryClient]);

  const addFiles = (files: File[]) => {
    let skipped = 0;
    const accepted: File[] = [];

    for (const file of files) {
      if (!isSupportedFile(file.name, file.type || "")) {
        skipped++;
        continue;
      }
      if (file.size > MAX_ATTACHMENT_SIZE) {
        skipped++;
        continue;
      }
      const isDuplicate = attachments.some(
        (a) => a.file.name === file.name && a.file.size === file.size,
      );
      if (isDuplicate) {
        skipped++;
        continue;
      }
      accepted.push(file);
    }

    const remaining = MAX_ATTACHMENTS - attachments.length;
    const picked = accepted.slice(0, Math.max(0, remaining));

    if (picked.length + skipped < files.length) {
      toast.error(t("maxFiles", { count: MAX_ATTACHMENTS }));
    } else if (skipped > 0) {
      toast.error(t("filesSkipped", { count: skipped }));
    }

    if (picked.length === 0) return;

    setAttachments((prev) => [
      ...prev,
      ...picked.map((file) => {
        const isImage = getFileKind(file.name) === "image";
        return {
          id: crypto.randomUUID(),
          kind: isImage ? ("image" as const) : ("document" as const),
          file,
          previewUrl: isImage ? trackUrl(URL.createObjectURL(file)) : undefined,
        };
      }),
    ]);
  };

  const handleImagePick = (list: FileList | null) => {
    if (list && list.length > 0) addFiles(Array.from(list));
  };

  const handleFilePick = (list: FileList | null) => {
    if (list && list.length > 0) addFiles(Array.from(list));
  };

  const removeAttachment = (id: string) => {
    const target = attachments.find((a) => a.id === id);
    if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const onSubmit = useCallback(
    async (data: ChatInputForm) => {
      const value = data.message?.trim();
      const hasAttachments = attachments.length > 0;
      if (isPendingFile || isPendingMessage || isStreaming) return;
      if (!value && !hasAttachments) return;

      const currentConvId = useChatStore.getState().conversationId;
      const isNewChat = !currentConvId || currentConvId.startsWith("temp-");
      const activeConvId = isNewChat ? `temp-${crypto.randomUUID()}` : currentConvId;

      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: "user",
        text: value || "",
        thinking: false,
        attachments:
          attachments.length > 0
            ? attachments.map((a) => ({
                id: a.id,
                kind: a.kind,
                name: a.file.name,
                type: a.file.type,
                size: a.file.size,
                url: a.previewUrl,
              }))
            : undefined,
      };

      const thinkingMessageId = crypto.randomUUID();
      const thinkingMessage: Message = {
        id: thinkingMessageId,
        role: "assistant",
        text: "",
        thinking: true,
      };

      if (isNewChat) {
        setPendingNewChat(true);
        setConversationId(activeConvId);
      }

      queryClient.setQueryData<Message[]>(
        ["conversation", activeConvId],
        (old = []) => [...old, userMessage, thinkingMessage],
      );

      const stagedFiles = attachments.map((a) => a.file);
      form.reset();
      setAttachments([]);
      useChatStore.getState().setStatus("submitted");

      try {
        let result: responseSendMessage;
        if (stagedFiles.length > 0) {
          result = await mutateFileAsync({
            message: value,
            ...(!isNewChat && {
              conversation_id: currentConvId,
            }),
            files: stagedFiles,
          });
        } else {
          result = await mutateMessageAsync({
            message: value || "",
            ...(!isNewChat && {
              conversation_id: currentConvId,
            }),
          });
        }

        const realConvId = result.conversation_id;

        if (isNewChat) {
          queryClient.setQueryData<Message[]>(
            ["conversation", realConvId],
            [
              userMessage,
              {
                ...thinkingMessage,
                thinking: false,
                streaming: true,
                text: result.response,
              },
            ],
          );
          queryClient.removeQueries({ queryKey: ["conversation", activeConvId] });
          setConversationId(realConvId);
          setPendingNewChat(false);
          useChatStore.getState().setStatus("streaming");
          router.refresh();
        } else {
          queryClient.setQueryData<Message[]>(
            ["conversation", currentConvId],
            (old = []) =>
              old.map((msg) =>
                msg.id === thinkingMessageId
                  ? {
                      ...msg,
                      thinking: false,
                      streaming: true,
                      text: result.response,
                    }
                  : msg,
              ),
          );
          useChatStore.getState().setStatus("streaming");
        }
      } catch (error) {
        console.error("SEND MESSAGE ERROR:", error);
        toast.error(t("sendFailed"));
        setPendingNewChat(false);
        useChatStore.getState().setStatus("idle");
        if (isNewChat) {
          queryClient.removeQueries({ queryKey: ["conversation", activeConvId] });
          setConversationId(null);
        } else {
          queryClient.setQueryData<Message[]>(
            ["conversation", currentConvId],
            (old = []) => old.filter((msg) => msg.id !== thinkingMessageId),
          );
        }
      }
    },
    [
      attachments,
      form,
      isPendingFile,
      isPendingMessage,
      isStreaming,
      mutateMessageAsync,
      mutateFileAsync,
      router,
      setConversationId,
      setPendingNewChat,
      t,
      queryClient,
    ],
  );

  useEffect(() => {
    if (!pendingSuggestion) return;
    const { text, autoSend } = pendingSuggestion;
    setPendingSuggestion(null);
    setConversationId(null);

    form.setValue("message", text, { shouldValidate: true, shouldDirty: true });

    if (autoSend) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: auto-send after picking a suggestion.
      onSubmit({ message: text });
    } else {
      form.setFocus("message");
    }
  }, [pendingSuggestion, form, setPendingSuggestion, setConversationId, onSubmit]);

  const messageValue = form.watch("message");
  const hasText = Boolean(messageValue && messageValue.trim().length > 0);
  const hasAttachments = attachments.length > 0;
  const isBusy = isPendingMessage || isPendingFile || isStreaming;
  const canSend = (hasText || hasAttachments) && !isBusy;

  return (
    <div className="shrink-0 border-t border-border bg-background px-3 py-2.5 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm sm:px-4 sm:py-3">
      <div className="mx-auto w-full max-w-3xl">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(
            "rounded-2xl border border-border bg-muted/50 px-2.5 py-2 transition-colors",
            "focus-within:border-brand/50 focus-within:ring-1 focus-within:ring-brand/20",
            "sm:px-3",
          )}
        >
          <div className="flex flex-col gap-1.5">
            {hasAttachments ? (
              <AttachmentPreview
                attachments={attachments}
                uploading={isBusy}
                onRemoveAttachment={removeAttachment}
              />
            ) : null}

            <div className="flex items-end gap-1.5">
              <DropdownMenu>
                <DropdownMenuTrigger
                  aria-label={t("attachFile")}
                  className="mb-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:h-7 md:w-7"
                  render={(props) => <button type="button" {...props} />}
                >
                  <Plus size={15} />
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="start"
                  side="top"
                  sideOffset={8}
                  className="min-w-44 p-1.5"
                >
                  <DropdownMenuItem
                    onClick={() => imageInputRef.current?.click()}
                  >
                    <ImageIcon size={15} strokeWidth={1.75} />
                    {t("addImage")}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Paperclip size={15} strokeWidth={1.75} />
                    {t("addFile")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <input
                ref={imageInputRef}
                type="file"
                accept={IMAGE_ACCEPT}
                multiple
                hidden
                onChange={(e) => handleImagePick(e.target.files)}
              />
              <input
                ref={fileInputRef}
                type="file"
                accept={FILE_ACCEPT}
                multiple
                hidden
                onChange={(e) => handleFilePick(e.target.files)}
              />

              <textarea
                rows={1}
                placeholder={t("inputPlaceholder")}
                disabled={isBusy}
                className="field-sizing-content max-h-32 min-h-7 min-w-0 flex-1 resize-none bg-transparent py-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    if (canSend) {
                      form.handleSubmit(onSubmit)();
                    }
                  }
                }}
                {...form.register("message")}
              />

              <button
                type="button"
                aria-label={t("recordVoice")}
                disabled={isBusy}
                className="mb-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40 md:h-7 md:w-7"
              >
                <Mic size={16} />
              </button>

              <button
                type={isStreaming ? "button" : "submit"}
                onClick={isStreaming ? handleStop : undefined}
                disabled={!canSend && !isStreaming}
                aria-label={isBusy ? t("stop") : t("send")}
                className={cn(
                  "mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all",
                  "bg-[image:var(--gradient-primary)] text-white shadow-sm",
                  "hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30",
                  "md:h-8 md:w-8",
                )}
              >
                {isBusy ? (
                  <Square size={13} fill="currentColor" />
                ) : (
                  <ArrowUp size={16} />
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}