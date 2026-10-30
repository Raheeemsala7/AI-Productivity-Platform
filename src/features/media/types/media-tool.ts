export type MediaCategory = "all" | "image" | "video" | "audio";

export type MediaToolId =
  | "generate-image"
  | "generate-video"
  | "text-to-speech"
  | "image-editor"
  | "audio-transcription";

export interface MediaToolItem {
  id: MediaToolId;
  slug: string;
  category: "image" | "video" | "audio";
  translationKey: "generateImage" | "generateVideo" | "textToSpeech" | "imageEditor" | "audioTranscription";
  graphicType: MediaToolId;
  href: string;
  modelName: string;
  accentColor: string;
  gradient: string;
  badgeTone: string;
  estimatedCredits: number;
}

