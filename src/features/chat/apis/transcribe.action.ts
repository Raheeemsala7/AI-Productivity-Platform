"use server";

import { HEADERS } from "@/shared/constant/api.constant";
import { getNextAuthToken } from "@/shared/lib/utils/auth.util";

export interface TranscribeResponse {
  success: boolean;
  text?: string;
  message?: string;
}

/**
 * Server Action to securely transcribe audio via external backend endpoint:
 * POST ${process.env.API_URL}/user/transcribe
 * Body: FormData with 'audio' field
 */
export async function transcribeAudioAction(
  formData: FormData,
): Promise<TranscribeResponse> {
  try {
    const token = await getNextAuthToken();

    if (!token?.token) {
      return { success: false, message: "Unauthorized" };
    }

    const audioFile = formData.get("audio");
    if (!audioFile) {
      return { success: false, message: "No audio file provided" };
    }

    const res = await fetch(`${process.env.API_URL}/user/transcribe`, {
      method: "POST",
      headers: {
        ...HEADERS.authorize(token.token),
      },
      body: formData,
    });

    if (!res.ok) {
      const errorText = await res.text();
      let errorMsg = `Server error (${res.status})`;
      try {
        const errorJson = JSON.parse(errorText);
        errorMsg = errorJson.message || errorJson.error || errorMsg;
      } catch {
        // fallback to default error message
      }
      return { success: false, message: errorMsg };
    }

    const data = await res.json();

    // Extract text from common API payload shapes
    const transcribedText: string =
      data?.payload?.text ??
      data?.payload?.transcription ??
      (typeof data?.payload === "string" ? data.payload : null) ??
      data?.data?.text ??
      data?.data?.transcription ??
      (typeof data?.data === "string" ? data.data : null) ??
      data?.text ??
      data?.transcription ??
      "";

    return {
      success: true,
      text: transcribedText,
    };
  } catch (error) {
    console.error("Transcribe Action Error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to transcribe audio",
    };
  }
}
