"use client";

import { Rocket } from "lucide-react";
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "./locale-switcher";

export function Footer() {
    const t = useTranslations("Footer");

    const cols = [
        {
            title: t("product"),
            links: [
                { label: t("links.features"), href: "#features" },
                { label: t("links.pricing"), href: "#pricing" },
                { label: t("links.documentation"), href: "#" },
                { label: t("links.changelog"), href: "#" },
            ],
        },
        {
            title: t("company"),
            links: [
                { label: t("links.blog"), href: "#" },
                { label: t("links.contact"), href: "#" },
                { label: t("links.careers"), href: "#" },
                { label: t("links.press"), href: "#" },
            ],
        },
        {
            title: t("legal"),
            links: [
                { label: t("links.privacy"), href: "#" },
                { label: t("links.terms"), href: "#" },
                { label: t("links.security"), href: "#" },
                { label: t("links.dpa"), href: "#" },
            ],
        },
    ];

    return (
        <footer className="border-t border-border/60 mt-12">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-5 gap-10">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2">
                            <Rocket className="w-6 h-6 text-accent" />
                            <span className="font-semibold text-lg tracking-tight">ORICO</span>
                        </div>
                        <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
                            {t("tagline")}
                        </p>
                        <div className="mt-6">
                            <LocaleSwitcher />
                        </div>
                    </div>
                    {cols.map((c) => (
                        <div key={c.title}>
                            <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.title}</div>
                            <ul className="mt-4 space-y-2.5 text-sm">
                                {c.links.map((l) => (
                                    <li key={l.label}>
                                        <a href={l.href} className="text-foreground/80 hover:text-foreground transition">{l.label}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="mt-12 pt-6 border-t border-border/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-muted-foreground">
                    <div>© {new Date().getFullYear()} ORICO. {t("copyright")}</div>
                    <div className="flex items-center gap-2">
                        <Rocket className="w-3.5 h-3.5 text-accent" />
                        {t("slogan")}
                    </div>
                </div>
            </div>
        </footer>
    );
}
