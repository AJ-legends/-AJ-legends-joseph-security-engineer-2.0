export const profile = {
  name: "Alamu Joseph",
  handle: "alamu_joseph",
  role: "Security Engineer",
  location: "Ibadan, Nigeria",
  address: "Ibadan, Oyo State, Nigeria",
  email: "alamujosephlegacy@gmail.com",
  phone: "+234 814 918 9165",
  phoneHref: "+2348149189165",
  linkedin: "https://www.linkedin.com/in/alamu-joseph",
  github: "https://github.com/AJ-legends",
  bio: "Computer Science undergraduate at Covenant University working across offensive and defensive security — VAPT with Nmap, Metasploit and Burp Suite, AWS infrastructure, and privacy-preserving systems built on homomorphic encryption.",
  verbs: ["ATTACK", "DEFEND", "AUTOMATE"],
  titles: ["Security Engineer", "Cloud Engineer"],
  intro:
    "B.Sc. Computer Science @ Covenant University · CGPA 4.93 / 5.0. Breaking systems in the lab, hardening them in production, and automating the boring parts in Python.",
  focus: ["vapt", "cloud", "linux", "python"],
  quote:
    "Continuous Detection & Continuous Response (CD/CR).",
  stats: [
    { value: "4.93", label: "CGPA / 5.0" },
    { value: "13", label: "Lab environments assessed" },
    { value: "06", label: "Certifications earned" },
    { value: "PY", label: "Primary language" },
  ],
  skills: [
    "Penetration Testing",
    "Vulnerability Assessment",
    "Digital Forensics",
    "Homomorphic Encryption",
    "Nmap / Metasploit / Burp Suite",
    "Wireshark / Gobuster / Hydra",
    "AWS EC2, S3, IAM, VPC",
    "Linux & Windows Server",
    "Python, TypeScript, SQL",
  ],
  skillGroups: [
    {
      id: "security",
      label: "Security",
      note: "Vulnerability assessment and web-security testing in authorized lab environments.",
      axes: [
        { label: "Network Security", value: 90 },
        { label: "GRC", value: 58 },
        { label: "SIEM", value: 88 },
        { label: "Web Testing", value: 92 },
        { label: "Linux Hardening", value: 76 },
        { label: "Vuln. Reporting", value: 80 },
      ],
    },
    {
      id: "cloud",
      label: "Cloud & Infrastructure",
      note: "Operating and securing cloud workloads, identities, monitoring, and Linux hosts.",
      axes: [
        { label: "Linux Admin", value: 88 },
        { label: "IAM", value: 84 },
        { label: "CloudWatch", value: 80 },
        { label: "EC2", value: 74 },
        { label: "VPC / SGs", value: 70 },
        { label: "S3", value: 68 },
      ],
    },
    {
      id: "programming",
      label: "Programming",
      note: "Python-first scripting and version-controlled development.",
      axes: [
        { label: "Python", value: 90 },
        { label: "Bash", value: 84 },
        { label: "Git", value: 82 },
        { label: "JavaScript", value: 74 },
        { label: "TypeScript", value: 70 },
        { label: "SQL", value: 68 },
      ],
    },
  ],
  education: [
    {
      school: "Covenant University",
      place: "Ota, Ogun State",
      degree: "B.Sc. Computer Science",
      period: "Sep 2022 — Sep 2026",
      note: "CGPA 4.93 / 5.0 — Computer Security, Operating Systems, Algorithms & Data Structures, OOP",
    },
    {
      school: "Command Day Secondary School, Odogbo",
      place: "Ibadan, Oyo State",
      degree: "SSCE",
      period: "2016 — 2022",
      note: "Best Graduating Student and Head Boy — led the student body and graduated top of the set.",
    },
  ],

  experience: [
    {
      company: "LPI Innovation Hub",
      role: "IT Intern",
      place: "Ibadan",
      period: "Mar 2025 — Sep 2025",
      points: [
        "Performed vulnerability assessments and penetration testing using Nmap and Metasploit, identifying and validating vulnerabilities across 13 laboratory environments.",
        "Deployed Ubuntu Linux on standard workstations and configured Kali Linux environments for VAPT.",
        "Researched AI-related cybersecurity risks and contributed to technical documentation promoting security awareness and responsible AI usage.",
        "Supported day-to-day network monitoring, troubleshooting and IT helpdesk operations.",
      ],
    },
  ],
  projects: [
    {
      slug: "secure-sis",
      name: "Secure Student Information System",
      cmd: "npm run start -- --crypto paillier --host ec2",
      description:
        "A full-stack student information system built with React, TypeScript, Express.js and SQLite, integrating the Paillier cryptosystem for privacy-preserving computation over encrypted student records. The backend uses JWT authentication, role-based authorization and homomorphic encryption services so academic data is processed and decrypted without exposing it to the application layer.",
      tags: [
        "React",
        "TypeScript",
        "Express.js",
        "SQLite",
        "AWS EC2 / S3",
        "Paillier Cryptosystem",
      ],
      log: [
        "[+] paillier keypair generated — 2048 bit",
        "[*] encrypted aggregate over 412 records",
        "[+] jwt auth + rbac enforced",
        "[i] plaintext never leaves the crypto layer",
      ],
    },
    {
      slug: "windows-vm-pentest",
      name: "Windows VM Penetration Test",
      cmd: "msfconsole -q -x 'use exploit/windows/local/...'",
      description:
        "Full penetration tests against a Windows 11 VM and Metasploitable 2 — exploiting vulnerabilities and practising privilege escalation, defense evasion and post-exploitation. Also competed in a GDG campus challenge, identifying and exploiting a vulnerability in a navigator application in a controlled CTF-style environment.",
      tags: ["Metasploit", "Kali Linux", "Windows 11", "Metasploitable 2", "VirtualBox"],
      log: [
        "[*] exploit completed — meterpreter session 1 opened",
        "[+] getsystem — NT AUTHORITY\\SYSTEM",
        "[*] av evasion payload staged",
        "[+] post-exploitation loot collected",
      ],
    },
    {
      slug: "keylogger",
      name: "Keylogger — Keystroke Monitoring Tool",
      cmd: "./keylog.py --research-mode --out ./lab/session.log",
      description:
        "A Python-based keylogger written for ethical offensive-security research: capturing keystrokes and monitoring system activity inside isolated lab environments to study attacker techniques and inform defensive countermeasures.",
      tags: ["Python", "Input hooks", "Offensive research", "Detection"],
      log: [
        "[*] research mode — isolated lab only",
        "[+] hook attached to input layer",
        "[*] writing to ./lab/session.log",
        "[i] mitigation notes: 04",
      ],
    },
    {
      slug: "python-firewall",
      name: "Python Firewall — Rule-Based Packet Filter",
      cmd: "sudo ./firewall.py --rules ./rules.yaml --iface eth0",
      description:
        "A rule-based firewall written in Python that inspects inbound and outbound packets against a configurable ruleset, blocking traffic by IP, port and protocol. Built to understand how stateful filtering, rule precedence and default-deny policies behave in practice.",
      tags: ["Python", "Sockets", "Packet filtering", "Netfilter", "Linux"],
      log: [
        "[*] loading ruleset — 24 rules parsed",
        "[+] default policy: DENY",
        "[!] blocked 10.0.0.14:4444 — policy match #07",
        "[i] 1,283 packets inspected",
      ],
    },
    {
      slug: "packet-sniffer",
      name: "Packet Sniffer — Traffic Analyzer",
      cmd: "sudo ./sniffer.py --iface eth0 --filter tcp",
      description:
        "A Python packet sniffer that captures live traffic on a network interface and decodes Ethernet, IP, TCP and UDP headers, printing a readable breakdown of each frame. Used alongside Wireshark to study protocol behaviour, plaintext exposure and anomalous flows.",
      tags: ["Python", "Raw sockets", "TCP/IP", "Wireshark", "Traffic analysis"],
      log: [
        "[*] promiscuous mode enabled on eth0",
        "[+] tcp 192.168.1.20:52344 -> 93.184.216.34:80",
        "[!] plaintext credentials observed in http POST",
        "[i] 4,096 frames decoded",
      ],
    },
  ],
  leadership: [
    {
      org: "Covenant University Literary & Debating Society (CULDS)",
      role: "General Secretary",
      period: "2025 — 2026",
      note: "Ran records, correspondence and meeting logistics for the society's executive council.",
    },
    {
      org: "Google Developer Groups (GDG) — Covenant University",
      role: "Cybersecurity Track Member",
      period: "2024 — Present",
      note: "Part of the cybersecurity track: routine meetings and tasks, penetration testing assessments, and production security evaluations of products built by the GDG community.",
    },
    {
      org: "Nigerian Association of Computing Students (NACOS)",
      role: "Member",
      period: "2022 — Present",
      note: "Campus chapter member — tech meetups, workshops and inter-university competitions.",
    },
  ],

  certifications: [
    {
      name: "Ethical Hacking",
      issuer: "Cisco Networking Academy",
      year: "2025",
      note: "Reconnaissance, exploitation, post-exploitation and reporting methodology.",
    },
    {
      name: "Cybersecurity Essentials",
      issuer: "Cisco Networking Academy",
      year: "2024",
      note: "Threat landscape, cryptography, access control and defensive fundamentals.",
    },
    {
      name: "Python Essentials",
      issuer: "Cisco Networking Academy",
      year: "2024",
      note: "Core Python syntax, data structures and control flow.",
    },
    {
      name: "IT Essentials",
      issuer: "Cisco Networking Academy",
      year: "2024",
      note: "Hardware, operating systems, networking and IT support operations.",
    },
    {
      name: "Microsoft Office Specialist: Office 2019",
      issuer: "Microsoft",
      year: "2023",
      note: "Certified proficiency across the Microsoft Office productivity suite.",
    },
    {
      name: "Prompt Engineering for LLMs",
      issuer: "OBTranslate",
      year: "2025",
      note: "Structured prompting, model behaviour and applied LLM workflows.",
    },
  ],
};

export type Profile = typeof profile;
