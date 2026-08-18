import { createFileRoute } from "@tanstack/react-router";

import { Page } from "@/components/Page";
import { SkillsRadar } from "@/components/SkillsRadar";
import { profile } from "@/lib/profile";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Alamu Joseph, Security Engineer" },
      {
        name: "description",
        content:
          "Alamu Joseph: Computer Science undergraduate at Covenant University (CGPA 4.93) working in VAPT, AWS and applied cryptography — plus a breakdown of his security skill set.",
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

function About() {
  return (
    <Page index="02" title="About" kicker="cat ./whoami.txt">
      <p className="quote-serif text-2xl leading-snug">
        I&apos;m Joseph — a Computer Science undergraduate who spends more time reading packet
        dumps and exploit output than lecture slides.
      </p>

      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {profile.bio} Most of what I know came from doing the thing: running assessments across
        real lab environments, standing up Kali and Ubuntu workstations, and building a student
        information system that computes over data it never gets to see in plaintext.
      </p>

      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        I&apos;m currently looking for cybersecurity internships and junior analyst roles where I
        can work on real traffic, real incidents and real detection engineering.
      </p>

      <section className="mt-14">
        <h2 className="label-mono mb-4 text-primary">// skills</h2>
        <SkillsRadar />
      </section>

    </Page>
  );
}
