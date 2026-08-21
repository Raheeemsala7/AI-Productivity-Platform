"use client"
import { useState } from "react";
import { SectionHeader } from "./sec-header";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

const FAQ_KEYS = ["accuracy", "export", "languages", "privacy", "collaboration", "refunds"] as const;

export function FAQ() {
    const t = useTranslations("FAQ");
    const faqs = FAQ_KEYS.map((key) => ({
        key,
        q: t(`items.${key}.q`),
        a: t(`items.${key}.a`),
    }));

    const [open, setOpen] = useState<number | null>(0);

    return (
        <section id="faq" className="py-24 md:py-32 border-t border-border/60">
            <div className="max-w-4xl mx-auto px-6">
                <SectionHeader eyebrow={t("eyebrow")} title={t("title")} />
                <div className="mt-12 divide-y divide-border rounded-2xl border border-border bg-card/40">
                    {faqs.map((f, i) => {
                        const isOpen = open === i;
                        return (
                            <button
                                key={f.key}
                                onClick={() => setOpen(isOpen ? null : i)}
                                className="w-full text-left px-6 py-5 flex flex-col gap-2 hover:bg-card/60 transition"
                            >
                                <div className="flex items-center justify-between gap-6">
                                    <span className="text-[15px] font-medium">{f.q}</span>
                                    <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                                </div>
                                {isOpen && <p className="text-sm text-muted-foreground leading-relaxed pe-8 fade-up rtl:text-right">{f.a}</p>}
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
