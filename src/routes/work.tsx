import { createFileRoute } from "@tanstack/react-router";

import { Page } from "@/components/Page";
import { profile } from "@/lib/profile";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — Experience, Education & Certifications | Alamu Joseph" },
      {
        name: "description",
        content:
          "Alamu Joseph's security experience at LPI Innovation Hub, Computer Science studies at Covenant University (CGPA 4.93), leadership roles, and Cisco, Microsoft and AI certifications.",
      },
      { property: "og:title", content: "Work — Alamu Joseph" },
      {
        property: "og:description",
        content: "Experience, education, leadership and certifications of a security engineer.",
      },
    ],
  }),
  component: Work,
});

function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-8 flex items-baseline gap-3 border-b border-border pb-3">
      <span className="label-mono text-primary">{index}</span>
      <h2 className="display-serif text-2xl">{title}</h2>
    </div>
  );
}

function Diamond() {
  return (
    <span
      aria-hidden
      className="mt-[7px] size-[7px] shrink-0 rotate-45 border border-primary bg-primary/10"
    />
  );
}

function Work() {
  return (
    <Page index="03" title="Work" kicker="cat ./track-record.txt">
      {/* Experience — timeline */}
      <section>
        <SectionHeading index="01" title="Experience" />
        <div className="relative pl-6 sm:pl-8">
          <span className="absolute left-[3px] top-2 bottom-2 w-px bg-border sm:left-[5px]" />
          {profile.experience.map((item) => (
            <div key={item.company} className="relative pb-10 last:pb-0">
              <span className="absolute -left-6 top-[6px] size-[9px] rotate-45 bg-primary sm:-left-8" />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="display-serif text-xl">{item.company}</h3>
                <span className="label-mono">{item.period}</span>
              </div>
              <div className="mt-1 text-[13px] text-primary">{item.role}</div>
              <div className="label-mono mt-1">{item.place}</div>
              <ul className="mt-4 space-y-2.5">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <Diamond />
                    <span className="text-[13px] leading-relaxed text-muted-foreground">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mt-20">
        <SectionHeading index="02" title="Education" />
        <div className="grid gap-4">
          {profile.education.map((item) => (
            <article
              key={item.school}
              className="rounded-[14px] border border-border bg-card p-6 transition-colors hover:border-border-strong"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="display-serif text-xl">{item.school}</h3>
                <span className="label-mono">{item.period}</span>
              </div>
              <div className="mt-1 text-[13px] text-primary">{item.degree}</div>
              <div className="label-mono mt-1">{item.place}</div>
              <div className="mt-4 grid gap-2 border-t border-border pt-4 sm:grid-cols-[auto_1fr] sm:gap-x-6">
                <span className="label-mono">coursework</span>
                <p className="text-[13px] leading-relaxed text-muted-foreground">{item.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section className="mt-20">
        <SectionHeading index="03" title="Leadership & Societies" />
        <div className="grid gap-4 sm:grid-cols-2">
          {profile.leadership.map((item) => (
            <article
              key={item.org}
              className="flex flex-col rounded-[14px] border border-border bg-card p-5"
            >
              <div className="flex items-start gap-3">
                <Diamond />
                <h3 className="text-[13px] font-medium leading-snug">{item.org}</h3>
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-3">
                <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] text-secondary-foreground">
                  {item.role}
                </span>
                <span className="label-mono">{item.period}</span>
              </div>
              <p className="mt-3 text-[12px] leading-relaxed text-muted-foreground">{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="mt-20">
        <SectionHeading index="04" title="Certifications" />
        <div className="grid gap-3 sm:grid-cols-2">
          {profile.certifications.map((cert) => (
            <article
              key={cert.name}
              className="group rounded-[14px] border border-border bg-card p-5 transition-colors hover:border-border-strong"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-[13px] font-medium leading-snug">{cert.name}</h3>
                <span className="label-mono shrink-0 text-primary">{cert.year}</span>
              </div>
              <div className="label-mono mt-2">{cert.issuer}</div>
              <p className="mt-3 border-t border-border pt-3 text-[12px] leading-relaxed text-muted-foreground">
                {cert.note}
              </p>
            </article>
          ))}
        </div>
      </section>
    </Page>
  );
}
