"use client"
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return (
        <header
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "backdrop-blur-xl bg-background/70 border-b border-border" : ""
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <a href="#" className="flex items-center gap-2">
                    <Logo />
                    <span className="font-semibold tracking-tight text-lg">ORICO</span>
                </a>
                <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
                    <a href="#features" className="hover:text-foreground transition">Features</a>
                    <a href="#demo" className="hover:text-foreground transition">Demo</a>
                    <a href="#pricing" className="hover:text-foreground transition">Pricing</a>
                    <a href="#faq" className="hover:text-foreground transition">FAQ</a>
                </nav>
                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <Link href={"/auth/login"} className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground transition">Sign in</Link>
                    <button className="btn-primary rounded-lg px-4 py-2 text-sm font-medium inline-flex items-center gap-1.5">
                        Get started <ArrowRight className="w-3.5 h-3.5" />
                    </button>
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