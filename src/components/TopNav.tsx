import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";

import resume from "@/assets/resume.pdf.asset.json";

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/certifications", label: "Certs" },
  { to: "/playground", label: "Playground" },
  { to: "/contact", label: "Contact" },
] as const;

export function TopNav() {
  const [open, setOpen] = useState(false);
  const [floating, setFloating] = useState(false);

  useEffect(() => {
    const onScroll = () => setFloating(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        floating
          ? "border-b border-transparent bg-transparent px-3 pt-3"
          : "border-b border-border bg-background/90 backdrop-blur"
      }`}
    >
      <div
        className={`relative mx-auto flex items-center transition-all duration-300 ${
          floating
            ? "w-fit max-w-[1180px] justify-center gap-3 rounded-[16px] border border-border bg-card/85 px-4 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md"
            : "w-[92%] max-w-[1400px] justify-between py-3.5"
        }`}
      >
        {!floating && (
          <Link to="/" className="headline text-2xl leading-none tracking-tight">
            Joseph<span className="text-primary">.</span>
          </Link>
        )}

        <div
          className={`hidden items-center overflow-hidden rounded-[10px] border border-border bg-card shadow-[0_2px_12px_rgba(0,0,0,0.06)] lg:flex ${
            floating ? "" : "absolute left-1/2 -translate-x-1/2"
          }`}
        >
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "bg-secondary text-secondary-foreground" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
              className="px-4 py-2 text-[13px] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>


        <div className="flex items-center gap-2">
          <a
            href={resume.url}
            download="Alamu-Joseph-Resume.pdf"
            className="hidden items-center gap-2 rounded-[10px] bg-primary px-4 py-2 text-[12px] uppercase tracking-[0.12em] text-primary-foreground transition-opacity hover:opacity-85 sm:inline-flex"
          >
            Resume <Download className="size-3.5" />
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-[10px] border border-border p-2 text-foreground lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex w-[92%] max-w-[1400px] flex-col py-2">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-primary" }}
                inactiveProps={{ className: "text-foreground" }}
                className="py-2.5 text-sm"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
