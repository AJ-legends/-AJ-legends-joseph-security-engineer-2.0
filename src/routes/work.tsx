import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";

import { Page } from "@/components/Page";
import { profile } from "@/lib/profile";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — Experience, Education & Certifications | Alamu Joseph" },
      {
        name: "description",
        content:
          "Alamu Joseph's security experience at LPI Innovation Hub, Computer Science studies at Covenant University (CGPA 4.93), and Cisco, Microsoft and AI certifications.",
      },
      { property: "og:title", content: "Work — Alamu Joseph" },
      {
        property: "og:description",
        content: "Experience, education and certifications of a security engineer.",
      },
    ],
  }),
  component: Work,
});

function Work() {
  return (
    <Page index="03" title="Work" kicker="cat ./track-record.txt">
      <section>
        <h2 className="label-mono mb-4 text-primary">// experience</h2>
        <div className="border-t border-border">
          {profile.experience.map((item) => (
            <div
              key={item.company}
              className="grid gap-2 border-b border-border py-5 sm:grid-cols-[1fr_auto]"
            >
              <div>
                <div className="headline text-2xl">{item.company}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {item.role} — {item.place}
                </div>
                <ul className="mt-3 space-y-2">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="text-primary">–</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="label-mono sm:text-right">{item.period}</div>
            </div>
          ))}
        </div>
      </section>

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
        <h2 className="label-mono mb-4 text-primary">// certifications</h2>
        <div className="border-t border-border">
          {profile.certifications.map((cert) => (
            <div
              key={cert.name}
              className="grid gap-3 border-b border-border py-6 sm:grid-cols-[auto_1fr_auto] sm:items-start"
            >
              <ShieldCheck className="size-5 text-primary" />
              <div>
                <h3 className="headline text-2xl">{cert.name}</h3>
                <div className="label-mono mt-1">{cert.issuer}</div>
                <p className="mt-2 max-w-xl text-xs leading-relaxed text-muted-foreground">
                  {cert.note}
                </p>
              </div>
              <div className="label-mono text-primary sm:text-right">{cert.year}</div>
            </div>
          ))}
        </div>
      </section>
    </Page>
  );
}
