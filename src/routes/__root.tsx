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
import { BootSequence, shouldPlayBoot } from "@/components/BootSequence";
import { Sidebar } from "@/components/Sidebar";
import { TopNav } from "@/components/TopNav";
import { ScrollChain } from "@/components/ScrollChain";
import { MobileFooter } from "@/components/MobileFooter";
import { absoluteUrl, personStructuredData, siteConfig } from "@/lib/site";

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
      { title: siteConfig.title },
      {
        name: "description",
        content: siteConfig.description,
      },
      { name: "author", content: siteConfig.name },
      { property: "og:title", content: siteConfig.title },
      {
        property: "og:description",
        content:
          "Attack. Defend. Automate. Security tooling, certifications and an AI terminal you can query.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: siteConfig.name },
      { property: "og:image", content: absoluteUrl(siteConfig.socialImage) },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Alamu Joseph, Security Engineer and Cloud Engineer — Attack. Defend. Automate.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: absoluteUrl(siteConfig.socialImage) },
      {
        name: "twitter:image:alt",
        content: "Alamu Joseph, Security Engineer and Cloud Engineer — Attack. Defend. Automate.",
      },
      { "script:ld+json": personStructuredData },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;900&family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300&family=JetBrains+Mono:wght@300;400;500;700&display=swap",
      },
      { rel: "icon", href: "/hacker-avatar.png?v=2", type: "image/png" },
      { rel: "apple-touch-icon", href: "/hacker-avatar.png?v=2" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
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
      <div
        className={`min-h-screen ${
          checked && !booting ? "opacity-100" : "opacity-0"
        } transition-opacity duration-500`}
      >
        <TopNav />
        <Sidebar />
        <main className="relative z-10 lg:pl-[300px]">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        <MobileFooter />
      </div>
      <ScrollChain />
      {booting && <BootSequence onDone={() => setBooting(false)} />}
    </QueryClientProvider>
  );
}

