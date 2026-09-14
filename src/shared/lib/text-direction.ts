const RTL_STRONG = /[\u0590-\u05FF\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB1D-\uFB4F\uFB50-\uFDFF\uFE70-\uFEFF]/;
const LTR_STRONG = /[A-Za-z\u00C0-\u024F\u0370-\u04FF]/;

export type TextDirection = "ltr" | "rtl";

export function getTextDirection(text: string = ""): TextDirection {
  if (!text) return "ltr";
  let rtlCount = 0;
  let ltrCount = 0;
  let firstStrong: TextDirection | null = null;

  for (const ch of text) {
    if (RTL_STRONG.test(ch)) {
      rtlCount++;
      firstStrong ??= "rtl";
    } else if (LTR_STRONG.test(ch)) {
      ltrCount++;
      firstStrong ??= "ltr";
    }
  }

  if (firstStrong === null) return "ltr";

  const total = rtlCount + ltrCount;
  const rtlRatio = rtlCount / total;

  if (firstStrong === "rtl") {
    return rtlRatio >= 0.3 ? "rtl" : "ltr";
  }

  return rtlRatio <= 0.5 ? "ltr" : "rtl";
}