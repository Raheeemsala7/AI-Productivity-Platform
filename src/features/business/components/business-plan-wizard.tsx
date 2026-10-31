"use client";

import React, { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  UploadCloud,
  Package,
  Briefcase,
  Layers,
  Globe,
  Store,
  Laptop,
  Users,
  Target,
  DollarSign,
  TrendingUp,
  FileText,
  Copy,
  Download,
  RotateCcw,
  Plus,
  Trash2,
  Building2,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";

interface ProductItem {
  id: string;
  name: string;
  price: string;
  description: string;
}

export function BusinessPlanWizard() {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("BusinessPlanWizard");

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Form State - Step 1: Basic Info
  const [businessName, setBusinessName] = useState("Learnify AI");
  const [valueProp, setValueProp] = useState(
    "Providing innovative autonomous workflow solutions for growing enterprises."
  );
  const [businessDesc, setBusinessDesc] = useState(
    "A software development company specializing in AI-driven productivity and workflow tools for SMEs."
  );
  const [offeringType, setOfferingType] = useState<"product" | "service" | "both">("both");
  const [deliveryChannel, setDeliveryChannel] = useState<"online" | "physical" | "hybrid">("online");

  // Form State - Step 2: Target Market
  const [marketScope, setMarketScope] = useState<"local" | "national" | "regional" | "global">("national");
  const [targetCountry, setTargetCountry] = useState("saudi");
  const [audienceType, setAudienceType] = useState<"b2c" | "b2b" | "both">("b2b");
  const [customerDesc, setCustomerDesc] = useState(
    "Serving tech-forward enterprises and SMEs that seek to automate repetitive operational workflows."
  );
  const [incomeLevels, setIncomeLevels] = useState<string[]>(["mid", "high"]);

  // Form State - Step 3: Products & Offerings
  const [products, setProducts] = useState<ProductItem[]>([
    {
      id: "prod-1",
      name: "AI Business Optimizer Pro",
      price: "$49 / mo",
      description: "An AI-powered software suite that optimizes task allocation and operations.",
    },
  ]);
  const [problemSolved, setProblemSolved] = useState(
    "High operational overhead, lack of Arabic AI automation solutions, and fragmented workflow tools."
  );
  const [businessStage, setBusinessStage] = useState<"upcoming" | "existing">("upcoming");
  const [planPurpose, setPlanPurpose] = useState<"investors" | "banks" | "workplace" | "other">("investors");

  // Form State - Step 4: Financials & Team
  const [currency, setCurrency] = useState("USD");
  const [budget, setBudget] = useState("35,000");
  const [monthlyCosts, setMonthlyCosts] = useState("4,500");
  const [teamSize, setTeamSize] = useState<"solo" | "small" | "medium" | "large">("small");
  const [fundingTarget, setFundingTarget] = useState("120,000");
  const [firstYearMilestone, setFirstYearMilestone] = useState(
    "Acquiring 800 paying business accounts and achieving profitability within 10 months."
  );

  const stepsMeta = [
    { num: 1, title: t("steps.step1"), subtitle: t("steps.step1Sub") },
    { num: 2, title: t("steps.step2"), subtitle: t("steps.step2Sub") },
    { num: 3, title: t("steps.step3"), subtitle: t("steps.step3Sub") },
    { num: 4, title: t("steps.step4"), subtitle: t("steps.step4Sub") },
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      handleFinalSubmit();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleFinalSubmit = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsCompleted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1800);
  };

  const handleAddProduct = () => {
    setProducts((prev) => [
      ...prev,
      {
        id: `prod-${Date.now()}`,
        name: "",
        price: "",
        description: "",
      },
    ]);
  };

  const handleRemoveProduct = (id: string) => {
    if (products.length > 1) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleUpdateProduct = (id: string, field: keyof ProductItem, val: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: val } : p))
    );
  };

  const toggleIncomeLevel = (lvl: string) => {
    setIncomeLevels((prev) =>
      prev.includes(lvl) ? prev.filter((i) => i !== lvl) : [...prev, lvl]
    );
  };

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Top Header & Breadcrumb */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <Link
          href="/dashboard/business"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group"
        >
          {isRtl ? (
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          ) : (
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
          )}
          <span>{t("backLink")}</span>
        </Link>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand/10 text-brand border border-brand/20">
          <Sparkles className="size-3.5 animate-pulse" />
          <span>{t("badge")}</span>
        </div>
      </div>

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground tracking-tight">
          {t("title")}
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground">
          {t("subtitle")}
        </p>
      </div>

      {!isCompleted ? (
        <>
          {/* ========================================================
              STEPPER NAVIGATION BAR
          ======================================================== */}
          <div className="rounded-2xl bg-card border border-border/70 p-4 sm:p-6 mb-8 shadow-sm">
            <div className="flex items-center justify-between relative">
              {/* Horizontal Connecting Progress Line */}
              <div className="absolute top-5 inset-x-8 sm:inset-x-14 h-0.5 bg-border/60 z-0">
                <div
                  className="h-full bg-brand transition-all duration-300"
                  style={{
                    width: `${((currentStep - 1) / (stepsMeta.length - 1)) * 100}%`,
                  }}
                />
              </div>

              {/* Step Circles */}
              {stepsMeta.map((step) => {
                const isActive = currentStep === step.num;
                const isPast = currentStep > step.num;

                return (
                  <button
                    key={step.num}
                    type="button"
                    onClick={() => {
                      if (step.num < currentStep) setCurrentStep(step.num);
                    }}
                    disabled={step.num > currentStep}
                    className="flex flex-col items-center relative z-10 group cursor-pointer disabled:cursor-not-allowed"
                  >
                    <div
                      className={cn(
                        "size-10 sm:size-11 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 shadow-sm",
                        isActive &&
                          "bg-brand text-white ring-4 ring-brand/20 scale-105 shadow-brand/30",
                        isPast &&
                          "bg-brand text-white hover:opacity-90",
                        !isActive &&
                          !isPast &&
                          "bg-card border-2 border-border text-muted-foreground"
                      )}
                    >
                      {isPast ? <Check className="size-4.5 stroke-[2.5]" /> : step.num}
                    </div>

                    <div className="text-center mt-2 hidden sm:block">
                      <p
                        className={cn(
                          "text-xs font-bold transition-colors",
                          isActive
                            ? "text-brand"
                            : isPast
                            ? "text-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {step.title}
                      </p>
                      <p className="text-[10px] text-muted-foreground/80 mt-0.5">
                        {step.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ========================================================
              FORM STEP CONTAINER
          ======================================================== */}
          <div className="rounded-2xl bg-card border border-border/70 p-6 sm:p-8 shadow-xl backdrop-blur-md">
            {/* ----------------------------------------------------
                STEP 1: Basic Business Information
            ---------------------------------------------------- */}
            {currentStep === 1 && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-foreground">
                    {t("step1.title")}
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t("step1.subtitle")}
                  </p>
                </div>

                {/* Logo + Business Name Row */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  {/* Upload Logo Box */}
                  <div className="sm:w-36 h-28 border-2 border-dashed border-border/70 hover:border-brand/50 rounded-2xl flex flex-col items-center justify-center p-3 text-center cursor-pointer transition-colors bg-muted/20 hover:bg-muted/40 shrink-0">
                    <UploadCloud className="size-6 text-brand mb-1" />
                    <span className="text-[11px] font-semibold text-foreground">
                      {t("step1.uploadText")}
                    </span>
                    <span className="text-[9px] text-muted-foreground mt-0.5">PNG / SVG</span>
                  </div>

                  {/* Business Name Field */}
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-foreground">
                      {t("step1.nameLabel")}
                    </label>
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder={t("step1.namePlaceholder")}
                      className="w-full h-11 px-4 rounded-xl bg-background border border-border/70 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition-all"
                    />
                    <span className="text-[11px] text-muted-foreground">
                      {t("step1.logoLabel")}
                    </span>
                  </div>
                </div>

                {/* Value Proposition */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-foreground">
                    {t("step1.valuePropLabel")}
                  </label>
                  <input
                    type="text"
                    value={valueProp}
                    onChange={(e) => setValueProp(e.target.value)}
                    placeholder={t("step1.valuePropPlaceholder")}
                    className="w-full h-11 px-4 rounded-xl bg-background border border-border/70 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition-all"
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-foreground">
                    {t("step1.descLabel")}
                  </label>
                  <textarea
                    value={businessDesc}
                    onChange={(e) => setBusinessDesc(e.target.value)}
                    rows={3}
                    placeholder={t("step1.descPlaceholder")}
                    className="w-full p-3.5 rounded-xl bg-background border border-border/70 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition-all resize-none leading-relaxed"
                  />
                </div>

                {/* Offering Type: Product / Service / Both */}
                <div>
                  <label className="block text-xs font-bold text-foreground mb-2.5">
                    {t("step1.typeLabel")}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: "product",
                        label: t("step1.product"),
                        desc: t("step1.productDesc"),
                        icon: Package,
                      },
                      {
                        id: "service",
                        label: t("step1.service"),
                        desc: t("step1.serviceDesc"),
                        icon: Briefcase,
                      },
                      {
                        id: "both",
                        label: t("step1.both"),
                        desc: t("step1.bothDesc"),
                        icon: Layers,
                      },
                    ].map((item) => {
                      const Icon = item.icon;
                      const isSelected = offeringType === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setOfferingType(item.id as typeof offeringType)}
                          className={cn(
                            "p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-2",
                            isSelected
                              ? "bg-brand/10 border-brand ring-1 ring-brand/40 shadow-sm"
                              : "bg-muted/20 border-border/60 hover:bg-muted/40 hover:border-border"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <Icon
                              className={cn(
                                "size-5",
                                isSelected ? "text-brand" : "text-muted-foreground"
                              )}
                            />
                            {isSelected && (
                              <CheckCircle2 className="size-4 text-brand" />
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-foreground">
                              {item.label}
                            </p>
                            <p className="text-[10px] text-muted-foreground mt-0.5">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Delivery Channel: Online / Physical / Hybrid */}
                <div>
                  <label className="block text-xs font-bold text-foreground mb-2.5">
                    {t("step1.deliveryLabel")}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: "online",
                        label: t("step1.online"),
                        desc: t("step1.onlineDesc"),
                        icon: Laptop,
                      },
                      {
                        id: "physical",
                        label: t("step1.physical"),
                        desc: t("step1.physicalDesc"),
                        icon: Store,
                      },
                      {
                        id: "hybrid",
                        label: t("step1.hybrid"),
                        desc: t("step1.hybridDesc"),
                        icon: Globe,
                      },
                    ].map((item) => {
                      const Icon = item.icon;
                      const isSelected = deliveryChannel === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setDeliveryChannel(item.id as typeof deliveryChannel)}
                          className={cn(
                            "p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-2",
                            isSelected
                              ? "bg-brand/10 border-brand ring-1 ring-brand/40 shadow-sm"
                              : "bg-muted/20 border-border/60 hover:bg-muted/40 hover:border-border"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <Icon
                              className={cn(
                                "size-5",
                                isSelected ? "text-brand" : "text-muted-foreground"
                              )}
                            />
                            {isSelected && (
                              <CheckCircle2 className="size-4 text-brand" />
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-foreground">
                              {item.label}
                            </p>
                            <p className="text-[10px] text-muted-foreground mt-0.5">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------
                STEP 2: Market & Audience
            ---------------------------------------------------- */}
            {currentStep === 2 && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-foreground">
                    {t("step2.title")}
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t("step2.subtitle")}
                  </p>
                </div>

                {/* Scope selector */}
                <div>
                  <label className="block text-xs font-bold text-foreground mb-2">
                    {t("step2.scopeLabel")}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: "local", label: t("step2.local") },
                      { id: "national", label: t("step2.national") },
                      { id: "regional", label: t("step2.regional") },
                      { id: "global", label: t("step2.global") },
                    ].map((scope) => (
                      <button
                        key={scope.id}
                        type="button"
                        onClick={() => setMarketScope(scope.id as typeof marketScope)}
                        className={cn(
                          "py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer",
                          marketScope === scope.id
                            ? "bg-brand text-white border-brand shadow-sm"
                            : "bg-muted/30 border-border/60 text-muted-foreground hover:bg-muted"
                        )}
                      >
                        {scope.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Target Country & Audience Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-foreground">
                      {t("step2.countryLabel")}
                    </label>
                    <select
                      value={targetCountry}
                      onChange={(e) => setTargetCountry(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-background border border-border/70 text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand/40 cursor-pointer"
                    >
                      <option value="saudi">{t("step2.countrySaudi")}</option>
                      <option value="uae">{t("step2.countryUae")}</option>
                      <option value="egypt">{t("step2.countryEgypt")}</option>
                      <option value="gcc">{t("step2.countryGcc")}</option>
                      <option value="global">{t("step2.countryOther")}</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-foreground">
                      {t("step2.audienceTypeLabel")}
                    </label>
                    <div className="grid grid-cols-3 gap-2 h-11">
                      {[
                        { id: "b2b", label: t("step2.b2b") },
                        { id: "b2c", label: t("step2.b2c") },
                        { id: "both", label: t("step2.bothAudience") },
                      ].map((aud) => (
                        <button
                          key={aud.id}
                          type="button"
                          onClick={() => setAudienceType(aud.id as typeof audienceType)}
                          className={cn(
                            "rounded-xl text-xs font-bold border transition-all cursor-pointer truncate px-2",
                            audienceType === aud.id
                              ? "bg-brand/10 text-brand border-brand"
                              : "bg-muted/20 border-border/60 text-muted-foreground hover:bg-muted"
                          )}
                        >
                          {aud.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Customer Persona Description */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-foreground">
                    {t("step2.customerDescLabel")}
                  </label>
                  <textarea
                    value={customerDesc}
                    onChange={(e) => setCustomerDesc(e.target.value)}
                    rows={3}
                    placeholder={t("step2.customerDescPlaceholder")}
                    className="w-full p-3.5 rounded-xl bg-background border border-border/70 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition-all resize-none leading-relaxed"
                  />
                </div>

                {/* Customer Group Income Level */}
                <div>
                  <label className="block text-xs font-bold text-foreground mb-2">
                    {t("step2.incomeLabel")}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: "low", label: t("step2.incomeLow") },
                      { id: "mid", label: t("step2.incomeMid") },
                      { id: "high", label: t("step2.incomeHigh") },
                    ].map((lvl) => {
                      const isSelected = incomeLevels.includes(lvl.id);
                      return (
                        <div
                          key={lvl.id}
                          onClick={() => toggleIncomeLevel(lvl.id)}
                          className={cn(
                            "p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between",
                            isSelected
                              ? "bg-brand/10 border-brand text-foreground font-semibold"
                              : "bg-muted/20 border-border/60 text-muted-foreground hover:bg-muted"
                          )}
                        >
                          <span className="text-xs">{lvl.label}</span>
                          <span
                            className={cn(
                              "size-4 rounded-md border flex items-center justify-center text-[10px]",
                              isSelected
                                ? "bg-brand border-brand text-white"
                                : "border-muted-foreground/40"
                            )}
                          >
                            {isSelected && <Check className="size-3" />}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------
                STEP 3: Products & Offerings Details
            ---------------------------------------------------- */}
            {currentStep === 3 && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-foreground">
                    {t("step3.title")}
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t("step3.subtitle")}
                  </p>
                </div>

                {/* Product Items List */}
                <div className="flex flex-col gap-4">
                  {products.map((prod, idx) => (
                    <div
                      key={prod.id}
                      className="p-4 sm:p-5 rounded-2xl bg-muted/20 border border-border/70 flex flex-col gap-3 relative"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-border/40">
                        <span className="text-xs font-bold text-brand">
                          {t("step3.productTitle")} #{idx + 1}
                        </span>
                        {products.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveProduct(prod.id)}
                            className="text-muted-foreground hover:text-destructive cursor-pointer p-1"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-[11px] font-semibold text-foreground">
                            {t("step3.prodName")}
                          </label>
                          <input
                            type="text"
                            value={prod.name}
                            onChange={(e) =>
                              handleUpdateProduct(prod.id, "name", e.target.value)
                            }
                            placeholder={t("step3.prodNamePlaceholder")}
                            className="w-full h-10 px-3 rounded-xl bg-background border border-border text-xs sm:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-brand"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[11px] font-semibold text-foreground">
                            {t("step3.prodPrice")}
                          </label>
                          <input
                            type="text"
                            value={prod.price}
                            onChange={(e) =>
                              handleUpdateProduct(prod.id, "price", e.target.value)
                            }
                            placeholder={t("step3.prodPricePlaceholder")}
                            className="w-full h-10 px-3 rounded-xl bg-background border border-border text-xs sm:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-brand"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-semibold text-foreground">
                          {t("step3.prodDesc")}
                        </label>
                        <input
                          type="text"
                          value={prod.description}
                          onChange={(e) =>
                            handleUpdateProduct(prod.id, "description", e.target.value)
                          }
                          placeholder={t("step3.prodDescPlaceholder")}
                          className="w-full h-10 px-3 rounded-xl bg-background border border-border text-xs sm:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-brand"
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={handleAddProduct}
                    className="self-start inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:underline cursor-pointer"
                  >
                    <Plus className="size-3.5" />
                    <span>{t("step3.addProdBtn")}</span>
                  </button>
                </div>

                {/* Problem Being Solved */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-foreground">
                    {t("step3.problemLabel")}
                  </label>
                  <textarea
                    value={problemSolved}
                    onChange={(e) => setProblemSolved(e.target.value)}
                    rows={3}
                    placeholder={t("step3.problemPlaceholder")}
                    className="w-full p-3.5 rounded-xl bg-background border border-border/70 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition-all resize-none leading-relaxed"
                  />
                </div>

                {/* Existing vs Upcoming Stage */}
                <div>
                  <label className="block text-xs font-bold text-foreground mb-2">
                    {t("step3.stageLabel")}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: "upcoming", label: t("step3.stageUpcoming") },
                      { id: "existing", label: t("step3.stageExisting") },
                    ].map((stage) => (
                      <div
                        key={stage.id}
                        onClick={() => setBusinessStage(stage.id as typeof businessStage)}
                        className={cn(
                          "p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between",
                          businessStage === stage.id
                            ? "bg-brand/10 border-brand text-brand font-bold shadow-xs"
                            : "bg-muted/20 border-border/60 text-muted-foreground hover:bg-muted"
                        )}
                      >
                        <span className="text-xs">{stage.label}</span>
                        {businessStage === stage.id && (
                          <CheckCircle2 className="size-4 text-brand" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Purpose of Plan */}
                <div>
                  <label className="block text-xs font-bold text-foreground mb-2">
                    {t("step3.purposeLabel")}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      { id: "investors", label: t("step3.purposeInvestors") },
                      { id: "banks", label: t("step3.purposeBanks") },
                      { id: "workplace", label: t("step3.purposeWorkplace") },
                      { id: "other", label: t("step3.purposeOther") },
                    ].map((purp) => (
                      <div
                        key={purp.id}
                        onClick={() => setPlanPurpose(purp.id as typeof planPurpose)}
                        className={cn(
                          "p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between",
                          planPurpose === purp.id
                            ? "bg-brand/10 border-brand text-brand font-bold"
                            : "bg-muted/20 border-border/60 text-muted-foreground hover:bg-muted"
                        )}
                      >
                        <span className="text-xs">{purp.label}</span>
                        {planPurpose === purp.id && (
                          <CheckCircle2 className="size-4 text-brand" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ----------------------------------------------------
                STEP 4: Financials & Team (Balance Sheet simplified)
            ---------------------------------------------------- */}
            {currentStep === 4 && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-foreground">
                    {t("step4.title")}
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t("step4.subtitle")}
                  </p>
                </div>

                {/* Currency + Budget + Monthly Burn */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-foreground">
                      {t("step4.currencyLabel")}
                    </label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-background border border-border/70 text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand/40 cursor-pointer font-mono"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="SAR">SAR (ر.س)</option>
                      <option value="AED">AED (د.إ)</option>
                      <option value="EGP">EGP (ج.م)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-foreground">
                      {t("step4.budgetLabel")}
                    </label>
                    <input
                      type="text"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder={t("step4.budgetPlaceholder")}
                      className="w-full h-11 px-4 rounded-xl bg-background border border-border/70 text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-brand/40"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-foreground">
                      {t("step4.costsLabel")}
                    </label>
                    <input
                      type="text"
                      value={monthlyCosts}
                      onChange={(e) => setMonthlyCosts(e.target.value)}
                      placeholder={t("step4.costsPlaceholder")}
                      className="w-full h-11 px-4 rounded-xl bg-background border border-border/70 text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-brand/40"
                    />
                  </div>
                </div>

                {/* Team Size */}
                <div>
                  <label className="block text-xs font-bold text-foreground mb-2">
                    {t("step4.teamLabel")}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: "solo", label: t("step4.solo") },
                      { id: "small", label: t("step4.small") },
                      { id: "medium", label: t("step4.medium") },
                      { id: "large", label: t("step4.large") },
                    ].map((tm) => (
                      <button
                        key={tm.id}
                        type="button"
                        onClick={() => setTeamSize(tm.id as typeof teamSize)}
                        className={cn(
                          "py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer",
                          teamSize === tm.id
                            ? "bg-brand text-white border-brand shadow-sm font-bold"
                            : "bg-muted/30 border-border/60 text-muted-foreground hover:bg-muted"
                        )}
                      >
                        {tm.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Funding Target */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-foreground">
                    {t("step4.fundingLabel")}
                  </label>
                  <input
                    type="text"
                    value={fundingTarget}
                    onChange={(e) => setFundingTarget(e.target.value)}
                    placeholder={t("step4.fundingPlaceholder")}
                    className="w-full h-11 px-4 rounded-xl bg-background border border-border/70 text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-brand/40"
                  />
                </div>

                {/* Milestone Goal */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-foreground">
                    {t("step4.goalsLabel")}
                  </label>
                  <textarea
                    value={firstYearMilestone}
                    onChange={(e) => setFirstYearMilestone(e.target.value)}
                    rows={2}
                    placeholder={t("step4.goalsPlaceholder")}
                    className="w-full p-3.5 rounded-xl bg-background border border-border/70 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition-all resize-none leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* ========================================================
                NAVIGATION BUTTONS BAR
            ======================================================== */}
            <div className="mt-8 pt-6 border-t border-border/50 flex items-center justify-between gap-4">
              <Button
                type="button"
                variant="outline"
                disabled={currentStep === 1 || isGenerating}
                onClick={handlePrev}
                className="cursor-pointer font-bold px-5"
              >
                {isRtl ? (
                  <ArrowRight className="size-4" />
                ) : (
                  <ArrowLeft className="size-4" />
                )}
                <span>{t("nav.previous")}</span>
              </Button>

              <Button
                type="button"
                disabled={isGenerating}
                onClick={handleNext}
                className="bg-brand hover:bg-brand-dark text-white font-bold px-7 shadow-md shadow-brand/20 cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <span className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    <span>{t("nav.generating")}</span>
                  </>
                ) : currentStep === 4 ? (
                  <>
                    <Sparkles className="size-4" />
                    <span>{t("nav.submit")}</span>
                  </>
                ) : (
                  <>
                    <span>{t("nav.next")}</span>
                    {isRtl ? (
                      <ArrowLeft className="size-4" />
                    ) : (
                      <ArrowRight className="size-4" />
                    )}
                  </>
                )}
              </Button>
            </div>
          </div>
        </>
      ) : (
        /* ========================================================
            FINAL GENERATED BUSINESS PLAN VIEW
        ======================================================== */
        <div className="rounded-2xl bg-card border border-border/70 p-6 sm:p-10 shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-98 duration-300">
          {/* Top Plan Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-border/60 gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 mb-2">
                <ShieldCheck className="size-3.5" />
                <span>{t("preview.badge")}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground">
                {t("preview.title")} {businessName}
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                {valueProp}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCompleted(false)}
                className="text-xs cursor-pointer"
              >
                <RotateCcw className="size-3.5" />
                <span>{t("preview.edit")}</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleCopy}
                className="text-xs cursor-pointer"
              >
                <Copy className="size-3.5" />
                <span>{isCopied ? t("preview.copied") : t("preview.copy")}</span>
              </Button>

              <Button
                type="button"
                onClick={() => alert(isRtl ? "جاري تحضير ملف الـ PDF..." : "Preparing PDF document...")}
                className="bg-brand hover:bg-brand-dark text-white text-xs font-bold cursor-pointer"
              >
                <Download className="size-3.5" />
                <span>{t("preview.export")}</span>
              </Button>
            </div>
          </div>

          {/* Business Plan Sections */}
          <div className="my-8 flex flex-col gap-8 text-start leading-relaxed">
            {/* 1. Executive Summary */}
            <div className="p-6 rounded-2xl bg-muted/20 border border-border/60">
              <h3 className="text-base sm:text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <Building2 className="size-5 text-brand" />
                <span>1. الملخص التنفيذي والرؤية (Executive Summary)</span>
              </h3>
              <p className="text-xs sm:text-sm text-foreground/90 mb-3">
                تعتبر شركة <strong>{businessName}</strong> من المشاريع الريادية الواعدة في قطاع حلول الأعمال الحديثة. تهدف الشركة إلى سد الفجوة القائمة في السوق عبر {valueProp}.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-border/40 text-xs">
                <div>
                  <span className="text-muted-foreground block text-[10px]">طبيعة النشاط:</span>
                  <span className="font-bold text-foreground capitalize">{offeringType}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">قناة التقديم:</span>
                  <span className="font-bold text-foreground capitalize">{deliveryChannel}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">نطاق الخدمة:</span>
                  <span className="font-bold text-foreground capitalize">{marketScope}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">مرحلة المشروع:</span>
                  <span className="font-bold text-brand capitalize">{businessStage}</span>
                </div>
              </div>
            </div>

            {/* 2. Problem & Solution */}
            <div className="p-6 rounded-2xl bg-muted/20 border border-border/60">
              <h3 className="text-base sm:text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <Target className="size-5 text-purple-500" />
                <span>2. المشكلة والحل ونموذج القيمة (Problem & Solution)</span>
              </h3>
              <div className="space-y-3 text-xs sm:text-sm text-muted-foreground">
                <p>
                  <strong className="text-foreground">المشكلة السوقية: </strong>
                  {problemSolved}
                </p>
                <p>
                  <strong className="text-foreground">حل {businessName}: </strong>
                  {businessDesc}
                </p>
              </div>

              {/* Products Table */}
              <div className="mt-4 pt-4 border-t border-border/40">
                <h4 className="text-xs font-bold text-foreground mb-2">
                  سلة المنتجات والخدمات الرئيسية:
                </h4>
                <div className="space-y-2">
                  {products.map((p, i) => (
                    <div
                      key={p.id}
                      className="p-3 rounded-xl bg-background border border-border/70 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-foreground">{p.name || `منتج #${i + 1}`}</span>
                        <p className="text-[11px] text-muted-foreground">{p.description || "حل مخصص متكامل"}</p>
                      </div>
                      <span className="font-mono font-bold text-brand bg-brand/10 px-2.5 py-1 rounded-lg">
                        {p.price || "تسعير مخصص"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Market & Customer Persona */}
            <div className="p-6 rounded-2xl bg-muted/20 border border-border/60">
              <h3 className="text-base sm:text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <Users className="size-5 text-sky-500" />
                <span>3. دراسة السوق وشريحة العملاء (Target Market & Persona)</span>
              </h3>
              <p className="text-xs sm:text-sm text-foreground/90 mb-3">
                {customerDesc}
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-3 py-1 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 font-semibold">
                  نوع الجمهور: {audienceType.toUpperCase()}
                </span>
                <span className="px-3 py-1 rounded-lg bg-muted text-muted-foreground">
                  السوق الجغرافي: {targetCountry.toUpperCase()}
                </span>
                <span className="px-3 py-1 rounded-lg bg-muted text-muted-foreground">
                  القدرة الشرائية المستهدفة: {incomeLevels.join(", ")}
                </span>
              </div>
            </div>

            {/* 4. Financial Plan & Growth Milestones */}
            <div className="p-6 rounded-2xl bg-muted/20 border border-border/60">
              <h3 className="text-base sm:text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <TrendingUp className="size-5 text-emerald-500" />
                <span>4. الخطة المالية ومستهدفات النمو (Financials & Growth)</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <div className="p-3 rounded-xl bg-background border border-border/60 text-center">
                  <span className="text-[10px] text-muted-foreground block">رأس المال المتاح</span>
                  <span className="text-base font-bold font-mono text-foreground">
                    {budget} {currency}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-background border border-border/60 text-center">
                  <span className="text-[10px] text-muted-foreground block">التكاليف التشغيلية الشهرية</span>
                  <span className="text-base font-bold font-mono text-foreground">
                    {monthlyCosts} {currency}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-brand/10 border border-brand/30 text-center">
                  <span className="text-[10px] text-brand block font-semibold">التمويل المستهدف</span>
                  <span className="text-base font-bold font-mono text-brand">
                    {fundingTarget} {currency}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-border/40 text-xs text-muted-foreground">
                <strong className="text-foreground">مستهدف العام الأول: </strong>
                {firstYearMilestone}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

