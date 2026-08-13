"use client"
import { ArrowRight, ChevronDown, LayoutDashboard, Loader2, LogOut, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "./locale-switcher";
import { useSession, signOut } from "next-auth/react";
import { Skeleton } from "./ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/shared/lib/utils";

export function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const t = useTranslations("Header");
    const { data: session, status } = useSession();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };
        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuOpen]);

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map(n => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const handleSignOut = () => {
        signOut({ callbackUrl: "/auth/login" });
    };

    const isLoading = status === "loading";
    const isAuthenticated = status === "authenticated"
    console.log(isAuthenticated , isLoading)

    return (
        <header
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "backdrop-blur-xl bg-background/70 border-b border-border" : ""
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <Logo />
                    <span className="font-semibold tracking-tight text-lg">ORICO</span>
                </Link>
                <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
                    <a href="#features" className="hover:text-foreground transition">{t("features")}</a>
                    <a href="#demo" className="hover:text-foreground transition">{t("demo")}</a>
                    <a href="#pricing" className="hover:text-foreground transition">{t("pricing")}</a>
                    <a href="#faq" className="hover:text-foreground transition">{t("faq")}</a>
                </nav>
                <div className="flex items-center gap-3">
                    <LocaleSwitcher className="hidden sm:inline-flex" />
                    <ThemeToggle />

                    {isLoading ? (
                        <Skeleton className="size-9 rounded-full" />
                    ) : isAuthenticated ? (
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="flex items-center gap-1.5 focus:outline-none"
                            >
                                <Avatar>
                                    {session?.user || session?.user ? (
                                        <AvatarImage
                                            src={(session.user as any).image || (session.user as any).avatar}
                                            alt={session.user?.name || "User"}
                                        />
                                    ) : null}
                                    <AvatarFallback
                                        style={{
                                            backgroundColor: (session?.user as any)?.avatar_color || "hsl(var(--primary))",
                                            color: "hsl(var(--primary-foreground))",
                                        }}
                                    >
                                        {session?.user?.name ? getInitials(session.user.name) : <User className="size-4" />}
                                    </AvatarFallback>
                                </Avatar>
                                <ChevronDown className={cn("size-4 text-muted-foreground transition-transform", menuOpen && "rotate-180")} />
                            </button>

                            {menuOpen && (
                                <div
                                    className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-popover shadow-lg z-50 overflow-hidden animate-in fade-in-0 zoom-in-95"
                                    style={{ animationDuration: "150ms" }}
                                >
                                    <div className="flex items-center gap-3 p-4 border-b border-border">
                                        <Avatar className="size-10">
                                            {session?.user || session?.user ? (
                                                <AvatarImage
                                                    src={(session.user as any).image || (session.user as any).avatar}
                                                    alt={session.user?.name || "User"}
                                                />
                                            ) : null}
                                            <AvatarFallback
                                                style={{
                                                    backgroundColor: (session?.user as any)?.avatar_color || "hsl(var(--primary))",
                                                    color: "hsl(var(--primary-foreground))",
                                                }}
                                            >
                                                {session?.user?.name ? getInitials(session.user.name) : <User className="size-4" />}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col min-w-0">
                                            <span className="font-medium text-sm text-foreground truncate">
                                                {session?.user?.name || "User"}
                                            </span>
                                            <span className="text-xs text-muted-foreground truncate">
                                                {session?.user?.email}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-1.5 flex flex-col gap-1">
                                        <Link
                                            href="/dashboard"
                                            className="flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg text-foreground hover:bg-muted transition"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            <LayoutDashboard className="size-4 text-muted-foreground" />
                                            {t("dashboard")}
                                        </Link>
                                        <button
                                            onClick={handleSignOut}
                                            className="flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg text-destructive hover:bg-destructive/10 transition w-full text-left"
                                        >
                                            <Loader2 className="size-4 animate-spin hidden" />
                                            <LogOut className="size-4" />
                                            {t("signOut")}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link href="/auth/login" className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground transition">{t("signIn")}</Link>
                            <button className="btn-primary rounded-lg px-4 py-2 text-sm font-medium inline-flex items-center gap-1.5">
                                {t("getStarted")} <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

function Logo() {
    return (
        <div className="relative w-8 h-8 rounded-lg overflow-hidden" style={{ background: "var(--gradient-primary)" }}>
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">O</div>
            <div className="absolute -inset-2 blur-xl opacity-40" style={{ background: "var(--gradient-primary)" }} />
        </div>
    );
}
