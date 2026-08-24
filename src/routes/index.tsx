import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { profile } from "@/lib/profile";
import { TerminalWindow } from "@/components/TerminalWindow";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alamu Joseph — Security Engineer & Cloud Engineer" },
      {
        name: "description",
        content:
          "Alamu Joseph is a security engineer and cloud engineer. Penetration testing, AWS infrastructure, applied cryptography, and an AI terminal you can interrogate.",
      },
      { property: "og:title", content: "Alamu Joseph — Security Engineer & Cloud Engineer" },
      {
        property: "og:description",
        content:
          "Cybersecurity portfolio: VAPT with Nmap and Metasploit, AWS infrastructure, homomorphic encryption, CGPA 4.93 Computer Science undergraduate.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
      <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div>
          <div className="label-mono text-muted-foreground">{profile.name}</div>

          <h1 className="mt-4">
            <span className="display-serif block text-[13vw] leading-[0.95] sm:text-[5.5rem] lg:text-[4.75rem]">
              {profile.titles[0]}
            </span>
            <span className="display-serif block text-[10vw] leading-[1.05] text-muted-foreground sm:text-[4rem] lg:text-[3.4rem]">
              {profile.titles[1]}
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {profile.intro}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
            <span className="mr-1 text-primary">$ focus:</span>
            {profile.focus.map((item) => (
              <span key={item} className="micro-tag">
                {item}
              </span>
            ))}
          </div>

          <blockquote className="mt-8 border-l-2 border-primary pl-4">
            <p className="quote-serif text-lg leading-relaxed text-foreground">{profile.quote}</p>
          </blockquote>

          <div className="mt-9 flex flex-wrap items-center gap-6">
            <Link
              to="/work"
              className="group inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm transition-colors hover:border-primary hover:text-primary"
            >
              Work <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 border-b border-transparent pb-1 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Projects <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/terminal"
              className="group inline-flex items-center gap-2 border-b border-transparent pb-1 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Terminal <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <TerminalWindow />
      </div>
    </div>
  );
}
