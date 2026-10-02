import type { SiteSettings } from "@/types/content";

/**
 * Central identity for the site. These values flow into the UI, SEO metadata,
 * and the database seed.
 */
export const siteSettings: SiteSettings = {
  fullName: "Caleb Rasmussen",
  tagline: "Data, AI & Software Engineer",
  bio: "Applied Computational Mathematics student at BYU working at the intersection of data, AI, and software engineering. Building real ETL pipelines, integrating machine learning models, and shipping full-stack applications.",
  email: "calebrasmussen28@gmail.com",
  location: "Provo, UT",
  githubUrl: null,
  linkedinUrl: "https://www.linkedin.com/in/caleb-rasmussen-b54b8b274/",
  twitterUrl: null,
  websiteUrl: null,
  resumeUrl: "/resume.pdf",
  avatarUrl: null,
};

/** Navigation links shared by the navbar, mobile menu, and footer. */
export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/mission", label: "Mission" },
  { href: "/projects", label: "Projects" },
  { href: "/now", label: "Now" },
  { href: "/contact", label: "Contact" },
] as const;

/** Short, scannable value props shown on the home page. */
export const highlights = [
  {
    title: "Data Engineering",
    description:
      "Building and optimizing ETL pipelines that move accurate, reliable data across large, complex systems.",
  },
  {
    title: "AI & Machine Learning",
    description:
      "Integrating ML models and AI tooling into real products to turn raw data into useful predictions and insight.",
  },
  {
    title: "Full-Stack Software",
    description:
      "Shipping end-to-end applications with Python, SQL, TypeScript, React, and Supabase.",
  },
] as const;

/** About page narrative content. */
export const aboutContent = {
  intro:
    "Currently studying Applied Computational Mathematics with an emphasis in AI and machine learning at BYU. At the intersection of data, AI, and software engineering, I love to see how these areas can be combined to solve complex problems and create meaningful business value.",
  background:
    "Through my experience in data engineering and data science, I've worked on building and optimizing ETL data pipelines, integrating APIs and machine learning models, and developing software to solve real world problems. I've also built full stack applications that I'm passionate about, using technologies like Python, SQL, TypeScript, React, and Supabase.",
  goals:
    "I love bridging technical expertise with business understanding. Using technology not just to solve problems, but to identify the right problems to solve and build solutions that create real value.",
  technicalInterests: [
    "Data engineering & ETL pipelines",
    "Machine learning & AI integration",
    "APIs, automation & real-time data",
    "Database design (PostgreSQL & Supabase)",
    "Full-stack application development",
  ],
  personalInterests: [
    "Fluent Spanish speaker",
    "AI in Business Club",
    "AI Association",
    "Sports analytics",
  ],
};
