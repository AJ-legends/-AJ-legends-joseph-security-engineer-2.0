import { useCallback, useEffect, useRef, useState } from "react";

type Line = {
  text: string;
  tone?: "dim" | "ok" | "warn" | "grant";
  delay?: number;
  progress?: boolean;
};

const SEQUENCE: Line[] = [
  { text: "$ nc -lvnp 4444", tone: "dim", delay: 220 },
  { text: "[*] listening on 0.0.0.0:4444 ...", tone: "dim", delay: 520 },
  { text: "[+] connection from 102.89.41.17:51204", tone: "ok", delay: 420 },
  { text: "[*] negotiating handshake  ...  ok", tone: "dim", delay: 360 },
  { text: "[*] sending payload", progress: true, delay: 900 },
  { text: "[+] shell obtained — uid=0(root) gid=0(root)", tone: "ok", delay: 340 },
  { text: "$ whoami", tone: "dim", delay: 300 },
  { text: "> alamu_joseph :: security", tone: "ok", delay: 320 },
  { text: "[ ACCESS GRANTED ]", tone: "grant", delay: 420 },
];

const STORAGE_KEY = "aj_boot_done_v1";

function Bar({ pct }: { pct: number }) {
  const filled = Math.round((pct / 100) * 24);
  return (
    <span>
      {"█".repeat(filled)}
      <span className="text-muted-foreground">{"░".repeat(24 - filled)}</span>{" "}
      {String(pct).padStart(3, " ")}%
    </span>
  );
}

export function BootSequence({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [pct, setPct] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const finished = useRef(false);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setLeaving(true);
    window.setTimeout(onDone, 420);
  }, [onDone]);

  useEffect(() => {
    const skip = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") finish();
    };
    window.addEventListener("keydown", skip);
    return () => window.removeEventListener("keydown", skip);
  }, [finish]);

  useEffect(() => {
    if (step >= SEQUENCE.length) {
      const t = window.setTimeout(finish, 700);
      return () => window.clearTimeout(t);
    }
    const line = SEQUENCE[step];
    const t = window.setTimeout(() => setStep((s) => s + 1), line.delay ?? 300);
    return () => window.clearTimeout(t);
  }, [step, finish]);

  useEffect(() => {
    const payloadIndex = SEQUENCE.findIndex((l) => l.progress);
    if (step < payloadIndex) return;
    if (pct >= 100) return;
    const t = window.setTimeout(() => setPct((p) => Math.min(100, p + 7)), 45);
    return () => window.clearTimeout(t);
  }, [step, pct]);

  const visible = SEQUENCE.slice(0, Math.min(step + 1, SEQUENCE.length));

  return (
    <div
      className={`fixed inset-0 z-[100] bg-background transition-opacity duration-300 ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
    >
      <button
        onClick={finish}
        className="absolute right-4 top-4 z-10 border border-border px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
      >
        skip [esc]
      </button>

      <div className="flex h-full w-full items-center justify-center p-6">
        <div className="w-full max-w-2xl font-mono text-[13px] leading-relaxed sm:text-sm">
          <div className="mb-4 flex items-center gap-2 border-b border-border pb-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="inline-block size-2 bg-primary" />
            reverse shell — session 01
          </div>

          {visible.map((line, i) => {
            const isLast = i === visible.length - 1;
            const tone =
              line.tone === "ok"
                ? "text-primary"
                : line.tone === "grant"
                  ? "text-primary"
                  : line.tone === "warn"
                    ? "text-warn"
                    : "text-muted-foreground";

            if (line.progress) {
              return (
                <div key={i} className="whitespace-pre text-muted-foreground">
                  {line.text} <Bar pct={pct} />
                </div>
              );
            }

            if (line.tone === "grant") {
              return (
                <div
                  key={i}
                  className="mt-4 inline-block bg-primary px-3 py-1 font-mono text-sm font-bold tracking-[0.2em] text-primary-foreground"
                >
                  {line.text}
                </div>
              );
            }

            return (
              <div key={i} className={`${tone} ${isLast ? "caret" : ""}`}>
                {line.text}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function shouldPlayBoot() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) !== "1";
  } catch {
    return false;
  }
}
