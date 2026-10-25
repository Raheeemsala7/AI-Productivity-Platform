"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Sparkles, History } from "lucide-react";
import { GeneratedResultItem } from "../types/template";
import { TemplateResultCard } from "./template-result-card";
import { TemplateResultEditModal } from "./template-result-edit-modal";

interface TemplateResultsHistoryProps {
  results: GeneratedResultItem[];
  onToggleCollapse: (id: string) => void;
  onSaveEdit: (id: string, newContent: string) => void;
  onAnimationComplete: (id: string) => void;
}

export function TemplateResultsHistory({
  results,
  onToggleCollapse,
  onSaveEdit,
  onAnimationComplete,
}: TemplateResultsHistoryProps) {
  const t = useTranslations("TemplateDetails");

  const [editingResultId, setEditingResultId] = useState<string | null>(null);

  const editingResult = results.find((r) => r.id === editingResultId) || null;

  return (
    <section
      aria-label={t("resultsHistoryTitle")}
      className="flex flex-col gap-5 w-full"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-border/40 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-xl bg-brand/10 text-brand">
            <History className="size-4" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-foreground">
              {t("resultsHistoryTitle")}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {t("resultsHistorySubtitle")}
            </p>
          </div>
        </div>

        {results.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand">
              {results.length}
            </span>
          </div>
        )}
      </div>

      {/* Results List or Empty State */}
      {results.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 sm:p-14 text-center rounded-3xl border border-dashed border-border/70 bg-card/40 my-2">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-muted/60 text-muted-foreground/70 mb-3 shadow-inner">
            <Sparkles className="size-7 stroke-[1.4]" />
          </div>
          <h4 className="text-sm sm:text-base font-bold text-foreground">
            {t("emptyResultsTitle")}
          </h4>
          <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground/80 max-w-sm leading-relaxed">
            {t("emptyResultsDesc")}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {results.map((result) => (
            <TemplateResultCard
              key={result.id}
              result={result}
              onToggleCollapse={onToggleCollapse}
              onEdit={(id) => setEditingResultId(id)}
              onAnimationComplete={onAnimationComplete}
            />
          ))}
        </div>
      )}

      {/* Isolated Edit Modal */}
      <TemplateResultEditModal
        result={editingResult}
        isOpen={Boolean(editingResultId)}
        onClose={() => setEditingResultId(null)}
        onSave={onSaveEdit}
      />
    </section>
  );
}
