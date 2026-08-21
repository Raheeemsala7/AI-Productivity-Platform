export function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
    return (
        <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-widest text-primary">{eyebrow}</div>
            <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight leading-tight text-gradient">
                {title}
            </h2>
            {subtitle && <p className="mt-4 text-muted-foreground">{subtitle}</p>}
        </div>
    );
}