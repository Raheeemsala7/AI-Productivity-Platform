import React from "react";

export default function MockPage({ title }: { title: string }) {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      <p className="text-muted-foreground">This section is currently under development.</p>
    </div>
  );
}
