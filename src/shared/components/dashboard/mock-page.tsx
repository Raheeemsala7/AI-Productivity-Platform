export default function MockPage({ title }: { title: string }) {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-muted-foreground">{title}</h1>
        <p className="text-sm text-muted-foreground mt-2">This page is under construction or mocked for demonstration.</p>
      </div>
    </div>
  )
}
