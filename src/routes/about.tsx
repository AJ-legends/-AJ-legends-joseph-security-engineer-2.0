import { createFileRoute } from "@tanstack/react-router";

import { Page } from "@/components/Page";
import { SkillsRadar } from "@/components/SkillsRadar";
import { pageHead } from "@/lib/site";


export const Route = createFileRoute("/about")({
  head: () =>
    pageHead(
      "/about",
      "About — Alamu Joseph, Security Engineer",
      "Alamu Joseph: Computer Science undergraduate at Covenant University (CGPA 4.93) working in VAPT, AWS and applied cryptography — plus a breakdown of his security skill set.",
    ),
  component: About,
});

const DOMAINS = [
  {
    title: "Cloud Security",
    note: "Securing AWS workloads — IAM boundaries, network segmentation, hardened Linux hosts.",
  },
  {
    title: "Application Security",
    note: "Testing web and system applications for flaws, then writing the fix and the report.",
  },
  {
    title: "AI Security",
    note: "Researching how AI systems fail and how to use them safely inside security workflows.",
  },
];

const NOW = [
  "Finishing my B.Sc. in Computer Science at Covenant University (graduating 2026).",
  "Running VAPT in lab environments with Nmap, Metasploit and Burp Suite.",
  "Building proficiency across cloud security and AI security.",
  "Open to cybersecurity internships and junior analyst roles.",
];

function About() {
  return (
    <Page index="02" title="About" kicker="cat ./whoami.txt">
      <p className="quote-serif text-2xl leading-snug">
        I&apos;m Joseph — a final-year Computer Science student who spends most of his time between
        lecture notes, lab VMs, and trying to break things before someone else does.
      </p>

      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Security engineer working across offensive and defensive work: assessments in the lab,
        hardening in production, and Python for everything repetitive.
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
    </Page>
  );
}
