import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";

import { Page } from "@/components/Page";
import { pageHead } from "@/lib/site";

const githubUrl = "https://github.com/AJ-legends/packora";

export const Route = createFileRoute("/projects/packora")({
  head: () =>
    pageHead(
      "/projects/packora",
      "Packora — Terminal Packet Analyzer | Alamu Joseph",
      "Packora is a terminal packet analyzer that replays and captures traffic, reassembles TCP streams, and surfaces explainable network-security detections.",
    ),
  component: PackoraProject,
});

function PackoraProject() {
  return (
    <Page index="04" title="Packora" kicker="cd ./projects/packora">
      <Link
        to="/projects"
        className="mb-8 inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-3.5" />
        Back to builds
      </Link>

      <section className="border-b border-border pb-10">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="max-w-2xl">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-primary">Terminal packet analyzer</p>
            <h1 className="headline text-4xl sm:text-5xl">A mini-Wireshark for the terminal.</h1>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Packora captures or replays network traffic, classifies every frame, reassembles TCP streams, and turns useful detection heuristics into clear investigation leads.
            </p>
          </div>

          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium transition-colors hover:border-primary hover:text-primary"
          >
            <Github className="size-4" />
            View on GitHub
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </section>

      <section className="grid gap-5 py-10 md:grid-cols-2">
        <InfoCard
          title="What it does"
          items={[
            "Replays PCAP files without elevated privileges, or captures from a real network interface.",
            "Parses Ethernet, IP, TCP, UDP, DNS, HTTP, TLS, DHCP, ICMP and NTP metadata.",
            "Detects investigation leads such as port scans, SYN floods, DNS anomalies and ARP conflicts.",
          ]}
        />
        <InfoCard
          title="Engineering choices"
          items={[
            "Python 3.11+, Scapy for capture, and a keyboard-driven Textual dashboard.",
            "Neutral packet models isolate parser and analysis code from Scapy types.",
            "Malformed and unsupported frames are contained and labelled instead of terminating a run.",
          ]}
        />
      </section>

      <section className="border-t border-border py-10">
        <SectionTitle title="UML-style component diagram" caption="The capture layer is deliberately separated from parsing, analysis and presentation." />
        <div className="overflow-x-auto rounded-[18px] border border-border bg-card p-5">
          <div className="flex min-w-[660px] items-center gap-3 font-mono text-[11px] text-muted-foreground">
            <DiagramNode label="Capture" detail="PCAP replay / live NIC" />
            <DiagramArrow />
            <DiagramNode label="Parsers" detail="Ethernet → TLS" />
            <DiagramArrow />
            <DiagramNode label="PacketInfo" detail="neutral models" accent />
            <DiagramArrow />
            <DiagramNode label="Analysis" detail="sessions + detections" />
            <DiagramArrow />
            <DiagramNode label="Textual UI" detail="table + filters" />
          </div>
        </div>
      </section>

      <section className="border-t border-border py-10">
        <SectionTitle title="Detection flow" caption="Detections are explainable leads for an analyst—not automated verdicts." />
        <div className="grid gap-3 sm:grid-cols-4">
          {[
            ["1", "Ingest", "Replay a synthetic PCAP or read a permitted interface."],
            ["2", "Classify", "Mark every frame parsed, unsupported or malformed."],
            ["3", "Analyse", "Reassemble conversations and compare behaviour with thresholds."],
            ["4", "Surface", "Show a concise, cooldown-protected alert in the terminal dashboard."],
          ].map(([step, title, description]) => (
            <div key={step} className="rounded-[14px] border border-border bg-card p-4">
              <span className="font-mono text-xs text-primary">{step.padStart(2, "0")}</span>
              <h3 className="mt-4 font-medium">{title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border py-10">
        <SectionTitle
          title="Terminal workflow"
          caption="A real run against Packora’s committed synthetic PCAP, using the CLI’s scan threshold and plain output mode."
        />
        <div className="overflow-hidden rounded-[14px] bg-terminal font-mono text-[11px] leading-relaxed text-terminal-muted">
          <div className="border-b border-white/10 px-5 py-3">
            <span className="text-terminal-accent">$</span> packora --replay samples/demo.pcap --scan-threshold 3 --no-tui
          </div>
          <div className="overflow-x-auto p-5">
            <pre>{`time     outcome     protocol   source                  destination             details
23:13:21 PARSED      TCP        10.99.0.10:60021         10.0.1.20:21            flags=S
23:13:21 PARSED      TCP        10.99.0.10:60022         10.0.1.20:22            flags=S
23:13:21 PARSED      TCP        10.99.0.10:60023         10.0.1.20:23            flags=S
23:13:22 MALFORMED   NETWORK    -                       -                       truncated or malformed IPv4 packet
23:13:22 UNSUPPORTED NETWORK    02:00:00:00:00:bb        02:00:00:00:00:aa       unknown ethertype 0x88b7

Packora run summary
mode       : replay
target     : replay:samples\\demo.pcap
detection  : enabled
packets    : 24
duration   : 0.70s

Protocol mix: TCP 18 | DNS 2 | HTTP 2 | malformed 1 | unsupported 1`}</pre>
            <div className="mt-4 space-y-1">
              <p className="text-terminal-accent">Alerts (2)</p>
              <p className="text-warn">[23:13:23] [MEDIUM] port_scan src=10.99.0.10 — 12 unanswered SYN probes to distinct ports within 60s</p>
              <p className="text-warn">[23:13:23] [MEDIUM] port_scan src=10.99.0.11 — 3 unanswered SYN probes to distinct ports within 60s</p>
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-[18px] border border-border bg-card p-5">
      <h2 className="headline text-2xl">{title}</h2>
      <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
        {items.map((item) => <li key={item}>— {item}</li>)}
      </ul>
    </article>
  );
}

function SectionTitle({ title, caption }: { title: string; caption: string }) {
  return (
    <div className="mb-5">
      <h2 className="headline text-3xl">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{caption}</p>
    </div>
  );
}

function DiagramNode({ label, detail, accent = false }: { label: string; detail: string; accent?: boolean }) {
  return (
    <div className={`w-28 rounded-[12px] border p-3 text-center ${accent ? "border-primary bg-primary/5" : "border-border bg-background"}`}>
      <div className={accent ? "text-primary" : "text-foreground"}>{label}</div>
      <div className="mt-1 text-[9px] leading-snug text-muted-foreground">{detail}</div>
    </div>
  );
}

function DiagramArrow() {
  return <span className="text-primary" aria-hidden="true">→</span>;
}
