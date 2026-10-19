"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  Sparkles,
  MessageSquare,
  RotateCcw,
  SlidersHorizontal,
  FileText,
  Send,
} from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { toast } from "sonner";
import { cn } from "@/shared/lib/utils";
import { TemplateToolItem } from "../data/templates.data";
import { Button } from "@/shared/components/ui/button";

interface TemplateToolWorkspaceProps {
  tool: TemplateToolItem;
}

export function TemplateToolWorkspace({ tool }: TemplateToolWorkspaceProps) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const router = useRouter();

  // Active preset
  const [selectedPresetId, setSelectedPresetId] = useState<string>(
    tool.presets[0]?.id || "",
  );

  const currentPreset =
    tool.presets.find((p) => p.id === selectedPresetId) || tool.presets[0];

  // Form State
  const [prompt, setPrompt] = useState<string>("");
  const [tone, setTone] = useState<string>("professional");
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState<string>(currentPreset?.sampleResult || "");
  const [copied, setCopied] = useState(false);

  // Handle Preset Switch
  const handleSelectPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    const target = tool.presets.find((p) => p.id === presetId);
    if (target) {
      setOutput(target.sampleResult);
    }
  };

  // Mock Generation
  const handleGenerate = () => {
    if (!prompt.trim() && !currentPreset) {
      toast.error("يرجى إدخال تفاصيل الموضوع أو الفكرة أولاً.");
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      const generated = prompt.trim()
        ? `✨ تم إنشاء المحتوى بنجاح وفقاً للمتطلبات:\n\nالموضوع: ${prompt}\nالنبرة: ${
            tone === "professional"
              ? "احترافية"
              : tone === "persuasive"
                ? "تسويقية ومقنعة"
                : "ودودة ومبسطة"
          }\n\n${currentPreset?.sampleResult || "محتوى ذكي مخصص جاهز للاستخدام."}`
        : currentPreset?.sampleResult || "";
      setOutput(generated);
      toast.success("تم توليد المحتوى بنجاح!");
    }, 900);
  };

  // Copy to clipboard
  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      toast.success("تم نسخ المحتوى إلى الحافظة!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("تعذر النسخ.");
    }
  };

  // Word & Char Count
  const wordCount = output ? output.trim().split(/\s+/).filter(Boolean).length : 0;
  const charCount = output ? output.length : 0;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:py-6 sm:px-6">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex flex-col gap-3 pb-6 border-b border-border/40">
        <div className="flex items-center justify-between">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <Link
              href="/dashboard"
              className="transition-colors hover:text-foreground"
            >
              الرئيسية
            </Link>
            <span className="text-muted-foreground/60">•</span>
            <Link
              href="/dashboard/templates"
              className="transition-colors hover:text-foreground"
            >
              أدوات الكتابة
            </Link>
            <span className="text-muted-foreground/60">•</span>
            <span className="font-semibold text-foreground">{tool.title}</span>
          </nav>

          <Link
            href="/dashboard/templates"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {isRtl ? <ArrowRight className="size-3.5" /> : <ArrowLeft className="size-3.5" />}
            <span>العودة للقوالب</span>
          </Link>
        </div>

        {/* Tool Title & Meta */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
                {tool.title}
              </h1>
              <span className="rounded-full border border-[#ea5b39]/30 bg-[#ea5b39]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#ea5b39]">
                {tool.badge}
              </span>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground max-w-2xl">
              {tool.subtitle}
            </p>
          </div>

          {/* Quick Action: Open in Chat */}
          <Link
            href="/dashboard/chat"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-muted/60 px-3.5 py-2 text-xs font-semibold text-foreground transition-all hover:bg-muted hover:border-brand/40 border border-border"
          >
            <MessageSquare className="size-3.5 text-[#ea5b39]" />
            <span>المحادثة المباشرة</span>
          </Link>
        </div>
      </div>

      {/* Preset Tabs */}
      <div className="my-6">
        <p className="text-xs font-semibold text-muted-foreground mb-2.5 flex items-center gap-1.5">
          <SlidersHorizontal className="size-3.5 text-[#ea5b39]" />
          <span>اختر نوع القالب أو النمط:</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {tool.presets.map((preset) => {
            const isActive = preset.id === selectedPresetId;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(preset.id)}
                className={cn(
                  "cursor-pointer rounded-xl px-3.5 py-2 text-xs font-semibold transition-all",
                  isActive
                    ? "bg-[#ea5b39] text-white shadow-md shadow-[#ea5b39]/20 scale-102"
                    : "bg-card border border-border/80 text-muted-foreground hover:bg-muted/80 hover:text-foreground",
                )}
              >
                {preset.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Studio Grid: Inputs on Left, Output on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Input Panel */}
        <div className="lg:col-span-5 flex flex-col gap-4 rounded-2xl border border-border/80 bg-card/60 p-4 sm:p-5 shadow-xs backdrop-blur-sm">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              موضوع المحتوى أو الفكرة:
            </label>
            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={currentPreset?.placeholder || "اكتب تفاصيل ما تود إنشاءه هنا..."}
              className="w-full resize-none rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-[#ea5b39] focus:outline-none focus:ring-1 focus:ring-[#ea5b39]/30"
            />
          </div>

          {/* Tone Selector */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              نبرة الصوت والأسلوب:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "professional", label: "احترافية" },
                { id: "persuasive", label: "تسويقية" },
                { id: "friendly", label: "ودودة ومقنعة" },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTone(t.id)}
                  className={cn(
                    "cursor-pointer rounded-lg border py-1.5 text-center text-xs font-medium transition-all",
                    tone === t.id
                      ? "border-[#ea5b39] bg-[#ea5b39]/10 text-[#ea5b39] font-bold"
                      : "border-border bg-background text-muted-foreground hover:bg-muted/50",
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <Button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="mt-2 w-full cursor-pointer gap-2 rounded-xl bg-gradient-to-r from-[#ea5b39] to-[#d84824] text-white py-5 shadow-md shadow-[#ea5b39]/15 hover:opacity-90 active:scale-[0.99]"
          >
            <Sparkles className={cn("size-4", isGenerating && "animate-spin")} />
            <span>{isGenerating ? "جارٍ الإنشاء الذكي..." : "توليد المحتوى بالذكاء الاصطناعي"}</span>
          </Button>

          {/* Tips block */}
          <div className="rounded-xl border border-border/40 bg-muted/30 p-3 text-[11px] text-muted-foreground leading-relaxed">
            💡 <strong className="text-foreground">نصيحة:</strong> كلما كانت التعليمات والنقاط المحددة أوضح، كانت النتيجة أكثر دقة ومطابقة لأهداف مشروعك.
          </div>
        </div>

        {/* Right Column: Output Result & Actions */}
        <div className="lg:col-span-7 flex flex-col rounded-2xl border border-border/80 bg-card/60 shadow-xs backdrop-blur-sm overflow-hidden">
          {/* Output Toolbar */}
          <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-4 py-3">
            <div className="flex items-center gap-2">
              <FileText className="size-4 text-[#ea5b39]" />
              <span className="text-xs font-semibold text-foreground">
                المحتوى الناتج
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleCopy}
                disabled={!output}
                title="نسخ المحتوى"
                className="flex items-center gap-1 rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-all hover:bg-muted disabled:opacity-40"
              >
                {copied ? (
                  <>
                    <Check className="size-3.5 text-emerald-500" />
                    <span className="text-emerald-500">تم النسخ</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" />
                    <span>نسخ</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setOutput("")}
                disabled={!output}
                title="مسح"
                className="rounded-lg border border-border bg-background p-1 text-muted-foreground transition-all hover:bg-muted hover:text-foreground disabled:opacity-40"
              >
                <RotateCcw className="size-3.5" />
              </button>
            </div>
          </div>

          {/* Output Textarea / Editor Area */}
          <div className="p-4 sm:p-5">
            <textarea
              rows={14}
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              placeholder="ستظهر النتيجة هنا بعد الضغط على زر التوليد..."
              className="w-full resize-none bg-transparent text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:outline-none font-sans"
            />
          </div>

          {/* Output Footer Status */}
          <div className="flex items-center justify-between border-t border-border/60 bg-muted/20 px-4 py-2.5 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-3">
              <span>{wordCount} كلمة</span>
              <span>•</span>
              <span>{charCount} حرف</span>
            </div>

            <Link
              href="/dashboard/chat"
              className="inline-flex items-center gap-1 font-semibold text-[#ea5b39] hover:underline"
            >
              <span>متابعة وتعديل في الشات</span>
              <Send className="size-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
