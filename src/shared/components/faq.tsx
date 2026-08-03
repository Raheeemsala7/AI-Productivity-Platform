"use client"
import { useState } from "react";
import { SectionHeader } from "./sec-header";
import { ChevronDown } from "lucide-react";

export function FAQ() {
    const faqs = [
        {
            q: "How accurate are the AI-generated business plans?",
            a: "ORICO cross-references live market data with proven planning frameworks. Every module is editable, and we surface the assumptions behind every number so you can adjust with confidence.",
        },
        {
            q: "What export formats do you support?",
            a: "PDF, DOCX and PPTX for plans and pitch decks. Landing pages export as production-ready HTML/CSS. Images are provided as PNG and SVG where applicable.",
        },
        {
            q: "Which languages does ORICO support?",
            a: "Plans and assets can be generated in over 40 languages, including English, Arabic, Spanish, French, German, Portuguese and Mandarin.",
        },
        {
            q: "Is my data private?",
            a: "Your data is encrypted in transit and at rest. We never train on your content. Enterprise plans include region-locked storage and SSO.",
        },
        {
            q: "Can my team collaborate on the same plan?",
            a: "Yes. Professional and Enterprise plans include shared workspaces, roles, comments and real-time editing.",
        },
        {
            q: "Do you offer refunds?",
            a: "Every paid plan starts with a 14-day trial. If ORICO isn't the right fit, cancel any time — no questions asked.",
        },
    ];
    const [open, setOpen] = useState<number | null>(0);
    return (
        <section id="faq" className="py-24 md:py-32 border-t border-border/60">
            <div className="max-w-4xl mx-auto px-6">
                <SectionHeader eyebrow="FAQ" title="Answers to the questions founders ask most." />
                <div className="mt-12 divide-y divide-border rounded-2xl border border-border bg-card/40">
                    {faqs.map((f, i) => {
                        const isOpen = open === i;
                        return (
                            <button
                                key={f.q}
                                onClick={() => setOpen(isOpen ? null : i)}
                                className="w-full text-left px-6 py-5 flex flex-col gap-2 hover:bg-card/60 transition"
                            >
                                <div className="flex items-center justify-between gap-6">
                                    <span className="text-[15px] font-medium">{f.q}</span>
                                    <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                                </div>
                                {isOpen && <p className="text-sm text-muted-foreground leading-relaxed pr-8 fade-up">{f.a}</p>}
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}