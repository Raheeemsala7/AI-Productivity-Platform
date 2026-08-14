import type { ReactNode } from "react";

type ShimmerProps = {
  children: ReactNode;
};

export default function Shimmer({ children }: ShimmerProps) {
  return (
    <span
      className="animate-[shimmer_1.6s_linear_infinite] bg-[length:200%_100%] bg-clip-text text-transparent"
      style={{
        backgroundImage:
          "linear-gradient(90deg, var(--muted-foreground) 0%, var(--muted-foreground) 35%, var(--brand) 50%, var(--muted-foreground) 65%, var(--muted-foreground) 100%)",
      }}
    >
      {children}
    </span>
  );
}
