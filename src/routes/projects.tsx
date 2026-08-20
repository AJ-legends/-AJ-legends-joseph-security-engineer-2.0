import { createFileRoute } from "@tanstack/react-router";

import { Page } from "@/components/Page";
import { profile } from "@/lib/profile";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Builds — Security Projects | Alamu Joseph" },
      {
        name: "description",
        content:
          "Security projects by Alamu Joseph: a homomorphically encrypted student information system, a Windows VM penetration test, a research keylogger, a Python firewall and a packet sniffer.",
      },
      { property: "og:title", content: "Builds — Alamu Joseph" },
      {
        property: "og:description",
        content: "Encrypted student information system, Windows VM pentest, research keylogger.",
      },
    ],
  }),
  component: Projects,
});

function Projects() {
  return (
    <Page index="04" title="Builds" kicker="ls ./projects">
      <p className="mb-10 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        These write-ups are text-first by design. Most of the work here lives in infrastructure,
        cryptography and backend logic rather than in an interface, so the clearest way to show it
        is through what it does and the output it produces.
      </p>

      <div className="space-y-8">
        {profile.projects.map((project, i) => (
          <article key={project.slug} className="overflow-hidden rounded-[18px] border border-border bg-card">
            <header className="flex items-center gap-2 border-b border-border px-4 py-2.5">
              <span className="inline-block size-2 rounded-full bg-primary" />
              <span className="truncate font-mono text-[11px] text-muted-foreground">
                {project.cmd}
              </span>
              <span className="ml-auto text-[10px] text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
            </header>

            <div className="p-5">
              <h2 className="headline text-3xl">{project.name}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              <ul className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-border px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    {tag}
                  </li>
                ))}
              </ul>

              <pre className="mt-5 overflow-x-auto rounded-[12px] bg-terminal p-4 text-[11px] leading-relaxed text-terminal-muted">
                {project.log.map((line) => (
                  <div key={line} className={line.startsWith("[!]") ? "text-warn" : line.startsWith("[+]") ? "text-terminal-accent" : undefined}>
                    {line}
                  </div>
                ))}
              </pre>
            </div>
          </article>
        ))}
      </div>
    </Page>
  );
}
