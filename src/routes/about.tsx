import { createFileRoute } from "@tanstack/react-router";

import { Page } from "@/components/Page";
import { SkillsRadar } from "@/components/SkillsRadar";
import { ToolsMarquee } from "@/components/ToolsMarquee";


export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Alamu Joseph, Security Engineer" },
      {
        name: "description",
        content:
          "Alamu Joseph: a Computer Science graduate focused on cybersecurity, platform security, product security, and AI security.",
      },
      { property: "og:title", content: "About — Alamu Joseph" },
      {
        property: "og:description",
        content:
          "Background and skills of a security engineer from Ibadan, Nigeria.",
      },

    ],
  }),
  component: About,
});

const DOMAINS = [
  {
    title: "Platform Security",
    note: "Securing cloud platforms, identities, networks, and workloads across modern infrastructure.",
  },
  {
    title: "Product Security",
    note: "Assessing web and mobile applications for vulnerabilities and delivering practical remediation guidance.",
  },
  {
    title: "AI Security",
    note: "Securing LLM implementations and applying AI-powered solutions to security operations.",
  },
];

const NOW = [
  "Completed a B.Sc. in Computer Science at Covenant University.",
  "Building skills through hands-on labs on TryHackMe and Hack The Box.",
  "Building proficiency across cloud security and AI security.",
  "Open to cybersecurity internships and junior analyst roles.",
];

function About() {
  return (
    <Page index="02" title="About" kicker="cat ./whoami.txt">
      <p className="quote-serif text-2xl leading-snug">
        I&apos;m Joseph, a recent Computer Science graduate focused on cybersecurity. I&apos;m passionate
        about technology and its potential to help people.
      </p>

      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Security engineer working across offensive and defensive operations: securing the software
        development lifecycle, conducting vulnerability assessments, strengthening organizational
        security posture, and maximizing shareholder value.
      </p>

      <section className="mt-12">
        <div className="label-mono mb-2 text-primary">// now</div>
        <div className="label-mono mb-5 text-muted-foreground">August 2026</div>
        <ul className="space-y-3.5">
          {NOW.map((item) => (
            <li key={item} className="flex gap-3">
              <span
                aria-hidden
                className="mt-[7px] size-[7px] shrink-0 rotate-45 border border-primary bg-primary/10"
              />
              <span className="text-sm leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="label-mono mb-4 text-primary">// focus areas</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {DOMAINS.map((d) => (
            <article
              key={d.title}
              className="group rounded-[14px] border border-border bg-card p-5 transition-all duration-300 hover:border-foreground hover:bg-foreground"
            >
              <h3 className="display-serif text-lg group-hover:text-background">{d.title}</h3>
              <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground group-hover:text-background/70">
                {d.note}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="label-mono mb-4 text-primary">// skills</h2>
        <SkillsRadar />
      </section>

      <section className="mt-14">
        <h2 className="label-mono mb-4 text-primary">// tools</h2>
        <ToolsMarquee />
      </section>
    </Page>
  );
}
