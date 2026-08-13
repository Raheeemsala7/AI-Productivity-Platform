"use client";

import { verifyEmailAction } from "@/features/auth/apis/auth.action";
import { Link } from "@/i18n/navigation";
import { CheckCircle2, Loader2, Sparkles, XCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

type VerifyState = "loading" | "success" | "error" | "invalid";

type Props = {
    id?: string;
    hash?: string;
    expires?: string;
    signature?: string;
};

export function VerifyEmailContent({ id, hash, expires, signature }: Props) {
    const t = useTranslations("VerifyEmail");
    const [state, setState] = useState<VerifyState>("loading");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!id || !hash || !expires || !signature) {
            setState("invalid");
            return;
        }

        let cancelled = false;

        verifyEmailAction({ id, hash, expires, signature })
            .then((data) => {
                if (cancelled) return;
                setMessage(data.message);
                setState("success");
            })
            .catch((error: unknown) => {
                if (cancelled) return;
                setMessage(error instanceof Error ? error.message : t("errorDefault"));
                setState("error");
            });

        return () => {
            cancelled = true;
        };
    }, [id, hash, expires, signature, t]);

    return (
        <div className="mb-8 flex flex-col items-center text-center">
            <Link href="/" className="mb-6 inline-flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)]">
                    <Sparkles className="h-4 w-4 text-[color:var(--primary-foreground)]" />
                </span>
                <span className="text-lg font-semibold tracking-tight">ORICO</span>
            </Link>

            <div className="glass w-full rounded-2xl p-8 sm:p-10">
                {state === "loading" && (
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="h-10 w-10 animate-spin text-primary" />
                        <h1 className="text-xl font-semibold tracking-tight">{t("verifying")}</h1>
                        <p className="text-sm text-muted-foreground">{t("verifyingSubtitle")}</p>
                    </div>
                )}

                {state === "success" && (
                    <div className="flex flex-col items-center gap-4 fade-up">
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/40 bg-accent/10">
                            <CheckCircle2 className="h-7 w-7 text-accent" />
                        </div>
                        <h1 className="text-xl font-semibold tracking-tight text-gradient">{t("successTitle")}</h1>
                        <p className="text-sm text-muted-foreground">{message || t("successSubtitle")}</p>
                        <Link
                            href="/auth/login"
                            className="btn-primary mt-2 inline-flex h-11 items-center justify-center rounded-xl px-6 text-sm font-semibold"
                        >
                            {t("goToSignIn")}
                        </Link>
                    </div>
                )}

                {state === "error" && (
                    <div className="flex flex-col items-center gap-4 fade-up">
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-destructive/30 bg-destructive/10">
                            <XCircle className="h-7 w-7 text-destructive" />
                        </div>
                        <h1 className="text-xl font-semibold tracking-tight">{t("errorTitle")}</h1>
                        <p className="text-sm text-muted-foreground">{message || t("errorDefault")}</p>
                        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                            <Link
                                href="/auth/login"
                                className="btn-primary inline-flex h-11 items-center justify-center rounded-xl px-6 text-sm font-semibold"
                            >
                                {t("goToSignIn")}
                            </Link>
                            <Link
                                href="/auth/register"
                                className="btn-ghost inline-flex h-11 items-center justify-center rounded-xl px-6 text-sm font-semibold"
                            >
                                {t("createAccount")}
                            </Link>
                        </div>
                    </div>
                )}

                {state === "invalid" && (
                    <div className="flex flex-col items-center gap-4 fade-up">
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-destructive/30 bg-destructive/10">
                            <XCircle className="h-7 w-7 text-destructive" />
                        </div>
                        <h1 className="text-xl font-semibold tracking-tight">{t("invalidTitle")}</h1>
                        <p className="text-sm text-muted-foreground">{t("invalidSubtitle")}</p>
                        <Link
                            href="/auth/register"
                            className="btn-primary mt-2 inline-flex h-11 items-center justify-center rounded-xl px-6 text-sm font-semibold"
                        >
                            {t("createAccount")}
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
