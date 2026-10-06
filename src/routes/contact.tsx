import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Page } from "@/components/Page";
import { profile } from "@/lib/profile";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead(
      "/contact",
      "Contact — Alamu Joseph",
      "Get in touch with Alamu Joseph about cybersecurity internships, junior analyst roles, or collaboration on security tooling.",
    ),
  component: Contact,
});

const DETAILS = [
  { label: "email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "phone", value: profile.phone, href: `tel:${profile.phoneHref}` },
  { label: "linkedin", value: "alamu-joseph", href: profile.linkedin },
  { label: "github", value: "AJ-legends", href: profile.github },
  { label: "based in", value: profile.address },
];

function Contact() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "validation-error" | "rate-limited" | "delivery-failed"
  >("idle");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" });
  const [startedAt, setStartedAt] = useState(() => Date.now());

  const field =
    "w-full rounded-[10px] border border-border bg-card px-3 py-2.5 font-mono text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (status !== "idle") setStatus("idle");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const formMessage = form.message.trim();

    if (name.length < 2 || !/^\S+@\S+\.\S+$/.test(email) || formMessage.length < 10) {
      setMessage(
        "Enter your name, a valid email address, and a message of at least 10 characters.",
      );
      setStatus("validation-error");
      return;
    }

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, startedAt }),
      });
      const payload = (await response.json().catch(() => null)) as {
        error?: { message?: string };
      } | null;

      if (response.status === 429) {
        setMessage(payload?.error?.message ?? "Too many messages. Please try again later.");
        setStatus("rate-limited");
        return;
      }
      if (!response.ok) {
        setMessage(
          payload?.error?.message ??
            "Your message could not be delivered. Please try again shortly.",
        );
        setStatus("delivery-failed");
        return;
      }

      setForm({ name: "", email: "", message: "", website: "" });
      setStartedAt(Date.now());
      setMessage("Message transmitted. Joseph will get back to you soon.");
      setStatus("sent");
    } catch {
      setMessage("Your message could not be delivered. Please try again shortly.");
      setStatus("delivery-failed");
    }
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

        <form onSubmit={submit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="name" className="label-mono mb-1.5 block">
              name
            </label>
            <input
              id="name"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              minLength={2}
              maxLength={100}
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
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              maxLength={254}
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
              rows={6}
              value={form.message}
              onChange={(e) => updateField("message", e.target.value)}
              minLength={10}
              maxLength={5_000}
              className={field}
              placeholder="what are you building?"
            />
          </div>
          <div
            className="pointer-events-none absolute size-px overflow-hidden opacity-0"
            aria-hidden="true"
          >
            <label htmlFor="website">website</label>
            <input
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(e) => updateField("website", e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-[10px] bg-primary px-5 py-3 text-xs uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-80"
          >
            {status === "sending" ? "transmitting..." : "transmit"}
          </button>
          {status !== "idle" && status !== "sending" && (
            <p
              role={status === "sent" ? "status" : "alert"}
              className={`text-xs ${status === "sent" ? "text-primary" : "text-destructive"}`}
            >
              [{status === "sent" ? "+" : "!"}] {message}
            </p>
          )}
        </form>
      </div>
    </Page>
  );
}
