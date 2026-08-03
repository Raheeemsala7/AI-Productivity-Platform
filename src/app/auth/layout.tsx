import { Sparkles } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="relative flex min-h-screen items-center justify-center px-4 py-16">
            <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" aria-hidden />
            <div className="relative w-full max-w-md fade-up">
                {/* <div className="mb-8 flex flex-col items-center text-center">
                    <Link href="/" className="mb-6 inline-flex items-center gap-2">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)]">
                            <Sparkles className="h-4 w-4 text-[color:var(--primary-foreground)]" />
                        </span>
                        <span className="text-lg font-semibold tracking-tight">ORICO</span>
                    </Link>
                    <span className="rounded-full border border-[color:var(--border-strong)] px-3 py-1 text-[11px] uppercase tracking-widest text-muted-foreground">
                        {badge}
                    </span>
                    <h1 className="mt-4 text-3xl font-semibold tracking-tight text-gradient">{title}</h1>
                    <p className="mt-2 max-w-sm text-sm text-muted-foreground">{subtitle}</p>
                </div> */}

                {/* <div className="glass rounded-2xl p-6 sm:p-7"> */}
                    {children}
                    {/* </div> */}

                <p className="mt-6 text-center text-xs text-muted-foreground">
                    Protected workspace · Arabic & English support
                </p>
            </div>
        </main>
    )
}
