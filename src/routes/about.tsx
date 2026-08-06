import { createFileRoute } from "@tanstack/react-router";

import { Page } from "@/components/Page";
import { profile } from "@/lib/profile";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Alamu Joseph, Cybersecurity Analyst" },
      {
        name: "description",
        content:
          "Alamu Joseph: First Class Computer Science undergraduate at Covenant University (CGPA 4.94), ISC2 Certified in Cybersecurity, Python security tooling builder.",
      },
      { property: "og:title", content: "About — Alamu Joseph" },
      {
        property: "og:description",
        content:
          "Education, skills and background of an aspiring cybersecurity analyst from Ibadan, Nigeria.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <Page index="02" title="About" kicker="cat ./whoami.txt">
      <p className="quote-serif text-2xl leading-snug">
        I&apos;m Joseph — a Computer Science undergraduate who spends more time reading packet
        dumps than lecture slides.
      </p>

      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {profile.bio} Most of what I know came from building the thing rather than reading about
        it: a firewall that actually drops packets, a sniffer that actually reads them, a keylogger
        built in a lab so I could understand what defenders are up against.
      </p>

      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        I&apos;m currently looking for cybersecurity internships and junior analyst roles where I
        can work on real traffic, real incidents and real detection engineering.
      </p>

      <section className="mt-16">
        <h2 className="label-mono mb-4 text-primary">// education</h2>
        <div className="border-t border-border">
          {profile.education.map((item) => (
            <div
              key={item.school}
              className="grid gap-2 border-b border-border py-5 sm:grid-cols-[1fr_auto]"
            >
              <div>
                <div className="headline text-2xl">{item.school}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {item.degree} — {item.place}
                </div>
                <div className="mt-2 text-xs text-primary">{item.note}</div>
              </div>
              <div className="label-mono sm:text-right">{item.period}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="label-mono mb-4 text-primary">// skills</h2>
        <SkillsRadar />
      </section>

    </Page>
  );
}
