import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Copy, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

import avatar from "@/assets/hacker-avatar.png";
import { profile } from "@/lib/profile";

const ROLE_INTERVAL_MS = 5000;

function DetailRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}) {
  const [copied, setCopied] = useState(false);
  const isEmail = label === "EMAIL";

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
    <div className="flex items-center gap-3 py-2.5">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-[12px] bg-secondary text-primary">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="label-mono text-[10px]">{label}</div>
        {href ? (
          isEmail ? (
            <div className="sidebar-email-window">
              <a
                href={href}
                className="sidebar-email-scroll text-[13px] text-foreground transition-colors hover:text-primary"
              >
                {value}
              </a>
            </div>
          ) : (
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="block whitespace-nowrap text-[12px] tracking-[-0.06em] text-foreground transition-colors hover:text-primary"
            >
              {value}
            </a>
          )
        ) : (
          <span className="block truncate text-[13px] text-foreground">{value}</span>
        )}
      </div>
      <button
        onClick={copy}
        aria-label={`Copy ${label}`}
        className="shrink-0 text-muted-foreground transition-colors hover:text-primary"
      >
        {copied ? <Check className="size-3.5 text-primary" /> : <Copy className="size-3.5" />}
      </button>
    </div>
  );
}

export function ProfileCard() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setRoleIndex((i) => (i + 1) % profile.titles.length);
    }, ROLE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  const currentRole = profile.titles[roleIndex];
  const isCloud = currentRole === "Cloud Engineer";

  return (
    <div className="rounded-[22px] border border-border bg-card p-6">
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <Link to="/" className="block">
            <img
              src={avatar}
              alt="Hooded terminal glyph avatar for Alamu Joseph"
              width={816}
              height={816}
              className="size-28 rounded-[18px] bg-surface object-cover"
            />
          </Link>
          <span className="absolute -bottom-1 -right-1 size-3.5 rounded-full border-2 border-card bg-primary" />
        </div>

        <h2 className="headline mt-5 text-3xl">Alamu Joseph</h2>
        <span
          className={`profile-role mt-3 ${isCloud ? "is-cloud" : ""} ${
            isCloud
              ? "bg-foreground text-background"
              : "border border-chip-border bg-chip text-chip-foreground"
          }`}
        >
          {profile.titles.map((role, index) => (
            <span
              key={role}
              aria-hidden={index !== roleIndex}
              className={`profile-role-label ${index === 0 ? "is-security" : "is-cloud"}`}
            >
              {role}
            </span>
          ))}
        </span>
      </div>

      <div className="mt-6 border-t border-border pt-2">
        <DetailRow icon={Mail} label="EMAIL" value={profile.email} href={`mailto:${profile.email}`} />
        <DetailRow icon={Phone} label="PHONE" value={profile.phone} href={`tel:${profile.phoneHref}`} />
        <DetailRow icon={MapPin} label="LOCATION" value={profile.location} />
      </div>

      <div className="mt-4 flex justify-center gap-3 border-t border-border pt-4">
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="flex size-9 items-center justify-center rounded-[10px] border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <Linkedin className="size-4" />
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="flex size-9 items-center justify-center rounded-[10px] border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <Github className="size-4" />
        </a>
      </div>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="fixed bottom-0 left-0 top-[61px] z-40 hidden w-[300px] overflow-hidden border-r border-border p-5 lg:block">
      <ProfileCard />
    </aside>
  );
}
