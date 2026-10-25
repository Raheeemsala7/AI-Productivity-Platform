"use client";

import React, { useState, useRef, useMemo } from "react";
import { useTranslations } from "next-intl";
import {
  Bold,
  Italic,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Eye,
  PenLine,
  Save,
  RotateCcw,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import Markdown from "@/shared/components/ui/markdown";
import { Textarea } from "@/shared/components/ui/textarea";
import { cn } from "@/shared/lib/utils";
import { getTextDirection } from "@/shared/lib/text-direction";
import { GeneratedResultItem } from "../types/template";

interface TemplateResultEditModalProps {
  result: GeneratedResultItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, updatedContent: string) => void;
}

function TemplateResultEditDialogContent({
  result,
  onClose,
  onSave,
}: {
  result: GeneratedResultItem;
  onClose: () => void;
  onSave: (id: string, updatedContent: string) => void;
}) {
  const t = useTranslations("TemplateDetails");

  const [draft, setDraft] = useState(result.content);
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const direction = useMemo(() => getTextDirection(draft), [draft]);

  // Insert markdown formatting around current selection
  const insertFormat = (before: string, after: string = "", defaultText: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = draft.substring(start, end) || defaultText;

    const newContent =
      draft.substring(0, start) + before + selectedText + after + draft.substring(end);
    setDraft(newContent);

    setTimeout(() => {
      textarea.focus();
      const newCursor = start + before.length + selectedText.length;
      textarea.setSelectionRange(start + before.length, newCursor);
    }, 0);
  };

  // Insert prefix at current line start
  const insertLinePrefix = (prefix: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const lastNewline = draft.lastIndexOf("\n", start - 1);
    const lineStart = lastNewline === -1 ? 0 : lastNewline + 1;

    const newContent =
      draft.substring(0, lineStart) + prefix + draft.substring(lineStart);
    setDraft(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  const handleSave = () => {
    onSave(result.id, draft);
    onClose();
  };

  const handleResetToOriginal = () => {
    setDraft(result.content);
  };

  return (
    <DialogContent className="sm:max-w-3xl max-h-[92vh] flex flex-col p-6 rounded-3xl overflow-hidden bg-background border border-border shadow-2xl">
      <DialogHeader className="border-b border-border/40 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <DialogTitle className="text-lg font-bold text-foreground">
              {t("editModalTitle")}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground mt-1">
              {t("editModalDesc")}
            </DialogDescription>
          </div>

          {/* Write / Preview Tabs */}
          <div className="flex items-center rounded-xl bg-muted/60 p-1 border border-border/40 me-8">
            <button
              type="button"
              onClick={() => setActiveTab("write")}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold transition-all cursor-pointer",
                activeTab === "write"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <PenLine className="size-3.5" />
              <span>{t("tabWrite")}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold transition-all cursor-pointer",
                activeTab === "preview"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Eye className="size-3.5" />
              <span>{t("tabPreview")}</span>
            </button>
          </div>
        </div>

        {/* Formatting Toolbar (shown in write mode) */}
        {activeTab === "write" && (
          <div className="flex flex-wrap items-center gap-1 pt-3">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => insertFormat("**", "**", "text")}
              title={t("toolbarBold")}
              aria-label={t("toolbarBold")}
              className="size-8 p-0 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
            >
              <Bold className="size-3.5" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => insertFormat("*", "*", "text")}
              title={t("toolbarItalic")}
              aria-label={t("toolbarItalic")}
              className="size-8 p-0 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
            >
              <Italic className="size-3.5" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => insertLinePrefix("### ")}
              title={t("toolbarHeading")}
              aria-label={t("toolbarHeading")}
              className="size-8 p-0 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
            >
              <Heading3 className="size-3.5" />
            </Button>

            <div className="h-4 w-px bg-border/60 mx-1" />

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => insertLinePrefix("- ")}
              title={t("toolbarBulletList")}
              aria-label={t("toolbarBulletList")}
              className="size-8 p-0 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
            >
              <List className="size-3.5" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => insertLinePrefix("1. ")}
              title={t("toolbarNumberList")}
              aria-label={t("toolbarNumberList")}
              className="size-8 p-0 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
            >
              <ListOrdered className="size-3.5" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => insertLinePrefix("> ")}
              title={t("toolbarQuote")}
              aria-label={t("toolbarQuote")}
              className="size-8 p-0 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
            >
              <Quote className="size-3.5" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => insertFormat("```\n", "\n```", "code")}
              title={t("toolbarCode")}
              aria-label={t("toolbarCode")}
              className="size-8 p-0 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
            >
              <Code className="size-3.5" />
            </Button>

            <div className="ms-auto">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleResetToOriginal}
                title={t("resetForm")}
                className="h-8 gap-1 rounded-lg px-2 text-xs text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="size-3.5" />
                <span className="hidden sm:inline">{t("resetForm")}</span>
              </Button>
            </div>
          </div>
        )}
      </DialogHeader>

      {/* Modal Editor / Preview Body */}
      <div className="flex-1 overflow-y-auto py-3 min-h-[320px] max-h-[55vh]">
        {activeTab === "write" ? (
          <Textarea
            ref={textareaRef}
            dir={direction}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            autoResize={false}
            className="w-full h-full min-h-[320px] p-4 text-sm sm:text-base leading-relaxed bg-muted/20 border-border/60 rounded-2xl resize-y font-normal"
            placeholder={t("placeholders.textarea")}
          />
        ) : (
          <div
            dir={direction}
            className="w-full h-full min-h-[320px] p-5 rounded-2xl bg-muted/20 border border-border/60 overflow-y-auto"
          >
            <Markdown content={draft || "*No content*"} />
          </div>
        )}
      </div>

      {/* Modal Actions */}
      <DialogFooter className="border-t border-border/40 pt-4 gap-2 flex items-center justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="rounded-full px-5 cursor-pointer text-xs sm:text-sm"
        >
          {t("cancel")}
        </Button>

        <Button
          type="button"
          onClick={handleSave}
          className="gap-2 bg-brand text-brand-foreground hover:bg-brand/90 rounded-full px-6 cursor-pointer font-semibold shadow-md shadow-brand/20 text-xs sm:text-sm"
        >
          <Save className="size-4" />
          <span>{t("saveChanges")}</span>
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

export function TemplateResultEditModal({
  result,
  isOpen,
  onClose,
  onSave,
}: TemplateResultEditModalProps) {
  if (!result || !isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <TemplateResultEditDialogContent
        key={result.id}
        result={result}
        onClose={onClose}
        onSave={onSave}
      />
    </Dialog>
  );
}
