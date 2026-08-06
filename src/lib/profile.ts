export const profile = {
  name: "Alamu Joseph",
  handle: "alamu_joseph",
  role: "Aspiring Cybersecurity Analyst",
  location: "Ibadan, Oyo State, Nigeria",
  address: "5 Ayoyemi Dairo St, Unity Zone, Akobo, Ibadan, Oyo State, Nigeria",
  email: "jalamu.2201879@stu.cu.edu.ng",
  phone: "+234 814 918 9165",
  phoneHref: "+2348149189165",
  linkedin: "https://www.linkedin.com/in/alamu-joseph",
  github: "https://github.com/AJ-legends",
  bio: "Computer Science undergraduate with a growing interest in cybersecurity and Python development. I build small offensive and defensive tooling to understand how networks break, and how to keep them from breaking.",
  verbs: ["ATTACK", "DEFEND", "AUTOMATE"],
  stats: [
    { value: "4.94", label: "CGPA / First Class" },
    { value: "ISC2 CC", label: "Certified in Cybersecurity" },
    { value: "03", label: "Security tools built" },
    { value: "PY", label: "Primary language" },
  ],
  skills: [
    "Python Programming",
    "Cybersecurity Fundamentals",
    "Network Traffic Analysis",
    "Packet Inspection",
    "Prompt Engineering",
    "Critical Thinking",
    "Microsoft Office",
  ],
  education: [
    {
      school: "Covenant University",
      place: "Ota, Ogun State",
      degree: "B.Sc. Computer Science",
      period: "In progress",
      note: "First Class — CGPA 4.94",
    },
    {
      school: "Command Day Secondary School Odogbo",
      place: "Ibadan, Oyo State",
      degree: "SSCE",
      period: "2016 — 2022",
      note: "Best Graduating Student & Head Boy",
    },
  ],
  projects: [
    {
      slug: "mini-firewall",
      name: "Python Mini Firewall",
      cmd: "sudo ./firewall.py --iface eth0 --rules deny.conf",
      description:
        "A packet-filtering firewall that inspects inbound traffic against a rule set, blocks connections from specific IPs and ports, and logs every dropped packet for later analysis.",
      tags: ["Python", "Packet filtering", "Rule engine", "Logging"],
      log: [
        "[+] rule set loaded — 14 rules",
        "[!] DROP tcp 45.155.205.233:52144 -> :22",
        "[!] DROP udp 194.26.29.11:5060 -> :5060",
        "[+] 2 blocked / 1841 allowed",
      ],
    },
    {
      slug: "keylogger",
      name: "Python Key Logger",
      cmd: "./keylog.py --research-mode --out ./lab/session.log",
      description:
        "A keystroke monitoring tool written for cybersecurity research — built to study how keylogging works at the input layer, and to reason about detection and mitigation strategies.",
      tags: ["Python", "Input hooks", "Research", "Detection"],
      log: [
        "[*] research mode — local capture only",
        "[+] hook attached to input layer",
        "[*] writing to ./lab/session.log",
        "[i] mitigation notes: 04",
      ],
    },
    {
      slug: "packet-sniffer",
      name: "Python Packet Sniffer",
      cmd: "sudo ./sniff.py --iface wlan0 --dpi --verbose",
      description:
        "A network sniffer that captures live traffic, performs basic Deep Packet Inspection on payloads, and writes structured logs for protocol and anomaly analysis.",
      tags: ["Python", "DPI", "Sockets", "Traffic analysis"],
      log: [
        "[+] listening on wlan0 (promisc)",
        "[*] TCP 192.168.0.14:443  TLSv1.3  1420b",
        "[*] DNS query -> updates.local",
        "[+] 3.2k packets captured",
      ],
    },
  ],
  certifications: [
    {
      name: "Certified in Cybersecurity (CC)",
      issuer: "ISC2",
      year: "2025",
      note: "Foundational security principles, access control, network security, incident response.",
    },
    {
      name: "Prompt Engineering For Everyone",
      issuer: "Cognitive Class",
      year: "2025",
      note: "Structured prompting, model behaviour, and applied LLM workflows.",
    },
    {
      name: "Introduction to Cybersecurity",
      issuer: "Cisco Networking Academy",
      year: "2024",
      note: "Threat landscape, attack vectors, and defensive fundamentals.",
    },
    {
      name: "Python Essentials 1",
      issuer: "Cisco Networking Academy",
      year: "2024",
      note: "Core Python syntax, data structures, and control flow.",
    },
  ],
};

export type Profile = typeof profile;
