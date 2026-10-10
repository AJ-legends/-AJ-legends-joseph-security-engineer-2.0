import { profile } from "@/lib/profile";

export const siteConfig = {
  name: "Alamu Joseph",
  url: "https://joseph-se-portfolio.vercel.app",
  title: "Alamu Joseph — Security Engineer",
  description:
    "Portfolio of Alamu Joseph, security engineer and Python developer building offensive and defensive security tooling.",
  socialImage: "/og-image.png",
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function pageHead(path: string, title: string, description: string) {
  const url = absoluteUrl(path);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: siteConfig.url,
  image: absoluteUrl("/hacker-avatar.png"),
  jobTitle: "Security Engineer and Cloud Engineer",
  description: siteConfig.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ibadan",
    addressRegion: "Oyo State",
    addressCountry: "NG",
  },
  sameAs: [profile.github, profile.linkedin],
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "Covenant University",
  },
  knowsAbout: profile.skills,
};
