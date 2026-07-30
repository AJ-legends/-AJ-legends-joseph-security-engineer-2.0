import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";

import { Page } from "@/components/Page";
import { profile } from "@/lib/profile";

export const Route = createFileRoute("/certifications")({
  head: () => ({
    meta: [
      { title: "Certifications — Alamu Joseph" },
      {
        name: "description",
        content:
          "ISC2 Certified in Cybersecurity (CC), Cisco Introduction to Cybersecurity, Cisco Python Essentials 1, and Prompt Engineering for Everyone.",
      },
      { property: "og:title", content: "Certifications — Alamu Joseph" },
      {
        property: "og:description",
        content: "Security and Python certifications held by Alamu Joseph.",
      },
    ],
  }),
  component: Certifications,
});

function Certifications() {
  return (
    <Page index="04" title="Certs" kicker="verify --credentials">
      <div className="border-t border-border">
        {profile.certifications.map((cert) => (
          <div
            key={cert.name}
            className="grid gap-3 border-b border-border py-6 sm:grid-cols-[auto_1fr_auto] sm:items-start"
          >
            <ShieldCheck className="size-5 text-primary" />
            <div>
              <h2 className="headline text-2xl">{cert.name}</h2>
              <div className="label-mono mt-1">{cert.issuer}</div>
              <p className="mt-2 max-w-xl text-xs leading-relaxed text-muted-foreground">
                {cert.note}
              </p>
            </div>
            <div className="label-mono text-primary sm:text-right">{cert.year}</div>
          </div>
        ))}
      </div>
    </Page>
  );
}
