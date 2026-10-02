import type { MetadataRoute } from "next";
import { getProjectSlugs } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const staticRoutes = [
    "",
    "/about",
    "/resume",
    "/mission",
    "/projects",
    "/now",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const slugs = await getProjectSlugs();
    projectRoutes = slugs.map((slug) => ({
      url: `${baseUrl}/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    projectRoutes = [];
  }

  return [...staticRoutes, ...projectRoutes];
}
