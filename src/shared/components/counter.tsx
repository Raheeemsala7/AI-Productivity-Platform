import { useEffect, useRef, useState } from "react";

export function Counter({ target, divisor, suffix, label }: { target: number; divisor: number; suffix: string; label: string }) {
    const [n, setN] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const [started, setStarted] = useState(false);
    useEffect(() => {
        if (!ref.current) return;
        const io = new IntersectionObserver((ents) => {
            if (ents[0].isIntersecting) setStarted(true);
        });
        io.observe(ref.current);
        return () => io.disconnect();
    }, []);
    useEffect(() => {
        if (!started) return;
        const dur = 1400;
        const start = performance.now();
        let raf = 0;
        const tick = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.floor(target * eased));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [started, target]);
    return (
        <div ref={ref}>
            <div className="text-4xl md:text-5xl font-semibold tracking-tight text-gradient-brand">
                {Math.floor(n / divisor).toLocaleString()}
                {suffix}
            </div>
            <div className="mt-2 text-sm text-muted-foreground">{label}</div>
        </div>
    );
}