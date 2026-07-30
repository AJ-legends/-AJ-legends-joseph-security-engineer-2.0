import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Page } from "@/components/Page";
import { profile } from "@/lib/profile";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Alamu Joseph" },
      {
        name: "description",
        content:
          "Get in touch with Alamu Joseph about cybersecurity internships, junior analyst roles, or collaboration on security tooling.",
      },
      { property: "og:title", content: "Contact — Alamu Joseph" },
      {
        property: "og:description",
        content: "Reach Alamu Joseph by email, phone or LinkedIn.",
      },
    ],
  }),
  component: Contact,
});

const DETAILS = [
  { label: "email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "phone", value: profile.phone, href: `tel:${profile.phoneHref}` },
  { label: "linkedin", value: "alamu-joseph", href: profile.linkedin },
  { label: "based in", value: profile.address },
];

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const field =
    "w-full border border-border bg-surface px-3 py-2.5 font-mono text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <Page index="06" title="Contact" kicker="open channel">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <p className="quote-serif text-2xl leading-snug">
            Hiring, collaborating, or just curious about the tooling? The channel is open.
          </p>

          <dl className="mt-8 border-t border-border">
            {DETAILS.map((d) => (
              <div key={d.label} className="border-b border-border py-4">
                <dt className="label-mono mb-1">{d.label}</dt>
                <dd className="text-sm">
                  {d.href ? (
                    <a
                      href={d.href}
                      target={d.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="break-all transition-colors hover:text-primary"
                    >
                      {d.value}
                    </a>
                  ) : (
                    <span className="text-muted-foreground">{d.value}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label htmlFor="name" className="label-mono mb-1.5 block">
              name
            </label>
            <input
              id="name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={field}
              placeholder="jane doe"
            />
          </div>
          <div>
            <label htmlFor="email" className="label-mono mb-1.5 block">
              email
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={field}
              placeholder="jane@company.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="label-mono mb-1.5 block">
              message
            </label>
            <textarea
              id="message"
              required
              rows={6}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={field}
              placeholder="what are you building?"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary px-5 py-3 text-xs uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-80"
          >
            transmit
          </button>
          {sent && (
            <p className="text-xs text-primary">
              [+] draft opened in your mail client — hit send to deliver.
            </p>
          )}
        </form>
      </div>
    </Page>
  );
}
