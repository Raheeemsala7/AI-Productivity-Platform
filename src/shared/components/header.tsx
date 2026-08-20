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
import { buttonVariants } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

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
                    <Link href="#features" className="hover:text-foreground transition">{t("features")}</Link>
                    <Link href="#demo" className="hover:text-foreground transition">{t("demo")}</Link>
                    <Link href="#pricing" className="hover:text-foreground transition">{t("pricing")}</Link>
                    <Link href="#faq" className="hover:text-foreground transition">{t("faq")}</Link>
                </nav>
                <div className="flex items-center gap-3">
                    <LocaleSwitcher className="hidden sm:inline-flex" />
                    <ThemeToggle />

                    {isLoading ? (
                        <Skeleton className="size-9 rounded-full" />
                    ) : isAuthenticated ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-1.5 focus:outline-none">
                                <Avatar>
                                    {session?.user ? (
                                        <AvatarImage
                                            src={
                                                (session.user as any).image ||
                                                (session.user as any).avatar
                                            }
                                            alt={session.user?.name || "User"}
                                        />
                                    ) : null}

                                    <AvatarFallback
                                        style={{
                                            backgroundColor:
                                                (session?.user as any)?.avatar_color ||
                                                "hsl(var(--primary))",
                                            color: "hsl(var(--primary-foreground))",
                                        }}
                                    >
                                        {session?.user?.name ? (
                                            getInitials(session.user.name)
                                        ) : (
                                            <User className="size-4" />
                                        )}
                                    </AvatarFallback>
                                </Avatar>

                                <ChevronDown className="size-4 text-muted-foreground transition-transform duration-200 data-[state=open]:rotate-180" />
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                align="end"
                                sideOffset={8}
                                className="w-56 rounded-xl p-1.5"
                            >
                                <DropdownMenuGroup>
                                    {/* User Info */}
                                    <DropdownMenuLabel className="p-0">
                                        <div className="flex items-center gap-3 p-3">
                                            <Avatar className="size-10 shrink-0">
                                                {session?.user ? (
                                                    <AvatarImage
                                                        src={
                                                            (session.user as any).image ||
                                                            (session.user as any).avatar
                                                        }
                                                        alt={session.user?.name || "User"}
                                                    />
                                                ) : null}

                                                <AvatarFallback
                                                    style={{
                                                        backgroundColor:
                                                            (session?.user as any)?.avatar_color ||
                                                            "hsl(var(--primary))",
                                                        color: "hsl(var(--primary-foreground))",
                                                    }}
                                                >
                                                    {session?.user?.name ? (
                                                        getInitials(session.user.name)
                                                    ) : (
                                                        <User className="size-4" />
                                                    )}
                                                </AvatarFallback>
                                            </Avatar>

                                            <div className="flex min-w-0 flex-col">
                                                <span className="truncate text-sm font-medium text-foreground">
                                                    {session?.user?.name || "User"}
                                                </span>

                                                <span className="truncate text-xs text-muted-foreground">
                                                    {session?.user?.email}
                                                </span>
                                            </div>
                                        </div>
                                    </DropdownMenuLabel>

                                    <DropdownMenuSeparator />

                                    {/* Dashboard */}
                                    <DropdownMenuItem>
                                        <Link
                                            href="/dashboard"
                                            className="cursor-pointer flex items-center gap-2.5 rounded-lg "
                                        >
                                            <LayoutDashboard className="size-4 text-muted-foreground" />
                                            <span>{t("dashboard")}</span>
                                        </Link>
                                    </DropdownMenuItem>

                                    {/* Sign out */}
                                    <DropdownMenuItem
                                        onClick={handleSignOut}
                                        className="cursor-pointer gap-2.5 rounded-lg text-destructive focus:bg-destructive/10 focus:text-destructive"
                                    >
                                        <LogOut className="size-4" />
                                        <span>{t("signOut")}</span>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>

                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <>
                            <Link href="/auth/login" className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground transition">{t("signIn")}</Link>
                            <Link href={"/auth/register"} className={cn("btn-primary rounded-lg px-4 py-2 text-sm font-medium inline-flex items-center gap-1.5", buttonVariants({}))}>
                                {t("getStarted")} <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
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
