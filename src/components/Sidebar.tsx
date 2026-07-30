import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Copy, Download, Menu, X } from "lucide-react";

import avatar from "@/assets/hacker-avatar.png";
import resume from "@/assets/resume.pdf.asset.json";
import { profile } from "@/lib/profile";

const NAV = [
  { to: "/", label: "home", idx: "01" },
  { to: "/about", label: "about", idx: "02" },
  { to: "/projects", label: "projects", idx: "03" },
  { to: "/certifications", label: "certs", idx: "04" },
  { to: "/playground", label: "playground", idx: "05" },
  { to: "/contact", label: "contact", idx: "06" },
] as const;

function CopyRow({ label, value, href }: { label: string; value: string; href?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="group border-t border-border py-2.5">
      <div className="label-mono mb-1">{label}</div>
      <div className="flex items-start justify-between gap-2">
        {href ? (
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="break-all text-xs text-foreground transition-colors hover:text-primary"
          >
            {value}
          </a>
        ) : (
          <span className="break-all text-xs text-foreground">{value}</span>
        )}
        <button
          onClick={copy}
          aria-label={`Copy ${label}`}
          className="mt-0.5 shrink-0 text-muted-foreground transition-colors hover:text-primary"
        >
          {copied ? <Check className="size-3.5 text-primary" /> : <Copy className="size-3.5" />}
        </button>
      </div>
      {copied && <div className="mt-1 text-[10px] text-primary">$ copied to clipboard</div>}
    </div>
  );
}

function SidebarBody({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col justify-between gap-8 overflow-y-auto p-6">
      <div>
        <Link to="/" onClick={onNavigate} className="block">
          <img
            src={avatar}
            alt="Hooded terminal glyph avatar for Alamu Joseph"
            width={816}
            height={816}
            className="size-20 border border-border"
          />
        </Link>

        <h2 className="headline mt-4 text-3xl text-foreground">
          Alamu
          <br />
          Joseph
        </h2>
        <p className="label-mono mt-2">{profile.role}</p>
        <p className="mt-3 flex items-center gap-2 text-[11px] text-primary">
          <span className="inline-block size-1.5 animate-pulse bg-primary" />
          // available for internships
        </p>

        <nav className="mt-8">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-primary border-primary" }}
              inactiveProps={{ className: "text-foreground border-transparent" }}
              className="flex items-center gap-3 border-l-2 py-1.5 pl-3 text-sm transition-colors hover:text-primary"
            >
              <span className="text-[10px] text-muted-foreground">{item.idx}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div>
        <div className="label-mono mb-1 text-primary">// contact</div>
        <CopyRow label="email" value={profile.email} href={`mailto:${profile.email}`} />
        <CopyRow label="phone" value={profile.phone} href={`tel:${profile.phoneHref}`} />
        <CopyRow label="linkedin" value="alamu-joseph" href={profile.linkedin} />
        <CopyRow label="location" value={profile.location} />

        <a
          href={resume.url}
          download="Alamu-Joseph-Resume.pdf"
          className="mt-4 flex items-center justify-between border border-border px-3 py-2 text-xs uppercase tracking-[0.14em] transition-colors hover:border-primary hover:text-primary"
        >
          resume.pdf
          <Download className="size-3.5" />
        </a>
      </div>
    </div>
  );
}

export function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop rail */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[280px] border-r border-border bg-background lg:block">
        <SidebarBody />
      </aside>

      {/* Mobile bar */}
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-border bg-background px-4 py-3 lg:hidden">
        <Link to="/" className="flex items-center gap-2">
          <img src={avatar} alt="" width={816} height={816} className="size-7 border border-border" />
          <span className="headline text-xl">Alamu Joseph</span>
        </Link>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="text-primary"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 top-[53px] z-40 bg-background lg:hidden">
          <SidebarBody onNavigate={() => setOpen(false)} />
        </div>
      )}
    </>
  );
}
