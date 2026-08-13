export default function VerifyEmailLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="relative flex min-h-screen items-center justify-center px-4 py-16">
            <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" aria-hidden />
            <div className="relative w-full max-w-md fade-up">
                {children}
            </div>
        </main>
    );
}
