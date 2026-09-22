"use client";

import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, LayoutDashboard, LogOut } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Brand, ArrowLink } from "./brand";
import { ThemeToggle } from "./theme-toggle";
import { LocaleSwitcher } from "./locale-switcher";
import { useTranslations } from "next-intl";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/shared/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { User } from "lucide-react";

const NAV_LINKS = [
  ["product", "#product"],
  ["solutions", "#tools"],
  ["resources", "#templates"],
  ["pricing", "#pricing"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations("Header");
  const { data: session, status } = useSession();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isAuthenticated = status === "authenticated";

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/95 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-5 md:px-10">
        <Brand />

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map(([key, href]) => (
            <a
              key={key}
              href={href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(key as "product" | "solutions" | "resources" | "pricing")}
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          <LocaleSwitcher className="text-sm" />
          <ThemeToggle />

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1.5 focus:outline-none">
                <Avatar className="size-8">
                  <AvatarImage
                    src={session?.user?.avatar ?? ""}
                    alt={session?.user?.name ?? ""}
                  />
                  <AvatarFallback className="bg-brand text-brand-foreground text-xs">
                    {session?.user?.name ? (
                      getInitials(session.user.name)
                    ) : (
                      <User className="size-3.5" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="size-3.5 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={8} className="w-48">
          <DropdownMenuLabel className="font-normal">
                  <p className="truncate text-sm font-medium">
                    {session?.user?.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {session?.user?.email}
                  </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link
                      href="/dashboard"
                      className="flex w-full cursor-pointer items-center gap-2"
                    >
                      <LayoutDashboard className="size-3.5" />
                      {t("dashboard")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: "/auth/login" })}
                    className="cursor-pointer gap-2 text-destructive focus:text-destructive"
                  >
                    <LogOut className="size-3.5" />
                    {t("signOut")}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {t("signIn")}
              </Link>
              <Link
                href="/auth/register"
                className="group inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-brand-foreground shadow-sm transition-opacity hover:opacity-90"
              >
                <ArrowLink>{t("getStarted")}</ArrowLink>
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-lg border border-border md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-background px-5 py-5 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map(([key, href]) => (
              <a
                key={key}
                href={href}
                onClick={() => setOpen(false)}
                className="border-b border-border py-4 text-base"
              >
                {t(key as "product" | "solutions" | "resources" | "pricing")}
              </a>
            ))}
            <Link
              href="/auth/register"
              className="mt-4 inline-flex items-center justify-center rounded-lg bg-brand py-2.5 text-sm font-medium text-brand-foreground"
              onClick={() => setOpen(false)}
            >
              {t("getStarted")}
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center py-2.5 text-sm text-muted-foreground"
              onClick={() => setOpen(false)}
            >
              {t("signIn")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
