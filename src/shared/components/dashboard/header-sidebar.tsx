import React from 'react'
import { SidebarTrigger } from '../ui/sidebar'
import { getTranslations } from 'next-intl/server';
import { ThemeToggle } from '../theme-toggle';
import { LocaleSwitcher } from '../locale-switcher';

export default async function HeaderSidebar({ name }: { name: string }) {
    // Transation
    const t = await getTranslations("Dashboard");
    return (
        <header className="flex h-16 items-center justify-between border-b px-3 md:px-6 py-2">
            <div className="flex items-center gap-2 md:gap-4">
                <SidebarTrigger />
                <div className="min-w-0 flex-1">
                    <h6 className="text-lg md:text-2xl font-semibold tracking-tight">{t("welcome", {
                        name: name.split(" ")[0]
                    })}</h6>
                    <p className="mt-1 text-xs md:text-sm text-muted-foreground">
                        {t("subtitle")}
                    </p>
                </div>
            </div>
            <div className='flex items-center gap-2'>
                <ThemeToggle />
                <LocaleSwitcher compact />
            </div>
        </header>
    )
}
