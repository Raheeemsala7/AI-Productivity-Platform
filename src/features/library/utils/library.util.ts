export type LibraryFileType = "image" | "pdf" | "other";

const IMAGE_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "gif", "svg", "bmp", "avif"]);
const PDF_EXTENSIONS = new Set(["pdf"]);

/**
 * Extracts and cleans a file path from a string which may be:
 * - A full URL with ?path=...
 * - An encoded relative path (e.g. ai-uploads%2Ffile.pdf)
 * - A clean relative path (e.g. ai-uploads/file.pdf)
 */
export function extractFilePath(input: string): string {
    if (!input) return "";
    let clean = input.trim();

    if (clean.includes("path=")) {
        try {
            const url = new URL(clean, "http://dummy.local");
            clean = url.searchParams.get("path") || clean;
        } catch {
            const match = clean.match(/[?&]path=([^&]+)/);
            if (match) clean = match[1];
        }
    }

    try {
        if (clean.includes("%")) {
            clean = decodeURIComponent(clean);
        }
    } catch {
        // keep as is if decoding fails
    }

    return clean;
}

/**
 * Gets the lowercase file extension without dot.
 */
export function getFileExtension(filename: string): string {
    if (!filename) return "";
    const clean = filename.split("?")[0].split("#")[0];
    const parts = clean.split(".");
    if (parts.length <= 1) return "";
    return parts.pop()?.toLowerCase() || "";
}

/**
 * Checks if a file is an image based on its extension.
 */
export function isImageFile(filename: string): boolean {
    const ext = getFileExtension(filename);
    return IMAGE_EXTENSIONS.has(ext);
}

/**
 * Checks if a file is a PDF based on its extension.
 */
export function isPdfFile(filename: string): boolean {
    const ext = getFileExtension(filename);
    return PDF_EXTENSIONS.has(ext);
}

/**
 * Returns true if the file is an image or PDF.
 */
export function isSupportedLibraryFile(filename: string): boolean {
    return isImageFile(filename) || isPdfFile(filename);
}

/**
 * Returns the categorized file type.
 */
export function getFileType(filename: string): LibraryFileType {
    if (isImageFile(filename)) return "image";
    if (isPdfFile(filename)) return "pdf";
    return "other";
}

/**
 * Builds the authenticated client-accessible URL to view/stream the file through our Next.js Route Handler.
 */
export function getFileViewUrl(pathOrUrl: string, options?: { download?: boolean }): string {
    const cleanPath = extractFilePath(pathOrUrl);
    const query = new URLSearchParams({ path: cleanPath });
    if (options?.download) {
        query.set("download", "1");
    }
    return `/api/user/files/view?${query.toString()}`;
}
