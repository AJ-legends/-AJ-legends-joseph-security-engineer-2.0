## ALAMU JOSEPH — Cybersecurity Portfolio

A single-page-feel portfolio built as real routes, styled as a clean web3/terminal system: solid **#0a0a0a** black, **#00ff88** terminal green, faint grid lines, no gradients, no glassmorphism.

### Design system

- **Colors:** bg `#0a0a0a`, surface `#141414`, accent `#00ff88`, text `#e6e6e6`. Solid fills only, 1px hairline borders, near-zero border radius.
- **Fonts** (from the site you liked): Big Shoulders Display 900 for oversized headlines, Fraunces italic 300 for accents/pull-quotes, JetBrains Mono for everything terminal, labels, and body detail.
- **Grid lines:** a fixed faint vertical/horizontal rule overlay across the whole site, like the Abraham site.
- Reduced-motion support and mobile layout throughout.

### 1. Boot sequence (first visit only)

Full-screen black terminal. Typed, timed sequence:

```text
[*] listening on 0.0.0.0:4444 ...
[+] connection from 102.89.x.x
[*] sending payload  ████████████░░░  78%
[+] shell obtained — uid=0(root)
$ whoami
> alamu_joseph :: security
[ ACCESS GRANTED ]
```

Then the shell "drops" and the site wipes into view. Stored in `sessionStorage` so it plays once per visit; a `SKIP` key/tap bypasses it.

### 2. Persistent left sidebar

Fixed rail (collapses to a top bar on mobile) with:

- A generated **hacker avatar icon** (hooded terminal-glyph mark in green-on-black, not a photo).
- Name, `SECURITY ENGINEER`, status dot `// AVAILABLE`.
- Contact block: phone, email, LinkedIn, Ibadan/Nigeria location — each row copy-to-clipboard with a `copied` terminal echo.
- Nav links + `RESUME.pdf` download.

### 3. Home

Oversized headline with a cycling word: **ATTACK / DEFEND / AUTOMATE** — vertical slot rotation with the accent color, mono kicker line beneath. Below it: a stats strip (CGPA 4.94, ISC2 CC certified, 3 security tools built).

### 4. Sections/routes

- `**/` Home** — hero + cycling verbs + stats.
- `**/about**` — bio from your resume, education (Covenant University, First Class CGPA 4.94; Command Day Secondary — Head Boy & Best Graduating Student), skills as mono chips.
- `**/projects**` — Python Mini Firewall, Python Keylogger, Python Packet Sniffer. Each rendered as a terminal card: `$ ./firewall.py --iface eth0` header, description, tag row, sample log output.
- `**/certifications**` — ISC2 CC (2025), Prompt Engineering for Everyone, Cisco Intro to Cybersecurity, Cisco Python Essentials 1.
- `**/playground**` — the terminal AI (below).
- `**/contact**` — form + the same contact details in full-page form.

### 5. Playground — your "Alfred"

A real terminal window where visitors type questions and an AI answers **as your assistant**, in your voice, grounded on your resume, projects, and skills. Streaming responses, blinking caret, typed output. Suggested starter prompts appear as clickable commands (`> what tools has joseph built?`, `> is he available for internships?`). Off-topic questions get deflected in character. Powered by Lovable AI, server-side — no key exposed, no sign-in, no chat history stored.

### Technical notes

- TanStack Start routes; fonts loaded via `<link>` in the root route; all colors as semantic tokens in `src/styles.css`.
- Resume PDF uploaded as a downloadable asset.
- AI terminal: a streaming `/api/chat` server route using the Lovable AI Gateway with a system prompt built from your resume data.
- Per-route SEO metadata (unique titles/descriptions/OG tags).

### Not included unless you ask

Blog, database, user accounts, or a real backend contact-form inbox (the form will need Lovable Cloud to actually deliver mail — say the word and I'll add it).