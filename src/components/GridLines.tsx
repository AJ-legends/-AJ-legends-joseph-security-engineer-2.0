export function GridLines() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="mx-auto flex h-full max-w-[1600px] justify-between px-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-full w-px bg-grid" />
        ))}
      </div>
      <div className="absolute inset-0 flex flex-col justify-between">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-px w-full bg-grid" />
        ))}
      </div>
    </div>
  );
}
