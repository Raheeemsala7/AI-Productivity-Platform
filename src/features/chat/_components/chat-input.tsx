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
import { sendMessageMutation } from "../hooks/use-chat-history";
import { useChatStore } from "../store/chat.store";
import { useForm } from "react-hook-form";
import { ChatInputForm, MessageAudio, StagedAttachment } from "../types/chat";
import { zodResolver } from "@hookform/resolvers/zod";
import { chatInputSchema } from "../schema/chat.schema";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import AttachmentPreview from "./attachment-preview";
import VoiceRecorder from "./voice-recorder";
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
  const t = useTranslations("Chat");

  const router = useRouter();


  const addMessage = useChatStore((state) => state.addMessage);
  const updateMessage = useChatStore((state) => state.updateMessage);
  const setConversationId = useChatStore((state) => state.setConversationId);
  const setPendingNewChat = useChatStore((state) => state.setPendingNewChat);
  const pendingSuggestion = useChatStore((state) => state.pendingSuggestion);
  const setPendingSuggestion = useChatStore(
    (state) => state.setPendingSuggestion,
  );

  const { mutateAsync, isPending } = sendMessageMutation();

  const form = useForm<ChatInputForm>({
    resolver: zodResolver(chatInputSchema),
    defaultValues: {
      message: "",
    },
  });

  const [attachments, setAttachments] = useState<StagedAttachment[]>([]);
  const [audio, setAudio] = useState<MessageAudio | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);

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

  const handleAudioComplete = (file: File, duration: number) => {
    if (audio) URL.revokeObjectURL(audio.url);
    setAudio({ url: trackUrl(URL.createObjectURL(file)), duration, type: file.type });
    setAudioFile(file);
    setIsRecording(false);
  };

  const removeAudio = () => {
    if (audio) URL.revokeObjectURL(audio.url);
    setAudio(null);
    setAudioFile(null);
  };

  const onSubmit = useCallback(
    async (data: ChatInputForm) => {
      const value = data.message?.trim();
      const hasMedia = attachments.length > 0 || audioFile != null;
      if (isPending || isRecording) return;
      if (!value && !hasMedia) return;

      // Add the user's message immediately to the chat UI.
      addMessage({
        id: crypto.randomUUID(),
        role: "user",
        text: value,
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
        audio: audio ? { url: audio.url, duration: audio.duration } : null,
      });

      form.reset();
      setAttachments([]);
      setAudio(null);
      setAudioFile(null);

      // Create a temporary message that represents the assistant's thinking state.
      const thinkingMessageId = crypto.randomUUID();

      addMessage({
        id: thinkingMessageId,
        role: "assistant",
        text: "",
        thinking: true,
      });

      const currentConvId = useChatStore.getState().conversationId;

      try {
        if (!currentConvId) {
          setPendingNewChat(true);
        }
        const result = await mutateAsync({
          message: value,
          ...(currentConvId && {
            conversation_id: currentConvId,
          }),
          files: attachments.map((a) => a.file),
          audio: audioFile,
        });

        updateMessage(thinkingMessageId, {
          thinking: false,
          text: result.response,
        });
        if (!currentConvId) {
          // ده بيجبر Next.js يجيب أحدث داتا من الـ Server Components ويبعتها للصفحة
          router.refresh();
        }
        setConversationId(result.conversation_id);
      } catch (error) {
        console.error("SEND MESSAGE ERROR:", error);
        toast.error(t("sendFailed"));
        setPendingNewChat(false);
      }
    },
    [
      isPending,
      isRecording,
      attachments,
      audio,
      audioFile,
      addMessage,
      form,
      mutateAsync,
      updateMessage,
      router,
      setConversationId,
      setPendingNewChat,
      t,
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

  const showMedia = (attachments.length > 0 || audio != null) && !isRecording;

  return (
    <div className="shrink-0 border-t border-border bg-background px-3 py-2.5 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm sm:px-4 sm:py-3">
      <div className="mx-auto w-full max-w-2xl">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(
            "rounded-2xl border border-border bg-muted/50 px-2.5 py-2 transition-colors",
            "focus-within:border-brand/50 focus-within:ring-1 focus-within:ring-brand/20",
            "sm:px-3",
          )}
        >
          <div className="flex flex-col gap-1.5">
            {showMedia ? (
              <AttachmentPreview
                attachments={attachments}
                audio={audio}
                uploading={isPending}
                onRemoveAttachment={removeAttachment}
                onRemoveAudio={removeAudio}
              />
            ) : null}

            {isRecording ? (
              <VoiceRecorder
                onComplete={handleAudioComplete}
                onCancel={() => setIsRecording(false)}
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
                disabled={isPending}
                className="field-sizing-content max-h-32 min-h-7 min-w-0 flex-1 resize-none bg-transparent py-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    form.handleSubmit(onSubmit)();
                  }
                }}
                {...form.register("message")}
              />

              {!isRecording ? (
                <button
                  type="button"
                  aria-label={t("recordVoice")}
                  disabled={isPending}
                  onClick={() => setIsRecording(true)}
                  className={cn(
                    "mb-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40 md:h-7 md:w-7",
                    audio &&
                      "text-brand hover:bg-muted hover:text-brand",
                  )}
                >
                  <Mic size={16} />
                </button>
              ) : null}

              <button
                type="submit"
                disabled={isPending || isRecording}
                aria-label={isPending ? t("stop") : t("send")}
                className={cn(
                  "mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all",
                  "bg-[image:var(--gradient-primary)] text-white shadow-sm",
                  "hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30",
                  "md:h-8 md:w-8",
                )}
              >
                {isPending ? (
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