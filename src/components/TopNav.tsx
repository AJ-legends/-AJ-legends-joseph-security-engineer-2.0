import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";

import resume from "@/assets/resume.pdf.asset.json";

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/work", label: "Work" },
  { to: "/projects", label: "Projects" },
  { to: "/terminal", label: "Terminal" },
  { to: "/contact", label: "Contact" },
] as const;

export function TopNav() {
  const [floating, setFloating] = useState(false);
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const onScroll = () => setFloating(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const onChain = () => setPinned(true);
    window.addEventListener("page-chain-nav", onChain);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("page-chain-nav", onChain);
    };
  }, []);

  const docked = floating || pinned;

  const resumeLink = (
    <a
      href={resume.url}
      download="Alamu-Joseph-Resume.pdf"
      className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-[10px] bg-primary px-4 py-2 text-[12px] uppercase tracking-[0.12em] text-primary-foreground transition-opacity hover:opacity-85"
    >
      Resume <Download className="size-3.5" />
    </a>
  );

  return (
    <nav className="sticky top-0 z-50 px-3 pt-3">
      <div
        className={`mx-auto flex items-center transition-[width,padding,background-color,border-color,box-shadow,gap] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          docked
            ? "w-fit gap-0 rounded-[16px] border border-border bg-card/85 px-2 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md"
            : "w-[min(1400px,96%)] gap-4 rounded-[16px] border border-transparent bg-transparent px-0 py-2 shadow-none"
        }`}
      >
        {/* Brand — collapses smoothly instead of unmounting */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            docked ? "max-w-0 opacity-0" : "max-w-[220px] opacity-100"
          }`}
        >
          <Link
            to="/"
            onClick={() => setPinned(false)}
            className="headline whitespace-nowrap pr-4 text-2xl leading-none tracking-tight"
          >
            Joseph<span className="text-primary">.</span>
          </Link>
        </div>

        <div className={`hidden flex-1 lg:flex ${docked ? "justify-center" : "justify-center"}`}>
          <div className="flex items-center overflow-hidden rounded-[10px] border border-border bg-card shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
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
        </div>

        {/* Resume — expands out of the Contact end when docked */}
        <div
          className={`hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:block ${
            docked ? "max-w-[180px] pl-2 opacity-100" : "max-w-[180px] pl-0 opacity-100"
          }`}
        >
          {resumeLink}
        </div>

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          {resumeLink}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-[10px] border border-border p-2 text-foreground"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mx-auto mt-2 w-[min(1400px,96%)] rounded-[14px] border border-border bg-card lg:hidden">
          <div className="flex flex-col px-4 py-2">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => {
                  setOpen(false);
                  setPinned(false);
                }}
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
