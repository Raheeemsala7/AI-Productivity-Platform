"use client";

import {
  Loader2,
  Pause,
  Play,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  formatDuration,
  formatFileSize,
  getDocumentIcon,
  getFileLabel,
} from "../constant/chat.attachment";
import type { MessageAudio, StagedAttachment } from "../types/chat";

type AttachmentPreviewProps = {
  attachments: StagedAttachment[];
  audio?: MessageAudio | null;
  uploading: boolean;
  onRemoveAttachment: (id: string) => void;
  onRemoveAudio: () => void;
};

export default function AttachmentPreview({
  attachments,
  audio,
  uploading,
  onRemoveAttachment,
  onRemoveAudio,
}: AttachmentPreviewProps) {
  const t = useTranslations("Chat");

  return (
    <div className="custom-scrollbar flex items-center gap-2 overflow-x-auto px-0.5 pb-1">
      {attachments.map((attachment) =>
        attachment.kind === "image" ? (
          <ImagePreview
            key={attachment.id}
            name={attachment.file.name}
            previewUrl={attachment.previewUrl}
            uploading={uploading}
            removeLabel={t("removeAttachment")}
            onRemove={() => onRemoveAttachment(attachment.id)}
          />
        ) : (
          <FilePreview
            key={attachment.id}
            name={attachment.file.name}
            size={attachment.file.size}
            uploading={uploading}
            removeLabel={t("removeAttachment")}
            onRemove={() => onRemoveAttachment(attachment.id)}
          />
        ),
      )}

      {audio ? (
        <AudioPreview
          audio={audio}
          uploading={uploading}
          removeLabel={t("removeAudio")}
          onRemove={onRemoveAudio}
        />
      ) : null}
    </div>
  );
}

function RemoveButton({
  onRemove,
  label,
}: {
  onRemove: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onRemove}
      className="absolute -end-1 -top-1 z-10 flex size-5 shrink-0 items-center justify-center rounded-full bg-foreground text-background shadow-sm transition hover:bg-destructive hover:text-white"
    >
      <X size={11} />
    </button>
  );
}

function ImagePreview({
  name,
  previewUrl,
  uploading,
  removeLabel,
  onRemove,
}: {
  name: string;
  previewUrl?: string;
  uploading: boolean;
  removeLabel: string;
  onRemove: () => void;
}) {
  return (
    <div className="relative shrink-0">
      {uploading ? (
        <div className="flex size-16 items-center justify-center rounded-xl border border-border bg-muted/60">
          <Loader2 size={16} className="animate-spin text-muted-foreground" />
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={previewUrl}
          alt={name}
          title={name}
          className="size-16 rounded-xl border border-border object-cover"
        />
      )}
      <RemoveButton label={removeLabel} onRemove={onRemove} />
    </div>
  );
}

function FilePreview({
  name,
  size,
  uploading,
  removeLabel,
  onRemove,
}: {
  name: string;
  size: number;
  uploading: boolean;
  removeLabel: string;
  onRemove: () => void;
}) {
  const icon = getDocumentIcon(name);

  return (
    <div className="relative shrink-0">
      <div className="flex min-w-36 items-center gap-2 rounded-xl border border-border bg-background/90 py-2 pe-2.5 ps-2">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          {uploading ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            icon
          )}
        </div>
        <div className="min-w-0">
          <p className="max-w-28 truncate text-xs font-medium text-foreground">
            {name}
          </p>
          <p className="text-[10px] text-muted-foreground">
            {getFileLabel(name)} · {formatFileSize(size)}
          </p>
        </div>
      </div>
      <RemoveButton label={removeLabel} onRemove={onRemove} />
    </div>
  );
}

function AudioPreview({
  audio,
  uploading,
  removeLabel,
  onRemove,
}: {
  audio: MessageAudio;
  uploading: boolean;
  removeLabel: string;
  onRemove: () => void;
}) {
  const t = useTranslations("Chat");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      void el.play().catch(() => setPlaying(false));
      setPlaying(true);
    }
  };

  return (
    <div className="relative shrink-0">
      <audio
        ref={audioRef}
        src={audio.url}
        preload="metadata"
        onEnded={() => setPlaying(false)}
        data-slot="composer-audio"
      />

      <div className="flex items-center gap-1.5 rounded-xl border border-border bg-background/90 py-1.5 pe-2.5 ps-1.5">
        <button
          type="button"
          aria-label={playing ? t("pause") : t("play")}
          onClick={toggle}
          disabled={uploading}
          className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[image:var(--gradient-primary)] text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {uploading ? (
            <Loader2 size={14} className="animate-spin" />
          ) : playing ? (
            <Pause size={14} />
          ) : (
            <Play size={14} fill="currentColor" />
          )}
        </button>

        <div className="min-w-0">
          <p className="max-w-28 truncate text-xs font-medium text-foreground">
            {t("voiceMessage")}
          </p>
          <p className="text-[10px] text-muted-foreground">
            {formatDuration(audio.duration ?? 0)} ·{" "}
            {getFileLabel("voice.webm")}
          </p>
        </div>
      </div>

      <RemoveButton label={removeLabel} onRemove={onRemove} />
    </div>
  );
}