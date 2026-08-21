import type { ReactNode } from "react";

/**
 * Wraps the given terms found in `text` with a soft marker highlight.
 * Purely presentational — used to draw the eye to key phrases.
 */
export function Highlight({ text, terms }: { text: string; terms: string[] }) {
  const escaped = terms
    .filter(Boolean)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .sort((a, b) => b.length - a.length);

  if (escaped.length === 0) return <>{text}</>;

  const parts = text.split(new RegExp(`(${escaped.join("|")})`, "gi"));
  const lower = terms.map((t) => t.toLowerCase());

  return (
    <>
      {parts.map((part, i): ReactNode =>
        lower.includes(part.toLowerCase()) ? (
          <span key={`${part}-${i}`} className="hl">
            {part}
          </span>
        ) : (
          <span key={`${part}-${i}`}>{part}</span>
        ),
      )}
    </>
  );
}
