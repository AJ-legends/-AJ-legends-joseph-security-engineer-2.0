import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { BootSequence, shouldPlayBoot } from "@/components/BootSequence";
import { GridLines } from "@/components/GridLines";
import { Sidebar } from "@/components/Sidebar";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center font-mono">
        <h1 className="headline text-7xl text-primary">404</h1>
        <h2 className="mt-4 text-sm uppercase tracking-[0.18em]">segfault // route not found</h2>
        <p className="mt-2 text-xs text-muted-foreground">
          That path isn&apos;t mapped on this host.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center border border-primary px-4 py-2 text-xs uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            cd ~
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center font-mono">
        <h1 className="text-sm uppercase tracking-[0.18em] text-primary">
          [!] process terminated
        </h1>
        <p className="mt-2 text-xs text-muted-foreground">
          Something failed on this route. Retry or head home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="border border-primary px-4 py-2 text-xs uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            retry
          </button>
          <a
            href="/"
            className="border border-border px-4 py-2 text-xs uppercase tracking-[0.18em] transition-colors hover:border-primary"
          >
            cd ~
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Alamu Joseph — Cybersecurity Analyst" },
      {
        name: "description",
        content:
          "Portfolio of Alamu Joseph, aspiring cybersecurity analyst and Python developer building offensive and defensive security tooling.",
      },
      { name: "author", content: "Alamu Joseph" },
      { property: "og:title", content: "Alamu Joseph — Cybersecurity Analyst" },
      {
        property: "og:description",
        content:
          "Attack. Defend. Automate. Security tooling, certifications and an AI terminal you can query.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;900&family=Fraunces:ital,opsz,wght@1,9..144,300&family=JetBrains+Mono:wght@300;400;500;700&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [booting, setBooting] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setBooting(shouldPlayBoot());
    setChecked(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GridLines />
      <Sidebar />
      <main
        className={`relative z-10 min-h-screen pt-[53px] lg:pl-[280px] lg:pt-0 ${
          checked && !booting ? "opacity-100" : "opacity-0"
        } transition-opacity duration-500`}
      >
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      {booting && <BootSequence onDone={() => setBooting(false)} />}
    </QueryClientProvider>
  );
}
