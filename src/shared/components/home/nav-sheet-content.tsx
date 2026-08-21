import React from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { ArrowRight, Menu } from 'lucide-react'
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { LocaleSwitcher } from '../locale-switcher';
import { ThemeToggle } from '../theme-toggle';
import { useSession } from 'next-auth/react';
import { Skeleton } from '../ui/skeleton';
import { Separator } from '../ui/separator';
import { cn } from '@/shared/lib/utils';
import { buttonVariants } from '../ui/button';

export default function NavSheetContent() {
    // Transation
    const t = useTranslations("Header");
    // Session
    const { status, data } = useSession()
    // Variables
    const isLoading = status === "loading";
    const isAuthenticated = status === "authenticated"

    return (
        // Mobile Navigation
        <div className="md:hidden">
            <Sheet>
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
                    side="right"
                    className="w-[85%] max-w-sm border-l border-border/60 bg-background/95 px-6 backdrop-blur-xl"
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
                        <MobileNavLink href="#features">
                            {t("features")}
                        </MobileNavLink>

                        <MobileNavLink href="#demo">
                            {t("demo")}
                        </MobileNavLink>

                        <MobileNavLink href="#pricing">
                            {t("pricing")}
                        </MobileNavLink>

                        <MobileNavLink href="#faq">
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

                            {/* <Skeleton className="h-6 w-48 rounded-full" /> */}
                        </div>
                    ) : isAuthenticated ?
                        <>
                        </> :
                        <div className='flex flex-col gap-4'>
                            <Link href="/auth/login" className={cn(buttonVariants({ variant: "secondary" }), "text-sm text-muted-foreground hover:text-foreground transition")}>{t("signIn")}</Link>
                            <Link href={"/auth/register"} className={cn("btn-primary rounded-lg px-4 py-2 text-sm font-medium inline-flex items-center gap-1.5", buttonVariants({}))}>
                                {t("getStarted")} <ArrowRight className="w-3.5 h-3.5" />
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
}: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <Link
            href={href}
            className="group flex h-11 items-center rounded-xl px-3 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground"
        >
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
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