# Alamu Joseph — Security Engineer Portfolio

A resume-focused portfolio website for Alamu Joseph, a security engineer and Computer Science undergraduate working across offensive security, cloud infrastructure, networking, Python automation, and applied cryptography.

The site combines a recruiter-friendly resume presentation with a terminal-inspired visual system, interactive skills overview, project case studies, and an optional AI terminal.

## Highlights

- Responsive portfolio and resume layout
- Experience, education, leadership, certifications, and project sections
- Downloadable resume served from the app public assets
- Mobile and tablet footer with essential contact links
- Terminal-inspired interface with boot sequence and animated terminal panel
- Interactive skills radar
- Optional streamed SENTRY AI terminal
- TanStack Start server rendering and file-based routing

## Tech Stack

- React 19
- TypeScript
- TanStack Start and TanStack Router
- Vite and Nitro
- Tailwind CSS 4
- Lucide React
- npm lockfile for reproducible installs

## Local Development

### Requirements

- Node.js 20 or newer
- npm 10 or newer

### Install

```bash
npm ci
```

### Start the development server

```bash
npm run dev
```

The app runs at `http://127.0.0.1:3000` unless the Vite configuration selects another available port.

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── components/       Shared layout, navigation, footer, terminal, and UI components
├── lib/profile.ts    Central resume and portfolio content model
├── routes/           TanStack file-based routes and the chat endpoint
├── assets/           Source images and local assets
└── styles.css        Theme tokens, typography, utilities, and global styles
public/
├── Alamu_Joseph_Resume.pdf
├── hacker-avatar.png
└── robots.txt
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Portfolio introduction and terminal preview |
| `/about` | Background, focus areas, and skills |
| `/work` | Experience, education, leadership, and certifications |
| `/projects` | Security and engineering projects |
| `/terminal` | Interactive SENTRY terminal |
| `/contact` | Contact details and enquiry form |

## Content Updates

Most resume content is centralized in `src/lib/profile.ts`. Update that file when changing:

- Name, role, location, and contact details
- Professional summary and focus areas
- Skills and radar-chart values
- Education and work history
- Projects, leadership, and certifications

The downloadable resume is `public/Alamu_Joseph_Resume.pdf`.

## Optional AI Terminal

The `/terminal` route uses the server endpoint at `/api/chat`. Configure the server-side AI gateway key expected by the current implementation in your deployment environment.

If the key is missing, the rest of the portfolio remains available and the AI terminal reports that it is not configured.

## Deployment

The project can be deployed to a platform that supports the TanStack Start build output. For Vercel, configure the install command as `npm ci` and the build command as `npm run build`.

Before launch, configure:

- A production domain
- Environment variables for server-side integrations
- A real contact submission provider or API endpoint
- Canonical metadata, sitemap, and analytics if discoverability and usage measurement are priorities

## License

No license has been added yet. Add one before distributing or reusing this project publicly.
