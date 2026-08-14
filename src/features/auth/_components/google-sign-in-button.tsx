"use client";

import { useTranslations } from "next-intl";
import { GoogleIcon } from "./google-icon";
import { cn } from "@/shared/lib/utils";
import { signIn } from "next-auth/react";

type GoogleSignInButtonProps = {
    variant?: "signIn" | "signUp";
    className?: string;
};

export function GoogleSignInButton({ variant = "signIn", className }: GoogleSignInButtonProps) {
    const t = useTranslations("Auth");
    const label = variant === "signUp" ? t("signUpWithGoogle") : t("signInWithGoogle");

    return (
        <button
        onClick={() => {
            signIn("google");
        }}
            type="button"
            aria-label={label}
            className={cn(
                "inline-flex h-11 w-full items-center justify-center gap-3 rounded-xl cursor-pointer border border-border bg-card/60 px-4 text-sm font-medium text-foreground transition hover:bg-card hover:border-border/80",
                className,
            )}
        >
            <GoogleIcon className="h-5 w-5 shrink-0" />
            <span>{label}</span>
        </button>
    );
}
