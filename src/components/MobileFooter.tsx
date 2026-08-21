import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

import avatar from "@/assets/hacker-avatar.png";
import { profile } from "@/lib/profile";

/**
 * Compact contact footer shown only below the `lg` breakpoint, where the
 * fixed sidebar is hidden. Mirrors the sidebar's details.
 */
export function MobileFooter() {
  const rows = [
    { icon: Mail, label: "EMAIL", value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: "PHONE", value: profile.phone, href: `tel:${profile.phoneHref}` },
    { icon: MapPin, label: "LOCATION", value: profile.location, href: undefined },
  ];

  return (
    <footer className="border-t border-border bg-surface px-6 py-10 lg:hidden">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={avatar}
              alt="Hooded terminal glyph avatar for Alamu Joseph"
              width={816}
              height={816}
              className="size-14 rounded-[14px] bg-card object-cover"
            />
            <span className="absolute -bottom-1 -right-1 size-3 rounded-full border-2 border-surface bg-primary" />
          </div>
          <div className="min-w-0">
            <h2 className="headline text-2xl">{profile.name}</h2>
            <span className="chip mt-1.5">{profile.role}</span>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {rows.map(({ icon: Icon, label, value, href }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-[12px] border border-border bg-card px-3 py-2.5"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-chip text-foreground">
                <Icon className="size-3.5" />
              </span>
              <div className="min-w-0">
                <div className="label-mono text-[10px]">{label}</div>
                {href ? (
                  <a href={href} className="block truncate text-[12px] hover:underline">
                    {value}
                  </a>
                ) : (
                  <span className="block truncate text-[12px]">{value}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-5">
          <span className="label-mono text-[10px]">
            © {new Date().getFullYear()} {profile.name}
          </span>
          <div className="flex gap-2.5">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex size-9 items-center justify-center rounded-[10px] border border-border bg-card text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
            >
              <Linkedin className="size-4" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex size-9 items-center justify-center rounded-[10px] border border-border bg-card text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
            >
              <Github className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
