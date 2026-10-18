"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { transcribeAudioAction } from "../apis/transcribe.action";

const RECORDING_SECONDS_LIMIT = 180; // 3 minutes max

const pickMimeType = (): string | undefined => {
  const candidates = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4",
    "audio/ogg;codecs=opus",
    "audio/wav",
  ];
  for (const mime of candidates) {
    if (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(mime)) {
      return mime;
    }
  }
  return undefined;
};

interface UseVoiceTranscribeOptions {
  onSuccess?: (text: string) => void;
  onCancel?: () => void;
}

export function useVoiceTranscribe(options?: UseVoiceTranscribeOptions) {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const startedAtRef = useRef<number>(0);
  const isCancelledRef = useRef<boolean>(false);
  const stopAndTranscribeRef = useRef<() => Promise<string | null>>(async () => null);

  // Stop tracks and clear timer
  const cleanup = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    recorderRef.current = null;
    setSeconds(0);
  }, []);

  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  // Start recording audio
  const startRecording = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices || typeof MediaRecorder === "undefined") {
      toast.error("الميكروفون أو تسجيل الصوت غير مدعوم في هذا المتصفح");
      options?.onCancel?.();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      const mimeType = pickMimeType();
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);

      chunksRef.current = [];
      isCancelledRef.current = false;
      startedAtRef.current = Date.now();

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.onerror = () => {
        toast.error("حدث خطأ أثناء تسجيل الصوت");
        cleanup();
        setIsRecording(false);
        options?.onCancel?.();
      };

      recorder.start(250); // collect chunks every 250ms
      recorderRef.current = recorder;
      streamRef.current = stream;
      setIsRecording(true);
      setSeconds(0);

      timerRef.current = window.setInterval(() => {
        const elapsed = Math.min(
          RECORDING_SECONDS_LIMIT,
          Math.floor((Date.now() - startedAtRef.current) / 1000),
        );
        setSeconds(elapsed);

        if (elapsed >= RECORDING_SECONDS_LIMIT) {
          // Auto-stop when limit reached
          void stopAndTranscribeRef.current();
        }
      }, 500);
    } catch (err) {
      console.error("Microphone Access Error:", err);
      const name = (err as DOMException | undefined)?.name;
      if (name === "NotAllowedError" || name === "PermissionDeniedError") {
        toast.error("تم رفض الإذن للوصول إلى الميكروفون");
      } else {
        toast.error("تعذر فتح الميكروفون، يرجى التحقق من إعدادات المتصفح");
      }
      cleanup();
      setIsRecording(false);
      options?.onCancel?.();
    }
  }, [cleanup, options]);

  // Cancel recording without transcribing
  const cancelRecording = useCallback(() => {
    isCancelledRef.current = true;
    if (recorderRef.current && recorderRef.current.state !== "inactive") {
      recorderRef.current.stop();
    }
    cleanup();
    setIsRecording(false);
    setIsTranscribing(false);
    options?.onCancel?.();
  }, [cleanup, options]);

  // Stop recording and send audio to transcribe action
  const stopAndTranscribe = useCallback(async (): Promise<string | null> => {
    if (!recorderRef.current || recorderRef.current.state === "inactive" || isCancelledRef.current) {
      return null;
    }

    return new Promise((resolve) => {
      const recorder = recorderRef.current;
      if (!recorder) {
        resolve(null);
        return;
      }

      recorder.onstop = async () => {
        if (isCancelledRef.current) {
          cleanup();
          setIsRecording(false);
          setIsTranscribing(false);
          resolve(null);
          return;
        }

        const rawType = recorder.mimeType || "audio/webm";
        const audioBlob = new Blob(chunksRef.current, { type: rawType });

        cleanup();
        setIsRecording(false);

        // If audio blob is empty, abort
        if (audioBlob.size === 0) {
          toast.error("لم يتم تسجيل أي صوت");
          resolve(null);
          return;
        }

        setIsTranscribing(true);

        try {
          const extension = audioBlob.type.includes("mp4")
            ? "m4a"
            : audioBlob.type.includes("wav")
              ? "wav"
              : audioBlob.type.includes("ogg")
                ? "ogg"
                : "mp3";

          const audioFile = new File([audioBlob], `recording.${extension}`, {
            type: audioBlob.type || "audio/mpeg",
          });

          const formData = new FormData();
          formData.append("audio", audioFile);

          const result = await transcribeAudioAction(formData);

          if (!result.success) {
            throw new Error(result.message || "فشل تحويل الصوت إلى نص");
          }

          const text = result.text?.trim() || "";
          if (text) {
            options?.onSuccess?.(text);
            resolve(text);
          } else {
            toast.info("لم يتم التعرف على أي كلمات في التسجيل");
            resolve("");
          }
        } catch (error) {
          console.error("Transcription error:", error);
          toast.error(
            error instanceof Error ? error.message : "حدث خطأ أثناء تحويل الصوت إلى نص",
          );
          resolve(null);
        } finally {
          setIsTranscribing(false);
        }
      };

      recorder.stop();
    });
  }, [cleanup, options]);

  stopAndTranscribeRef.current = stopAndTranscribe;

  return {
    isRecording,
    isTranscribing,
    seconds,
    startRecording,
    stopAndTranscribe,
    cancelRecording,
  };
}
