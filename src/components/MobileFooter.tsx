import { profile } from "@/lib/profile";

const RESUME_PATH = "/Alamu_Joseph_Resume.pdf";

export function MobileFooter() {
  return (
    <footer className="bg-background px-6 py-9 lg:hidden sm:px-8">
      <div className="mx-auto max-w-4xl border-t border-border-strong pt-8">
        <h2 className="display-serif text-2xl sm:text-3xl">{profile.name}</h2>

        <a
          href={`mailto:${profile.email}`}
          className="mt-2 inline-block text-[12px] text-muted-foreground transition-colors hover:text-foreground sm:text-[13px]"
        >
          {profile.email}
        </a>

        <div className="mt-7 flex flex-col gap-5 text-[11px] leading-relaxed text-muted-foreground sm:flex-row sm:items-end sm:justify-between sm:text-[12px]">
          <p className="max-w-xl">
            {profile.location}. {profile.role} portfolio focused on offensive security, cloud
            infrastructure, networking, and Python automation.
          </p>

          <nav aria-label="Footer links" className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground"
            >
              GitHub
            </a>
            <span aria-hidden>·</span>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground"
            >
              LinkedIn
            </a>
            <span aria-hidden>·</span>
            <a
              href={RESUME_PATH}
              download="Alamu-Joseph-Resume.pdf"
              className="transition-colors hover:text-foreground"
            >
              Resume
            </a>
            <span aria-hidden>·</span>
            <a
              href={`mailto:${profile.email}`}
              className="transition-colors hover:text-foreground"
            >
              Email
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
