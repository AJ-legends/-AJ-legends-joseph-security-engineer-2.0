import { useEffect, useRef, useState } from "react";

type Line = { prompt?: string; text: string };

const SCRIPT: Line[] = [
  { prompt: "$", text: "whoami" },
  { text: "alamu_joseph" },
  { prompt: "$", text: "cat role.txt" },
  { text: "Security Engineer, Pentester" },
  { prompt: "$", text: "./init_portfolio.sh" },
  { text: "Ready." },
];

const TYPE_MS = 45;
const LINE_PAUSE = 420;
const LOOP_PAUSE = 3200;

export function TerminalWindow() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setLineIndex(SCRIPT.length);
      return;
    }

    if (lineIndex >= SCRIPT.length) {
      timer.current = window.setTimeout(() => {
        setLineIndex(0);
        setCharCount(0);
      }, LOOP_PAUSE);
      return () => {
        if (timer.current) window.clearTimeout(timer.current);
      };
    }

    const current = SCRIPT[lineIndex];
    const isCommand = Boolean(current.prompt);

    if (charCount < current.text.length) {
      timer.current = window.setTimeout(
        () => setCharCount((c) => c + 1),
        isCommand ? TYPE_MS : 12,
      );
    } else {
      timer.current = window.setTimeout(() => {
        setLineIndex((i) => i + 1);
        setCharCount(0);
      }, LINE_PAUSE);
    }

    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [lineIndex, charCount]);

  const rendered = SCRIPT.slice(0, lineIndex);
  const active = lineIndex < SCRIPT.length ? SCRIPT[lineIndex] : null;

  return (
    <div className="w-full overflow-hidden rounded-[14px] border border-border bg-terminal shadow-[0_18px_40px_-24px_rgba(0,0,0,0.55)]">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px] text-terminal-muted">zsh</span>
      </div>

      <div className="min-h-[220px] space-y-2.5 p-5 font-mono text-[13px] leading-relaxed">
        {rendered.map((line, i) => (
          <p key={i} className={line.prompt ? "text-terminal-accent" : "text-terminal-muted"}>
            {line.prompt ? <span className="mr-2 text-terminal-foreground">{line.prompt}</span> : null}
            {line.text}
          </p>
        ))}
        {active ? (
          <p className={active.prompt ? "text-terminal-accent" : "text-terminal-muted"}>
            {active.prompt ? (
              <span className="mr-2 text-terminal-foreground">{active.prompt}</span>
            ) : null}
            <span className="caret-term">{active.text.slice(0, charCount)}</span>
          </p>
        ) : null}
      </div>
    </div>
  );
}
