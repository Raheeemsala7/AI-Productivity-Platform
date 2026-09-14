import { File, FileSpreadsheet, FileText } from "lucide-react";
import { createElement } from "react";
import type { ReactElement } from "react";

export type FileKind = "image" | "document";

/**
 * Supported attachment extensions → accepted MIME types.
 *
 * This is the single source of truth shared by the client (UX validation)
 * and the Server Action (real validation). The remote backend must still
 * re-validate files independently before persisting them.
 *
 * SVG / HTML are intentionally excluded for XSS safety.
 * */
export const SUPPORTED_ATTACHMENT_TYPES: Record<string, string[]> = {
  png: ["image/png"],
  jpg: ["image/jpeg"],
  jpeg: ["image/jpeg"],
  gif: ["image/gif"],
  webp: ["image/webp"],
  bmp: ["image/bmp"],
  pdf: ["application/pdf"],
  doc: ["application/msword"],
  docx: [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  xls: ["application/vnd.ms-excel"],
  xlsx: [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],
  csv: ["text/csv", "application/csv", "text/plain"],
  ppt: ["application/vnd.ms-powerpoint"],
  pptx: [
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ],
  txt: ["text/plain"],
  md: ["text/markdown", "text/plain"],
  rtf: ["application/rtf", "text/rtf"],
  json: ["application/json"],
  log: ["text/plain"],
};

export const SUPPORTED_ATTACHMENT_EXTENSIONS = Object.keys(
  SUPPORTED_ATTACHMENT_TYPES,
);

const IMAGE_EXTENSIONS = new Set(["png", "jpg", "jpeg", "gif", "webp", "bmp"]);

export const MAX_ATTACHMENTS = 4;
export const MAX_ATTACHMENT_SIZE = 4 * 1024 * 1024; // 4MB per file
export const MAX_TOTAL_ATTACHMENT_SIZE = 12 * 1024 * 1024; // 12MB combined

export const getFileExtension = (name: string) => {
  const clean = name.trim().replace(/^.*[\\/]/, "");
  const dot = clean.lastIndexOf(".");
  return dot > 0 ? clean.slice(dot + 1).toLowerCase() : "";
};

export const getFileKind = (name: string): FileKind =>
  IMAGE_EXTENSIONS.has(getFileExtension(name)) ? "image" : "document";

/** Validates extension + declared MIME against the allowlist. */
export const isSupportedFile = (name: string, mime: string) => {
  const allowed = SUPPORTED_ATTACHMENT_TYPES[getFileExtension(name)];
  if (!allowed) return false;
  if (!mime || mime === "application/octet-stream") return true;
  return allowed.includes(mime.toLowerCase());
};

/** Voice messages accept any audio/* MIME regardless of extension. */
export const isSupportedAudio = (file: { name: string; type: string }) =>
  !file.type || file.type.startsWith("audio/");

export const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const formatDuration = (seconds: number) => {
  const safe = Math.max(0, Math.floor(seconds || 0));
  const m = Math.floor(safe / 60);
  const r = safe % 60;
  return `${m}:${String(r).padStart(2, "0")}`;
};

/** Returns a ready-to-render lucide icon for the given document extension. */
export const getDocumentIcon = (
  name: string,
  size = 16,
): ReactElement => {
  const ext = getFileExtension(name);
  if (["doc", "docx", "rtf"].includes(ext)) {
    return createElement(FileText, { size });
  }
  if (["xls", "xlsx", "csv"].includes(ext)) {
    return createElement(FileSpreadsheet, { size });
  }
  if (["txt", "md", "json", "log"].includes(ext)) {
    return createElement(FileText, { size });
  }
  return createElement(File, { size });
};

/** Short display label: "Image" for images, else the uppercase extension. */
export const getFileLabel = (name: string) => {
  if (getFileKind(name) === "image") return "Image";
  const ext = getFileExtension(name);
  return ext ? ext.toUpperCase() : "File";
};