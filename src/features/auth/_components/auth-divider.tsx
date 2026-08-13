"use client";

import { useTranslations } from "next-intl";

export function AuthDivider() {
    const t = useTranslations("Auth");

    return (
        <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-wider">
                <span className="bg-transparent px-3 text-muted-foreground">
                    {t("orContinueWithEmail")}
                </span>
            </div>
        </div>
    );
}
