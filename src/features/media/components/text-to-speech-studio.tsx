"use client";

import React, { useState, useEffect, useRef } from "react";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Smile,
  Megaphone,
  Globe,
  Film,
  Gamepad2,
  Radio,
  Heart,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Download,
  Copy,
  Check,
  Sparkles,
  Sliders,
  X,
  ChevronRight,
  ChevronDown,
  RotateCcw,
  Zap,
  Star,
  CheckCircle2,
  Clock,
  Layers,
  FileAudio,
  Mic,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";

interface VoiceOption {
  id: string;
  name: string;
  desc: string;
  avatarInitial: string;
  avatarColor: string;
  gender: "male" | "female";
  lang: string;
  sampleAudio?: string;
}

const VOICES: VoiceOption[] = [
  {
    id: "roger",
    name: "Roger",
    desc: "Laid-back, casual, resonant",
    avatarInitial: "R",
    avatarColor: "bg-emerald-500",
    gender: "male",
    lang: "English / Multilingual",
  },
  {
    id: "sarah",
    name: "Sarah",
    desc: "Warm, expressive, natural storyteller",
    avatarInitial: "S",
    avatarColor: "bg-violet-500",
    gender: "female",
    lang: "English / Multilingual",
  },
  {
    id: "tariq",
    name: "طارق (Tariq)",
    desc: "صوت إذاعي فصيح، فخم وعميق",
    avatarInitial: "ط",
    avatarColor: "bg-[#ea5b39]",
    gender: "male",
    lang: "العربية الفصحى (Native)",
  },
  {
    id: "layla",
    name: "ليلى (Layla)",
    desc: "صوت عربي ناعم، شاعري وتفاعلي",
    avatarInitial: "ل",
    avatarColor: "bg-rose-500",
    gender: "female",
    lang: "العربية (Native)",
  },
  {
    id: "adam",
    name: "Adam",
    desc: "Bold, deep, authoritative trailer voice",
    avatarInitial: "A",
    avatarColor: "bg-blue-500",
    gender: "male",
    lang: "English (US)",
  },
];

interface GeneratedClip {
  id: string;
  text: string;
  voice: VoiceOption;
  duration: string;
  timestamp: string;
}

