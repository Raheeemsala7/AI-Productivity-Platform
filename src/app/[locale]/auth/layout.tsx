import { getTranslations } from 'next-intl/server'

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    const t = await getTranslations("Auth")

    return (
        <main className="relative flex min-h-screen items-center justify-center px-4 py-16">
            <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" aria-hidden />
            <div className="relative w-full max-w-md fade-up">
                {children}

                <p className="mt-6 text-center text-xs text-muted-foreground">
                    {t("protectedWorkspace")}
                </p>
            </div>
        </main>
    )
}
