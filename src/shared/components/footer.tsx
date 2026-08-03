import { Rocket } from "lucide-react";
export function Footer() {
    const cols = [
        { title: "Product", links: ["Features", "Pricing", "Documentation", "Changelog"] },
        { title: "Company", links: ["Blog", "Contact", "Careers", "Press"] },
        { title: "Legal", links: ["Privacy", "Terms", "Security", "DPA"] },
    ];
    return (
        <footer className="border-t border-border/60 mt-12">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-5 gap-10">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2">
                            {/* <Logo /> */}
                            <Rocket className="w-6 h-6 text-accent" />
                            <span className="font-semibold text-lg tracking-tight">ORICO</span>
                        </div>
                        <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
                            The AI business partner for founders, freelancers and teams shipping their next idea.
                        </p>
                        <div className="mt-6 inline-flex items-center gap-1 rounded-lg border border-border bg-card/40 p-1 text-xs">
                            <button className="px-2.5 py-1 rounded-md bg-surface text-foreground">EN</button>
                            <button className="px-2.5 py-1 rounded-md text-muted-foreground hover:text-foreground transition">العربية</button>
                        </div>
                    </div>
                    {cols.map((c) => (
                        <div key={c.title}>
                            <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.title}</div>
                            <ul className="mt-4 space-y-2.5 text-sm">
                                {c.links.map((l) => (
                                    <li key={l}><a href="#" className="text-foreground/80 hover:text-foreground transition">{l}</a></li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="mt-12 pt-6 border-t border-border/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-muted-foreground">
                    <div>© {new Date().getFullYear()} ORICO. All rights reserved.</div>
                    <div className="flex items-center gap-2">
                        <Rocket className="w-3.5 h-3.5 text-accent" />
                        Turn ideas into successful businesses with AI.
                    </div>
                </div>
            </div>
        </footer>
    );
}