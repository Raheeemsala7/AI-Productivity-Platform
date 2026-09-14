"use client";

import { Square, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { formatDuration } from "../constant/chat.attachment";

const RECORDING_SECONDS_LIMIT = 300;

type VoiceRecorderProps = {
  onComplete: (file: File, duration: number) => void;
  onCancel: () => void;
};

const pickMimeType = () => {
  const candidates = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4",
    "audio/ogg;codecs=opus",
  ];
  for (const mime of candidates) {
    if (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(mime)) {
      return mime;
    }
  }
  return undefined;
};

export default function VoiceRecorder({
  onComplete,
  onCancel,
}: VoiceRecorderProps) {
  const t = useTranslations("Chat");

  const [seconds, setSeconds] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const startedAtRef = useRef(0);
  const completedRef = useRef(false);

  const cleanup = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    recorderRef.current = null;
  };

  useEffect(() => () => cleanup(), []);

  const handleStop = () => {
    const recorder = recorderRef.current;
    const type = recorder?.mimeType || "audio/webm";
    cleanup();
    if (completedRef.current) return;

    const blob = new Blob(chunksRef.current, { type });
    const ext = blob.type.includes("mp4")
      ? "m4a"
      : blob.type.includes("ogg")
        ? "ogg"
        : "webm";
    const file = new File([blob], `voice-${Date.now()}.${ext}`, {
      type: blob.type,
    });
    const duration = Math.max(
      1,
      Math.round((Date.now() - startedAtRef.current) / 1000),
    );

    setIsRecording(false);
    completedRef.current = true;
    onComplete(file, duration);
  };

  const handleCancel = () => {
    completedRef.current = true;
    if (recorderRef.current && recorderRef.current.state === "recording") {
      recorderRef.current.stop();
    }
    cleanup();
    setIsRecording(false);
    onCancel();
  };

  const start = async () => {
    const canRecord =
      typeof navigator !== "undefined" &&
      Boolean(navigator.mediaDevices) &&
      typeof MediaRecorder !== "undefined";

    if (!canRecord) {
      toast.error(t("recordingUnsupported"));
      onCancel();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = pickMimeType();
      const recorder = new MediaRecorder(
        stream,
        mimeType ? { mimeType } : undefined,
      );

      chunksRef.current = [];
      completedRef.current = false;
      startedAtRef.current = Date.now();

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = handleStop;
      recorder.onerror = () => {
        toast.error(t("recordingError"));
        cleanup();
        setIsRecording(false);
        onCancel();
      };

      recorder.start();
      recorderRef.current = recorder;
      streamRef.current = stream;
      setIsRecording(true);

      timerRef.current = window.setInterval(() => {
        const secs = Math.min(
          RECORDING_SECONDS_LIMIT,
          Math.floor((Date.now() - startedAtRef.current) / 1000),
        );
        setSeconds(secs);
        if (secs >= RECORDING_SECONDS_LIMIT) {
          if (timerRef.current) window.clearInterval(timerRef.current);
          timerRef.current = null;
          recorderRef.current?.stop();
        }
      }, 500);
    } catch (err) {
      const name = (err as DOMException | undefined)?.name;
      if (name === "NotAllowedError" || name === "PermissionDeniedError") {
        toast.error(t("micPermissionDenied"));
      } else {
        toast.error(t("micError"));
      }
      cleanup();
      onCancel();
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: kick off recording once on mount.
    void start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex items-center gap-2 rounded-xl bg-muted/70 px-2.5 py-2">
      <span className="relative flex size-2.5 shrink-0">
        {isRecording && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-70" />
        )}
        <span className="relative inline-flex size-2.5 rounded-full bg-red-500" />
      </span>

      <span className="text-xs font-medium text-foreground">
        {t("recording")}
      </span>

      <span className="tabular-nums text-sm text-muted-foreground">
        {formatDuration(seconds)}
      </span>

      <div className="ms-auto flex items-center gap-1.5">
        <button
          type="button"
          aria-label={t("stop")}
          disabled={!isRecording}
          onClick={handleStop}
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[image:var(--gradient-primary)] text-white shadow-sm transition hover:opacity-90 disabled:opacity-40"
        >
          <Square size={12} fill="currentColor" />
        </button>

        <button
          type="button"
          aria-label={t("cancelRecording")}
          onClick={handleCancel}
          className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:bg-muted hover:text-foreground"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}