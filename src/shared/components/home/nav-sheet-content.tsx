import React, { useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { ArrowRight, LayoutDashboard, LogOut, Menu } from 'lucide-react'
import { Link } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { LocaleSwitcher } from '../locale-switcher';
import { ThemeToggle } from '../theme-toggle';
import { useSession, signOut } from 'next-auth/react';
import { Skeleton } from '../ui/skeleton';
import { cn } from '@/shared/lib/utils';
import { buttonVariants } from '../ui/button';

export default function NavSheetContent() {
    // Transation
    const t = useTranslations("Header");
    const locale = useLocale();
    // Session
    const { status } = useSession()
    // Variables
    const isLoading = status === "loading";
    const isAuthenticated = status === "authenticated"
    const side = locale === "ar" ? "left" : "right";
    const isRtl = locale === "ar";
    const [open, setOpen] = useState(false);
    const close = () => setOpen(false);

    const handleSignOut = () => {
        signOut({ callbackUrl: "/auth/login" });
    };

    return (
        // Mobile Navigation
        <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger>
                    <button
                        type="button"
                        aria-label="Open navigation"
                        className="flex size-9 items-center justify-center rounded-xl border border-border/60 bg-background/50 text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground active:scale-95"
                    >
                        <Menu className="size-5" />
                    </button>
                </SheetTrigger>

                <SheetContent
                    side={side}
                    className={cn(
                        "w-[85%] max-w-sm bg-background/95 px-6 backdrop-blur-xl",
                        isRtl ? "border-r border-border/60" : "border-l border-border/60",
                    )}
                >
                    <SheetHeader className="border-b border-border/60 pb-5">
                        <SheetTitle className="flex items-center gap-2 text-left">
                            <Logo />
                            <span className="font-semibold tracking-tight">
                                ORICO
                            </span>
                        </SheetTitle>
                    </SheetHeader>

                    {/* Mobile Navigation Links */}
                    <nav className="mt-7 flex flex-col gap-1.5">
                        <MobileNavLink href="#features" onClick={close}>
                            {t("features")}
                        </MobileNavLink>

                        <MobileNavLink href="#demo" onClick={close}>
                            {t("demo")}
                        </MobileNavLink>

                        <MobileNavLink href="#pricing" onClick={close}>
                            {t("pricing")}
                        </MobileNavLink>

                        <MobileNavLink href="#faq" onClick={close}>
                            {t("faq")}
                        </MobileNavLink>
                    </nav>

                    {/* Mobile Authentication */}
                    {isLoading ? (
                        <div className="space-y-4">
                            <div className="flex gap-2 items-center">
                                <Skeleton className="size-12 rounded-full" />

                                <div className='space-y-2'>
                                    <Skeleton className="h-3 w-32 rounded-full" />
                                    <Skeleton className="h-2 w-32 rounded-full" />
                                </div>
                            </div>
                        </div>
                    ) : isAuthenticated ?
                        <div className="mt-6 flex flex-col gap-1.5">
                            <Link
                                href="/dashboard"
                                onClick={close}
                                className="flex h-11 items-center gap-2.5 rounded-xl px-3 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground"
                            >
                                <LayoutDashboard className="size-4" />
                                {t("dashboard")}
                            </Link>

                            <button
                                type="button"
                                onClick={handleSignOut}
                                className="flex h-11 items-center gap-2.5 rounded-xl px-3 text-sm font-medium text-destructive transition-all duration-200 hover:bg-destructive/10"
                            >
                                <LogOut className="size-4" />
                                {t("signOut")}
                            </button>
                        </div> :
                        <div className='flex flex-col gap-4'>
                            <Link href="/auth/login" className={cn(buttonVariants({ variant: "secondary" }), "text-sm text-muted-foreground hover:text-foreground transition")}>{t("signIn")}</Link>
                            <Link href={"/auth/register"} className={cn("btn-primary rounded-lg px-4 py-2 text-sm font-medium inline-flex items-center gap-1.5", buttonVariants({}))}>
                                {t("getStarted")} <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                            </Link>
                        </div>
                    }

                    {/* Mobile Settings */}
                    <div className="mt-7 border-t border-border/60 pt-6">
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                    {t("language")}
                                </span>

                                <LocaleSwitcher />
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                    {t("theme")}
                                </span>

                                <ThemeToggle />
                            </div>
                        </div>
                    </div>

                </SheetContent>
            </Sheet>
        </div>
    )
}


function MobileNavLink({
    href,
    children,
    onClick,
}: {
    href: string;
    children: React.ReactNode;
    onClick?: () => void;
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="group flex h-11 items-center rounded-xl px-3 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground"
        >
            <span className="transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
                {children}
            </span>
        </Link>
    );
}

function Logo() {
    return (
        <div
            className="relative h-8 w-8 overflow-hidden rounded-lg"
            style={{
                background: "var(--gradient-primary)",
            }}
        >
            <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
                O
            </div>

            <div
                className="absolute -inset-2 blur-xl opacity-40"
                style={{
                    background: "var(--gradient-primary)",
                }}
            />
        </div>
    );
}