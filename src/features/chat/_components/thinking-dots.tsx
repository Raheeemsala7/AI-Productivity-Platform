"use client";

import { useEffect, useState } from "react";

export default function ThinkingDots() {
  const [dots, setDots] = useState(1);

  useEffect(() => {
    const id = window.setInterval(() => {
      setDots((current) => (current % 3) + 1);
    }, 450);

    return () => window.clearInterval(id);
  }, []);

  return <span>{".".repeat(dots)}</span>;
}