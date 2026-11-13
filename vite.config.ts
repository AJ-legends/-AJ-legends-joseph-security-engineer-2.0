import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    tanstackStart({
      server: { entry: "server" },
      prerender: {
        enabled: true,
        autoStaticPathsDiscovery: false,
        crawlLinks: false,
      },
      pages: [
        {
          path: "/projects/packora",
          prerender: {
            enabled: true,
            outputPath: "/projects/packora/index.html",
          },
        },
      ],
    }),
    nitro({ preset: "vercel" }),
    viteReact(),
    tailwindcss(),
  ],
});
