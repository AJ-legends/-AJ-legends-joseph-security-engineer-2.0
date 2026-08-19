import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

export const PAGE_ORDER = [
  "/",
  "/about",
  "/work",
  "/projects",
  "/terminal",
  "/contact",
] as const;

const LABELS: Record<string, string> = {
  "/": "Home",
  "/about": "About",
  "/work": "Work",
  "/projects": "Projects",
  "/terminal": "Terminal",
  "/contact": "Contact",
};

const HINT = 40;
const THRESHOLD = 340;
const COOLDOWN = 900;

export function ScrollChain() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [leaving, setLeaving] = useState(false);
  const [hint, setHint] = useState<{ dir: "next" | "prev"; target: string; pct: number } | null>(
    null,
  );
  const accum = useRef(0);
  const locked = useRef(false);

  useEffect(() => {
    setLeaving(false);
    setHint(null);
    accum.current = 0;
    locked.current = true;
    const t = window.setTimeout(() => {
      locked.current = false;
    }, COOLDOWN);
    return () => window.clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const go = (target: string) => {
      locked.current = true;
      accum.current = 0;
      setLeaving(true);
      window.dispatchEvent(new CustomEvent("page-chain-nav"));
      window.setTimeout(() => {
        void navigate({ to: target });
        window.scrollTo({ top: 0 });
      }, 340);
    };

    const onWheel = (e: WheelEvent) => {
      if (locked.current) return;

      const el = e.target as HTMLElement | null;
      if (el?.closest("[data-scroll-lock]")) return;

      const index = PAGE_ORDER.indexOf(pathname as (typeof PAGE_ORDER)[number]);
      if (index === -1) return;

      const doc = document.documentElement;
      const atBottom = window.scrollY + window.innerHeight >= doc.scrollHeight - 2;
      const atTop = window.scrollY <= 2;

      if (e.deltaY > 0 && atBottom && index < PAGE_ORDER.length - 1) {
        accum.current = Math.max(0, accum.current) + e.deltaY;
        const target = PAGE_ORDER[index + 1];
        if (accum.current > THRESHOLD) return go(target);
        if (accum.current > HINT) {
          setHint({
            dir: "next",
            target,
            pct: Math.min(1, (accum.current - HINT) / (THRESHOLD - HINT)),
          });
        }
      } else if (e.deltaY < 0 && atTop && index > 0) {
        accum.current = Math.min(0, accum.current) + e.deltaY;
        const target = PAGE_ORDER[index - 1];
        if (accum.current < -THRESHOLD) return go(target);
        if (accum.current < -HINT) {
          setHint({
            dir: "prev",
            target,
            pct: Math.min(1, (-accum.current - HINT) / (THRESHOLD - HINT)),
          });
        }
      } else {
        accum.current = 0;
        setHint(null);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [pathname, navigate]);

  return (
    <>
      <div
        className={`pointer-events-none fixed inset-x-0 z-[55] flex justify-center transition-all duration-300 ${
          hint ? "opacity-100" : "opacity-0"
        } ${hint?.dir === "prev" ? "top-24" : "bottom-8"}`}
      >
        <div className="flex items-center gap-3 rounded-full border border-border bg-card/90 px-4 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.10)] backdrop-blur-md">
          <span
            className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground"
            style={{ transform: `translateY(${(hint?.pct ?? 0) * (hint?.dir === "prev" ? -4 : 4)}px)` }}
          >
            {hint?.dir === "prev" ? <ArrowUp className="size-3.5" /> : <ArrowDown className="size-3.5" />}
          </span>
          <span className="label-mono text-foreground">
            keep scrolling — {LABELS[hint?.target ?? "/"] ?? ""}
          </span>
          <span className="h-1 w-16 overflow-hidden rounded-full bg-secondary">
            <span
              className="block h-full rounded-full bg-primary transition-[width] duration-150"
              style={{ width: `${(hint?.pct ?? 0) * 100}%` }}
            />
          </span>
        </div>
      </div>

      <div
        aria-hidden
        className={`pointer-events-none fixed inset-0 z-[60] bg-background transition-opacity duration-300 ${
          leaving ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}
