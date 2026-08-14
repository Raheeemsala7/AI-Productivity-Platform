import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "ORICO AI Assistant — Business Planning Chat",
  description:
    "Chat with ORICO AI to shape your business idea, market strategy, financials and investor materials.",
  openGraph: {
    title: "ORICO AI Assistant",
    description: "A business-focused AI assistant for founders and teams.",
  },
};

export default function ChatLayout({ children }: { children: ReactNode }) {
  return children;
}
