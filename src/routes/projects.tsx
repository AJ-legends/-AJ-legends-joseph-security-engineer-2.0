import { createFileRoute } from "@tanstack/react-router";

import { Page } from "@/components/Page";
import { profile } from "@/lib/profile";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Security Tooling — Alamu Joseph" },
      {
        name: "description",
        content:
          "Python security projects by Alamu Joseph: a packet-filtering mini firewall, a research keylogger, and a packet sniffer with deep packet inspection.",
      },
      { property: "og:title", content: "Security Tooling — Alamu Joseph" },
      {
        property: "og:description",
        content: "Three Python security tools: mini firewall, research keylogger, packet sniffer.",
      },
    ],
  }),
  component: Projects,
});

function Projects() {
  return (
    <Page index="03" title="Tooling" kicker="ls ./projects">
      <div className="space-y-8">
        {profile.projects.map((project, i) => (
          <article key={project.slug} className="border border-border bg-surface">
            <header className="flex items-center gap-2 border-b border-border px-4 py-2.5">
              <span className="inline-block size-2 bg-primary" />
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
                  <li key={tag} className="border border-border px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    {tag}
                  </li>
                ))}
              </ul>

              <pre className="mt-5 overflow-x-auto border border-border bg-background p-4 text-[11px] leading-relaxed text-muted-foreground">
                {project.log.map((line) => (
                  <div key={line} className={line.startsWith("[!]") ? "text-warn" : line.startsWith("[+]") ? "text-primary" : undefined}>
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
