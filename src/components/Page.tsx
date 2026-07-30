import type { ReactNode } from "react";

export function Page({
  index,
  title,
  kicker,
  children,
}: {
  index: string;
  title: string;
  kicker?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:py-24">
      <div className="label-mono mb-3 text-primary">
        {index} // {kicker ?? title}
      </div>
      <h1 className="headline text-5xl sm:text-7xl">{title}</h1>
      <div className="mt-10 border-t border-border pt-10">{children}</div>
    </div>
  );
}
