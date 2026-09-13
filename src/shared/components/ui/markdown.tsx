"use client";

import {
  isValidElement,
  useCallback,
  useState,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { getTextDirection } from "@/shared/lib/text-direction";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

type MarkdownProps = {
  content: string;
  className?: string;
};

type CodeCardProps = ComponentProps<"pre">;

const LANGUAGE_DISPLAY: Record<string, string> = {
  tsx: "TSX",
  jsx: "JSX",
  js: "JS",
  ts: "TS",
  py: "Python",
  rb: "Ruby",
  sh: "Bash",
  shell: "Bash",
  yml: "YAML",
  md: "Markdown",
  markdown: "Markdown",
  html: "HTML",
  css: "CSS",
  json: "JSON",
  php: "PHP",
  sql: "SQL",
  xml: "XML",
  cpp: "C++",
  cs: "C#",
  csharp: "C#",
  objectivec: "Objective-C",
};

function formatLanguage(language: string) {
  const lower = language.toLowerCase();
  return LANGUAGE_DISPLAY[lower] ?? (language.charAt(0).toUpperCase() + language.slice(1));
}

function flattenText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(flattenText).join("");
  if (isValidElement(node)) {
    return flattenText((node.props as { children?: ReactNode }).children);
  }
  return "";
}

function CodeCard({ children, className }: CodeCardProps) {
  const codeElement = children as ReactElement<{
    className?: string;
    children?: ReactNode;
  }>;

  const props = codeElement?.props;
  const match = /language-(\w+)/.exec(props?.className ?? "");
  const language = match ? formatLanguage(match[1]) : "Code";
  const rawText = flattenText(props?.children).replace(/\n$/, "");

  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    if (!rawText) return;
    try {
      await navigator.clipboard.writeText(rawText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [rawText]);

  return (
    <div className={cn("my-2 overflow-hidden rounded-lg border border-border bg-muted", className)}>
      <div className="flex items-center justify-between gap-2 border-b border-border bg-foreground/5 px-3 py-1.5">
        <span className="truncate font-medium text-[11px] uppercase tracking-wider text-muted-foreground">
          {language}
        </span>
        <button
          type="button"
          onClick={onCopy}
          title="Copy code"
          aria-label={copied ? "Copied" : "Copy code"}
          className={cn(
            "inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] text-muted-foreground transition-colors",
            "hover:bg-foreground/10 hover:text-foreground",
            copied && "text-brand",
          )}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre dir="ltr" className="m-0 overflow-x-auto p-3">{children}</pre>
    </div>
  );
}

const components: Components = {
  table: ({ node, ...props }) => (
    <div className="table-wrapper">
      <table className="markdown-table" {...props} />
    </div>
  ),
  a: ({ node, ...props }) => (
    <a
      className={cn(
        "font-medium text-brand underline underline-offset-4 hover:opacity-80",
        props.className,
      )}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  pre: ({ node, ...props }) => <CodeCard {...props} />,
};

const rehypeHighlightOptions = {
  aliases: {
    typescript: ["tsx"],
    javascript: ["jsx"],
    yaml: "yml",
    bash: ["sh", "shell"],
    python: "py",
  },
  plainText: ["text", "txt", "plain", "plaintext", "log", "console", "output"],
};

export default function Markdown({ content, className }: MarkdownProps) {
  const direction = getTextDirection(content);

  return (
    <div
      dir={direction}
      className={cn("markdown-body text-sm", className)}
      style={{ textAlign: direction === "rtl" ? "right" : "left" }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeHighlight, rehypeHighlightOptions]]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}