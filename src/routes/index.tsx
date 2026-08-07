import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

import { profile } from "@/lib/profile";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alamu Joseph — Attack. Defend. Automate." },
      {
        name: "description",
        content:
          "Alamu Joseph is an aspiring cybersecurity analyst and Python developer. Firewalls, packet sniffers, and an AI terminal you can interrogate.",
      },
      { property: "og:title", content: "Alamu Joseph — Attack. Defend. Automate." },
      {
        property: "og:description",
        content:
          "Cybersecurity portfolio: Python security tooling, ISC2 CC certified, First Class Computer Science undergraduate.",
      },
    ],
  }),
  component: Index,
});

function VerbCycle() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => setI((v) => (v + 1) % profile.verbs.length), 2200);
    return () => window.clearInterval(t);
  }, []);

  return (
    <span className="relative inline-block h-[0.9em] overflow-hidden align-bottom">
      <span className="invisible">AUTOMATE</span>
      {profile.verbs.map((verb, idx) => (
        <span
          key={verb}
          className="absolute inset-x-0 top-0 text-primary transition-all duration-500"
          style={{
            transform: `translateY(${(idx - i) * 100}%)`,
            opacity: idx === i ? 1 : 0,
          }}
        >
          {verb}
        </span>
      ))}
    </span>
  );
}

function Index() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
      <div className="label-mono text-primary">// uid=0(root) — session active</div>

      <div className="mt-6 grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div>
          <h1 className="headline text-[15vw] leading-[0.82] sm:text-[8.5rem] lg:text-[7rem]">
            <span className="block">
              I <VerbCycle />
            </span>
            <span className="block">networks</span>
          </h1>

          <p className="quote-serif mt-8 max-w-xl text-2xl text-foreground">
            &ldquo;Break it in a lab, so nobody breaks it in production.&rdquo;
          </p>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {profile.bio}
          </p>
        </div>

        <TerminalWindow />
      </div>


      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 rounded-[10px] bg-primary px-5 py-3 text-xs uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-80"
        >
          view tooling <ArrowRight className="size-3.5" />
        </Link>
        <Link
          to="/playground"
          className="inline-flex items-center gap-2 rounded-[10px] border border-border px-5 py-3 text-xs uppercase tracking-[0.18em] transition-colors hover:border-primary hover:text-primary"
        >
          $ query the terminal
        </Link>
      </div>

      <dl className="mt-20 grid grid-cols-2 border-l border-t border-border sm:grid-cols-4">
        {profile.stats.map((stat) => (
          <div key={stat.label} className="border-b border-r border-border p-4">
            <dt className="headline text-3xl text-primary">{stat.value}</dt>
            <dd className="label-mono mt-2 leading-relaxed">{stat.label}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
