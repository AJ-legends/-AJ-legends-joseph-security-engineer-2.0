import { useEffect, useState } from "react";

const scenarios = [
  [
    "[*] replay feed opened: samples/demo.pcap",
    "[+] parsed TCP 10.0.0.12:51842 -> 1.1.1.1:443 [TLS ClientHello]",
    "[!] detection: unanswered port scan — 3 probes from 10.0.0.44",
    "[i] 24 frames classified | parsed: 22 | unsupported: 2",
  ],
  [
    "[*] filter applied: dns or udp port 53",
    "[+] parsed DNS 10.0.0.18:53541 -> 8.8.8.8:53 [A api.github.com]",
    "[!] detection: high-volume DNS — threshold exceeded for 10.0.0.18",
    "[i] protocol mix: DNS 42% | TCP 38% | TLS 20%",
  ],
  [
    "[*] session view: 10.0.0.21:49152 <-> 93.184.216.34:443",
    "[+] TCP stream reassembled: 18 segments | 0 retransmissions",
    "[+] parsed TLS ServerHello [TLSv1.3]",
    "[i] flow summary: 14.2 KiB transferred | duration 2.8s",
  ],
] as const;

function lineClassName(line: string) {
  if (line.startsWith("[!]")) return "text-warn";
  if (line.startsWith("[+]")) return "text-terminal-accent";
  return undefined;
}

export function PackoraDemo() {
  const [scenarioIndex, setScenarioIndex] = useState(0);

  useEffect(() => {
    setScenarioIndex(Math.floor(Math.random() * scenarios.length));

    const intervalId = window.setInterval(() => {
      setScenarioIndex((currentIndex) => (currentIndex + 1) % scenarios.length);
    }, 4800);

    return () => window.clearInterval(intervalId);
  }, []);

  const lines = scenarios[scenarioIndex];

  return (
    <pre className="mt-5 overflow-x-auto rounded-[12px] bg-terminal p-4 text-[11px] leading-relaxed text-terminal-muted" aria-live="polite">
      {lines.map((line) => (
        <div key={line} className={lineClassName(line)}>
          {line}
        </div>
      ))}
    </pre>
  );
}
