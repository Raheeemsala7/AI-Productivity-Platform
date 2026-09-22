import { Brand } from "./brand";

const cols: Record<string, [string, string][]> = {
  Product: [
    ["AI Chat", "#product"],
    ["AI Editor", "#product"],
    ["Templates", "#templates"],
    ["Presentations", "#tools"],
    ["Image", "#tools"],
    ["Audio", "#tools"],
    ["Video", "#tools"],
  ],
  Company: [
    ["About", "#"],
    ["Contact", "#"],
    ["Careers", "#"],
  ],
  Resources: [
    ["Documentation", "#"],
    ["Help Center", "#"],
    ["Blog", "#"],
  ],
  Legal: [
    ["Privacy", "#"],
    ["Terms", "#"],
  ],
};

export function SiteFooter() {
  return (
    <footer className="bg-background px-5 pb-8 pt-20 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-14 border-b border-border pb-16 md:grid-cols-[1.5fr_repeat(4,1fr)]">
          <div>
            <Brand />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              One intelligent workspace for creating almost anything.
            </p>
          </div>
          {Object.entries(cols).map(([title, items]) => (
            <div key={title}>
              <h3 className="text-xs font-semibold uppercase tracking-[.16em]">
                {title}
              </h3>
              <ul className="mt-5 space-y-3">
                {items.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-muted-foreground transition-colors hover:text-brand"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 pt-7 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} ORICO Creative Systems.</span>
          <div className="flex gap-6">
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-brand"
            >
              X
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-brand"
            >
              LinkedIn
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-brand"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
