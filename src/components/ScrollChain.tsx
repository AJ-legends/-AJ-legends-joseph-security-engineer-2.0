import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const PAGE_ORDER = [
  "/",
  "/about",
  "/work",
  "/projects",
  "/terminal",
  "/contact",
] as const;

const THRESHOLD = 260;
const COOLDOWN = 900;

export function ScrollChain() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [leaving, setLeaving] = useState(false);
  const accum = useRef(0);
  const locked = useRef(false);

  useEffect(() => {
    setLeaving(false);
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
      window.setTimeout(() => {
        void navigate({ to: target });
        window.scrollTo({ top: 0 });
      }, 320);
    };

    const onWheel = (e: WheelEvent) => {
      if (locked.current) return;

      const target = e.target as HTMLElement | null;
      if (target?.closest("[data-scroll-lock]")) return;

      const index = PAGE_ORDER.indexOf(pathname as (typeof PAGE_ORDER)[number]);
      if (index === -1) return;

      const doc = document.documentElement;
      const atBottom = window.scrollY + window.innerHeight >= doc.scrollHeight - 2;
      const atTop = window.scrollY <= 2;

      if (e.deltaY > 0 && atBottom && index < PAGE_ORDER.length - 1) {
        accum.current = Math.max(0, accum.current) + e.deltaY;
        if (accum.current > THRESHOLD) go(PAGE_ORDER[index + 1]);
      } else if (e.deltaY < 0 && atTop && index > 0) {
        accum.current = Math.min(0, accum.current) + e.deltaY;
        if (accum.current < -THRESHOLD) go(PAGE_ORDER[index - 1]);
      } else {
        accum.current = 0;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [pathname, navigate]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-[60] bg-background transition-opacity duration-300 ${
        leaving ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