export function TextToSpeechStudio() {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("TextToSpeechStudio");

  // State
  const [activeTab, setActiveTab] = useState<"settings" | "history">("settings");
  const [showProTip, setShowProTip] = useState(true);
  const [text, setText] = useState("");
  const [selectedVoice, setSelectedVoice] = useState<VoiceOption>(VOICES[0]);
  const [showVoicePicker, setShowVoicePicker] = useState(false);
  const [selectedModel, setSelectedModel] = useState<"v2" | "t25">("v2");
  const [selectedLanguage, setSelectedLanguage] = useState("auto");

  // Sliders
  const [stability, setStability] = useState(75);
  const [clarity, setClarity] = useState(80);
  const [styleExaggeration, setStyleExaggeration] = useState(20);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Generation & Audio Playback
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentClip, setCurrentClip] = useState<GeneratedClip | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isCopied, setIsCopied] = useState(false);
  const [historyClips, setHistoryClips] = useState<GeneratedClip[]>([
    {
      id: "demo-1",
      text: isRtl
        ? "مرحباً بكم في منصة أوريكو للذكاء الاصطناعي وهندسة الصوت."
        : "Welcome to the future of lifelike voice synthesis.",
      voice: VOICES[0],
      duration: "00:14",
      timestamp: isRtl ? "منذ 10 دقائق" : "10m ago",
    },
  ]);

  // Audio animation interval simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setPlaybackProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 2.5 * playbackSpeed;
        });
      }, 200);
    }
    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed]);

  // Quick Chips Prompts definition
  const quickChips = [
    {
      id: "story",
      label: t("chips.story"),
      icon: BookOpen,
      sampleText: isRtl
        ? "كان يا ما كان في قديم الزمان، على سفح جبل تكسوه الغيوم، قرية صغيرة كانت تُعرف بصناع الأمل وحكايات المساء الدافئة."
        : "Once upon a time, nestled between misty snow-capped peaks, lay a forgotten village renowned for ancient stories and evening warmth.",
    },
    {
      id: "joke",
      label: t("chips.joke"),
      icon: Smile,
      sampleText: isRtl
        ? "لماذا لا تثق ذرات المادة ببعضها البعض أبداً؟ ... لأنها ببساطة تصنع وتختلق كل شيء!"
        : "Why don't scientists trust atoms anymore? ... Because they make up absolutely everything!",
    },
    {
      id: "ad",
      label: t("chips.ad"),
      icon: Megaphone,
      sampleText: isRtl
        ? "هل تبحث عن الطريقة الأسرع لمضاعفة إنتاجية شركتك؟ اكتشف استوديو الذكاء الاصطناعي اليوم، واجعل فكرتك القادمة حقيقة بنقرة واحدة!"
        : "Looking to scale your team's workflow in record time? Unlock the power of artificial intelligence today and transform your business.",
    },
    {
      id: "languages",
      label: t("chips.languages"),
      icon: Globe,
      sampleText: isRtl
        ? "مرحباً بكم! Bonjour tout le monde! Welcome to our multilingual generative AI studio."
        : "Hello and welcome! Bonjour tout le monde! Welcome to our multilingual generative voice studio.",
    },
    {
      id: "movie",
      label: t("chips.movie"),
      icon: Film,
      sampleText: isRtl
        ? "المدينة تحترق، والوقت ينفد منا بسرعة. إذا لم نتحرك الآن فوراً، فلن يتبقى أي شيء لننقذه غداً!"
        : "The storm is closing in, and time is slipping away. If we don't hold the line now, there won't be a tomorrow to fight for.",
    },
    {
      id: "game",
      label: t("chips.game"),
      icon: Gamepad2,
      sampleText: isRtl
        ? "احذر أيها المغامر! هذا الكهف المسحور يحمل لعنة قديمة، وقد ابتلع عشرات الأبطال قبلك!"
        : "Watch your step, traveler. This cursed crypt has swallowed hundreds of brave souls before you.",
    },
    {
      id: "podcast",
      label: t("chips.podcast"),
      icon: Radio,
      sampleText: isRtl
        ? "أهلاً ومرحباً بكم في حلقة جديدة من بودكاست رواد الأعمال. اليوم نناقش أسرار النمو المتسارع في العصر الرقمي."
        : "Welcome back to another episode of the Builder's Podcast. Today, we break down the latest breakthroughs in digital acceleration.",
    },
    {
      id: "meditation",
      label: t("chips.meditation"),
      icon: Heart,
      sampleText: isRtl
        ? "خذ نفساً عميقاً وبطيئاً... املأ رئتيك بالسكينة، وازفر ببطء. دع كل التوتر والضغوط تتلاشى في هذه اللحظة."
        : "Take a slow, deep breath in... hold it gently, and release. Let all the tension melt away into complete, tranquil calm.",
    },
  ];

  const handleGenerate = () => {
    if (!text.trim()) return;

    setIsGenerating(true);
    setIsPlaying(false);

    setTimeout(() => {
      setIsGenerating(false);
      const newClip: GeneratedClip = {
        id: `clip-${Date.now()}`,
        text: text.slice(0, 80) + (text.length > 80 ? "..." : ""),
        voice: selectedVoice,
        duration: "00:24",
        timestamp: isRtl ? "الآن" : "Just now",
      };
      setCurrentClip(newClip);
      setHistoryClips((prev) => [newClip, ...prev]);
      setIsPlaying(true);
      setPlaybackProgress(0);
    }, 1400);
  };

  const handleCopyLink = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSpeedCycle = () => {
    const speeds = [1.0, 1.25, 1.5, 2.0];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIdx]);
  };

  return (
    <div className="w-full max-w-7xl mx-auto sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Top Header & Breadcrumb */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <Link
          href="/dashboard/media"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group"
        >
          {isRtl ? (
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          ) : (
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
          )}
          <span>{t("backLink")}</span>
        </Link>

        {/* Model Engine Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Multilingual Voice AI</span>
        </div>
      </div>

      {/* Main Page Title */}
      <div className="mb-7">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground tracking-tight">
          {t("title")}
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground">
          {t("subtitle")}
        </p>
      </div>

      {/* Main Two-Column Layout (Matching ElevenLabs Reference) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ========================================================
            LEFT COLUMN: Text Input + Quick Chips + Generate CTA (7 cols)
        ======================================================== */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Main Dark Studio Panel */}
          <div className="rounded-2xl bg-card border border-border/80 shadow-xl overflow-hidden flex flex-col justify-between min-h-[460px] p-5 sm:p-6 relative backdrop-blur-md">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand/5 rounded-full blur-3xl pointer-events-none" />

            {/* Top: Large Textarea */}
            <div className="flex-1 flex flex-col relative z-10">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={5000}
                placeholder={t("placeholder")}
                rows={6}
                className="w-full bg-transparent border-0 text-sm sm:text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-0 resize-none leading-relaxed font-normal"
              />
            </div>

            {/* Center: "Get started with" interactive chips */}
            <div className="relative z-10 my-4 pt-4 border-t border-border/40">
              <p className="text-xs font-bold text-foreground/80 mb-3 flex items-center gap-1.5">
                <Sparkles className="size-3.5 text-brand" />
                <span>{t("getStartedWith")}</span>
              </p>

              <div className="flex flex-wrap gap-2">
                {quickChips.map((chip) => {
                  const Icon = chip.icon;
                  return (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={() => setText(chip.sampleText)}
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-all duration-200",
                        "bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/40 hover:border-border",
                        "hover:scale-[1.02] active:scale-95"
                      )}
                    >
                      <Icon className="size-3.5 text-muted-foreground shrink-0" />
                      <span>{chip.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom: Char Count & Generate CTA Button */}
            <div className="relative z-10 pt-4 border-t border-border/40 flex items-center justify-between gap-4">
              <span className="text-xs font-mono text-muted-foreground">
                {text.length.toLocaleString()} / 5,000
              </span>

              <Button
                type="button"
                disabled={!text.trim() || isGenerating}
                onClick={handleGenerate}
                className={cn(
                  "cursor-pointer font-bold px-6 py-2.5 rounded-xl transition-all duration-200 shadow-md",
                  "bg-brand hover:bg-brand-dark text-white shadow-brand/20 hover:scale-[1.02] active:scale-98",
                  (!text.trim() || isGenerating) && "opacity-50 cursor-not-allowed hover:scale-100"
                )}
              >
                {isGenerating ? (
                  <>
                    <span className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    <span>{t("generating")}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="size-4" />
                    <span>{t("generateBtn")}</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Generated Audio Player Showcase */}
          {currentClip && (
            <div className="rounded-2xl bg-card border border-brand/30 shadow-lg p-5 sm:p-6 backdrop-blur-md animate-in fade-in slide-in-from-top-3 duration-300">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-full bg-brand/10 border border-brand/30 flex items-center justify-center text-brand">
                    <Volume2 className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-foreground">
                      {t("player.title")}
                    </h4>
                    <p className="text-[11px] text-muted-foreground">
                      {t("player.voiceUsed")}: {currentClip.voice.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleSpeedCycle}
                    className="px-2 py-1 rounded-md text-[11px] font-mono font-bold bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    {playbackSpeed.toFixed(2)}x
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer transition-colors"
                    title={t("player.copy")}
                  >
                    {isCopied ? (
                      <Check className="size-4 text-emerald-500" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => alert(isRtl ? "جاري تحميل الملف الصوتي..." : "Downloading audio...")}
                    className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer transition-colors"
                    title={t("player.download")}
                  >
                    <Download className="size-4" />
                  </button>
                </div>
              </div>

              {/* Audio Waveform Scrubber */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="size-10 rounded-full bg-brand text-white flex items-center justify-center shadow-md shadow-brand/20 hover:scale-105 active:scale-95 transition-transform cursor-pointer shrink-0"
                >
                  {isPlaying ? (
                    <Pause className="size-4.5 fill-current" />
                  ) : (
                    <Play className="size-4.5 fill-current translate-x-0.5 rtl:-translate-x-0.5" />
                  )}
                </button>

                {/* Animated Waveform Visualizer */}
                <div
                  className="flex-1 h-10 flex items-center gap-1 px-3 bg-muted/40 rounded-xl cursor-pointer overflow-hidden border border-border/40"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    setPlaybackProgress(Math.min(100, Math.max(0, (clickX / rect.width) * 100)));
                  }}
                >
                  {Array.from({ length: 36 }).map((_, i) => {
                    const heightPercent = 20 + ((i * 17) % 75);
                    const isPlayed = (i / 36) * 100 <= playbackProgress;

                    return (
                      <span
                        key={i}
                        className={cn(
                          "w-1 rounded-full transition-all duration-150",
                          isPlayed ? "bg-brand" : "bg-muted-foreground/30",
                          isPlaying && isPlayed && "animate-pulse"
                        )}
                        style={{ height: `${heightPercent}%` }}
                      />
                    );
                  })}
                </div>

                <span className="text-xs font-mono text-muted-foreground shrink-0">
                  {isPlaying
                    ? `00:${Math.floor((playbackProgress / 100) * 24).toString().padStart(2, "0")}`
                    : "00:24"}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================
            RIGHT COLUMN: Settings & History Tabs (5 cols)
        ======================================================== */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="rounded-2xl bg-card border border-border/80 shadow-xl p-5 sm:p-6 backdrop-blur-md">
            {/* Top Tabs: Settings & History */}
            <div className="flex items-center gap-6 border-b border-border/60 pb-3 mb-5">
              <button
                type="button"
                onClick={() => setActiveTab("settings")}
                className={cn(
                  "text-sm font-bold pb-2 transition-all cursor-pointer relative",
                  activeTab === "settings"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span>{t("tabs.settings")}</span>
                {activeTab === "settings" && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-brand rounded-full" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("history")}
                className={cn(
                  "text-sm font-bold pb-2 transition-all cursor-pointer relative flex items-center gap-1.5",
                  activeTab === "history"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span>{t("tabs.history")}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-muted font-mono">
                  {historyClips.length}
                </span>
                {activeTab === "history" && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-brand rounded-full" />
                )}
              </button>
            </div>

            {/* TAB CONTENT: SETTINGS */}
            {activeTab === "settings" && (
              <div className="flex flex-col gap-5">
                {/* 1. Pro Tip Card */}
                {showProTip && (
                  <div className="relative rounded-xl bg-gradient-to-br from-rose-500/10 via-brand/10 to-amber-500/10 border border-brand/30 p-3.5 flex items-start gap-3">
                    <div className="size-10 rounded-xl bg-gradient-to-tr from-[#ea5b39] to-rose-400 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Mic className="size-5" />
                    </div>
                    <div className="flex-1 pe-4">
                      <h4 className="text-xs font-bold text-foreground">
                        {t("proTip.title")}
                      </h4>
                      <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">
                        {t("proTip.body")}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowProTip(false)}
                      className="absolute top-2.5 end-2.5 text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                )}

                {/* 2. Voice Selector Card */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-foreground">
                      {t("voice.label")}
                    </label>
                    <span className="text-[11px] font-semibold text-amber-500 inline-flex items-center gap-1">
                      <Star className="size-3 fill-amber-500" />
                      <span>{t("voice.recommend")}</span>
                    </span>
                  </div>

                  {/* Active Voice Pill */}
                  <div
                    onClick={() => setShowVoicePicker(!showVoicePicker)}
                    className="group flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/60 hover:border-brand/40 hover:bg-muted/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "size-8 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-xs",
                          selectedVoice.avatarColor
                        )}
                      >
                        {selectedVoice.avatarInitial}
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-foreground group-hover:text-brand transition-colors">
                          {selectedVoice.name}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {selectedVoice.desc}
                        </p>
                      </div>
                    </div>

                    <ChevronDown
                      className={cn(
                        "size-4 text-muted-foreground transition-transform",
                        showVoicePicker && "rotate-180"
                      )}
                    />
                  </div>

                  {/* Dropdown Voices Picker List */}
                  {showVoicePicker && (
                    <div className="mt-2 rounded-xl border border-border/80 bg-popover shadow-xl p-1.5 flex flex-col gap-1 animate-in fade-in zoom-in-95 duration-200">
                      {VOICES.map((v) => {
                        const isSelected = selectedVoice.id === v.id;
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => {
                              setSelectedVoice(v);
                              setShowVoicePicker(false);
                            }}
                            className={cn(
                              "flex items-center justify-between p-2 rounded-lg text-start transition-colors cursor-pointer",
                              isSelected
                                ? "bg-brand/10 text-brand font-bold"
                                : "hover:bg-muted text-muted-foreground hover:text-foreground"
                            )}
                          >
                            <div className="flex items-center gap-2.5">
                              <div
                                className={cn(
                                  "size-6 rounded-full flex items-center justify-center text-white font-bold text-[10px]",
                                  v.avatarColor
                                )}
                              >
                                {v.avatarInitial}
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-foreground">
                                  {v.name}
                                </p>
                                <p className="text-[10px] text-muted-foreground">
                                  {v.desc}
                                </p>
                              </div>
                            </div>
                            {isSelected && (
                              <CheckCircle2 className="size-4 text-brand" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 3. Model Selector Card */}
                <div>
                  <label className="block text-xs font-bold text-foreground mb-2">
                    {t("model.label")}
                  </label>

                  {/* Selected Model Card */}
                  <div
                    onClick={() => setSelectedModel(selectedModel === "v2" ? "t25" : "v2")}
                    className={cn(
                      "flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer",
                      selectedModel === "v2"
                        ? "bg-brand/5 border-brand/50 shadow-xs"
                        : "bg-muted/30 border-border/60 hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="px-2 py-1 rounded-md bg-brand text-white font-mono font-bold text-[10px]">
                        {selectedModel === "v2" ? "V2" : "T2.5"}
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-foreground">
                          {selectedModel === "v2"
                            ? t("model.multilingualTitle")
                            : "Turbo v2.5"}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {selectedModel === "v2"
                            ? t("model.multilingualDesc")
                            : "Low latency, instant generation"}
                        </p>
                      </div>
                    </div>
                    {isRtl ? (
                      <ArrowLeft className="size-4 text-muted-foreground" />
                    ) : (
                      <ArrowRight className="size-4 text-muted-foreground" />
                    )}
                  </div>

                  {/* Upsell / Switch Promo Pill */}
                  <div className="mt-2.5 flex items-center justify-between px-3 py-2 rounded-xl bg-muted/40 border border-border/40">
                    <span className="text-[11px] text-muted-foreground">
                      {t("model.fasterGen")}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedModel("t25")}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-background border border-border hover:border-brand/50 text-foreground cursor-pointer transition-colors"
                    >
                      {t("model.tryT25")}
                    </button>
                  </div>
                </div>

                {/* 4. Language Selector */}
                <div>
                  <label className="block text-xs font-bold text-foreground mb-2">
                    {t("language.label")}
                  </label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-muted/30 border border-border/60 text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand/40 cursor-pointer"
                  >
                    <option value="auto">{t("language.autoDetect")}</option>
                    <option value="ar-fusha">{t("language.arStandard")}</option>
                    <option value="ar-eg">{t("language.arEgyptian")}</option>
                    <option value="ar-gulf">{t("language.arGulf")}</option>
                    <option value="en-us">{t("language.enUS")}</option>
                    <option value="en-uk">{t("language.enUK")}</option>
                  </select>
                </div>

                {/* 5. Advanced Voice Tuning Sliders Toggle */}
                <div className="pt-2 border-t border-border/40">
                  <button
                    type="button"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="w-full flex items-center justify-between text-xs font-bold text-muted-foreground hover:text-foreground cursor-pointer py-1"
                  >
                    <span className="flex items-center gap-1.5">
                      <Sliders className="size-3.5 text-brand" />
                      <span>{t("sliders.title")}</span>
                    </span>
                    <ChevronDown
                      className={cn(
                        "size-3.5 transition-transform",
                        showAdvanced && "rotate-180"
                      )}
                    />
                  </button>

                  {showAdvanced && (
                    <div className="mt-3 flex flex-col gap-3.5 p-3 rounded-xl bg-muted/20 border border-border/40 animate-in fade-in duration-200">
                      {/* Stability Slider */}
                      <div>
                        <div className="flex justify-between text-[11px] font-medium mb-1">
                          <span className="text-muted-foreground">
                            {t("sliders.stability")}
                          </span>
                          <span className="font-mono text-foreground font-bold">
                            {stability}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={stability}
                          onChange={(e) => setStability(Number(e.target.value))}
                          className="w-full h-1.5 rounded-lg bg-muted appearance-none cursor-pointer accent-brand"
                        />
                      </div>

                      {/* Clarity Slider */}
                      <div>
                        <div className="flex justify-between text-[11px] font-medium mb-1">
                          <span className="text-muted-foreground">
                            {t("sliders.clarity")}
                          </span>
                          <span className="font-mono text-foreground font-bold">
                            {clarity}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={clarity}
                          onChange={(e) => setClarity(Number(e.target.value))}
                          className="w-full h-1.5 rounded-lg bg-muted appearance-none cursor-pointer accent-brand"
                        />
                      </div>

                      {/* Style Exaggeration Slider */}
                      <div>
                        <div className="flex justify-between text-[11px] font-medium mb-1">
                          <span className="text-muted-foreground">
                            {t("sliders.style")}
                          </span>
                          <span className="font-mono text-foreground font-bold">
                            {styleExaggeration}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={styleExaggeration}
                          onChange={(e) => setStyleExaggeration(Number(e.target.value))}
                          className="w-full h-1.5 rounded-lg bg-muted appearance-none cursor-pointer accent-brand"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB CONTENT: HISTORY */}
            {activeTab === "history" && (
              <div className="flex flex-col gap-3">
                <h4 className="text-xs font-bold text-foreground mb-1">
                  {t("history.title")}
                </h4>

                {historyClips.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-8">
                    {t("history.empty")}
                  </p>
                ) : (
                  historyClips.map((clip) => (
                    <div
                      key={clip.id}
                      className="p-3 rounded-xl bg-muted/30 border border-border/50 flex items-center justify-between gap-3 hover:border-brand/40 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => {
                            setCurrentClip(clip);
                            setIsPlaying(true);
                            setPlaybackProgress(0);
                          }}
                          className="size-8 rounded-full bg-brand/10 text-brand flex items-center justify-center shrink-0 hover:bg-brand hover:text-white transition-colors cursor-pointer"
                        >
                          <Play className="size-3.5 fill-current translate-x-0.5 rtl:-translate-x-0.5" />
                        </button>
                        <div className="overflow-hidden">
                          <p className="text-xs font-semibold text-foreground truncate">
                            {clip.text}
                          </p>
                          <p className="text-[10px] text-muted-foreground flex items-center gap-1.5 mt-0.5">
                            <span className="font-medium text-brand">
                              {clip.voice.name}
                            </span>
                            <span>•</span>
                            <span className="font-mono">{clip.duration}</span>
                            <span>•</span>
                            <span>{clip.timestamp}</span>
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => alert(isRtl ? "جاري تحميل الملف..." : "Downloading clip...")}
                        className="p-1.5 rounded-md text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                        title={t("history.download")}
                      >
                        <Download className="size-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

