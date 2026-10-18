"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Mic } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { cn } from "@/shared/lib/utils";

import { sendFileMessageMutation, sendMessageMutation } from "../hooks/use-chat-history";
import { useChatStore } from "../store/chat.store";
import { chatInputSchema } from "../schema/chat.schema";
import { ChatInputForm, StagedAttachment, Message, responseSendMessage } from "../types/chat";
import {
  getFileKind,
  isSupportedFile,
  MAX_ATTACHMENTS,
  MAX_ATTACHMENT_SIZE,
} from "../constant/chat.attachment";

import AttachmentPreview from "./attachment-preview";
import ChatAttachmentDropdown from "./chat-attachment-dropdown";
import ChatSubmitButton from "./chat-submit-button";
import VoiceTranscribeBar from "./transcription/voice-transcribe-bar";
import { useVoiceTranscribe } from "../hooks/use-voice-transcribe";

export default function ChatInput() {
  const t = useTranslations("Chat");
  const router = useRouter();
  const queryClient = useQueryClient();

  // Store
  const setConversationId = useChatStore((state) => state.setConversationId);
  const setPendingNewChat = useChatStore((state) => state.setPendingNewChat);
  const pendingSuggestion = useChatStore((state) => state.pendingSuggestion);
  const setPendingSuggestion = useChatStore((state) => state.setPendingSuggestion);
  const status = useChatStore((state) => state.status);
  const isStreaming = status === "streaming";

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

  // Attachments State
  const [attachments, setAttachments] = useState<StagedAttachment[]>([]);
  const [isVoiceMode, setIsVoiceMode] = useState(false);

  // Clean object URLs
  const mediaUrlsRef = useRef<string[]>([]);
  const trackUrl = (url: string) => {
    mediaUrlsRef.current.push(url);
    return url;
  };

  useEffect(() => {
    return () => {
      mediaUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  // Voice Transcribe Hook
  const {
    isRecording,
    isTranscribing,
    seconds,
    startRecording,
    stopAndTranscribe,
    cancelRecording,
  } = useVoiceTranscribe({
    onSuccess: (transcribedText) => {
      const current = form.getValues("message")?.trim();
      const nextMessage = current ? `${current} ${transcribedText}` : transcribedText;
      form.setValue("message", nextMessage, { shouldValidate: true, shouldDirty: true });
      setIsVoiceMode(false);
      setTimeout(() => form.setFocus("message"), 50);
    },
    onCancel: () => {
      setIsVoiceMode(false);
    },
  });

  const handleStartVoice = async () => {
    if (isPendingMessage || isPendingFile || isStreaming) return;
    setIsVoiceMode(true);
    await startRecording();
  };

  const handleStopStream = useCallback(() => {
    useChatStore.getState().setStatus("idle");
    const currentId = useChatStore.getState().conversationId;
    if (currentId) {
      queryClient.setQueryData<Message[]>(
        ["conversation", currentId],
        (old = []) => old.map((m) => (m.streaming ? { ...m, streaming: false } : m)),
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

  const removeAttachment = (id: string) => {
    const target = attachments.find((a) => a.id === id);
    if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const onSubmit = useCallback(
    async (data: ChatInputForm) => {
      const value = data.message?.trim();
      const hasAttachments = attachments.length > 0;
      if (isPendingFile || isPendingMessage || isStreaming || isVoiceMode) return;
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
      isVoiceMode,
      mutateMessageAsync,
      mutateFileAsync,
      router,
      setConversationId,
      setPendingNewChat,
      t,
      queryClient,
    ],
  );

  // Suggestions handler
  useEffect(() => {
    if (!pendingSuggestion) return;
    const { text, autoSend } = pendingSuggestion;
    setPendingSuggestion(null);
    setConversationId(null);

    form.setValue("message", text, { shouldValidate: true, shouldDirty: true });

    if (autoSend) {
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
            {/* Staged attachments preview */}
            {hasAttachments && !isVoiceMode ? (
              <AttachmentPreview
                attachments={attachments}
                uploading={isBusy}
                onRemoveAttachment={removeAttachment}
              />
            ) : null}

            {/* If in voice mode: show VoiceTranscribeBar in place of typing inputs */}
            {isVoiceMode ? (
              <VoiceTranscribeBar
                isRecording={isRecording}
                isTranscribing={isTranscribing}
                seconds={seconds}
                onStop={stopAndTranscribe}
                onCancel={cancelRecording}
              />
            ) : (
              <div className="flex items-end gap-1.5">
                {/* File Attachment Dropdown */}
                <ChatAttachmentDropdown
                  onFilesSelected={addFiles}
                  disabled={isBusy}
                />

                {/* Textarea Input */}
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

                {/* Mic Transcribe Trigger Button */}
                <button
                  type="button"
                  aria-label={t("recordVoice")}
                  disabled={isBusy}
                  onClick={handleStartVoice}
                  title="تحويل الصوت إلى نص"
                  className="mb-1 flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40 md:size-7"
                >
                  <Mic size={16} />
                </button>

                {/* Submit / Stop streaming Button */}
                <ChatSubmitButton
                  isBusy={isBusy}
                  isStreaming={isStreaming}
                  canSend={canSend}
                  onStop={handleStopStream}
                />
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}