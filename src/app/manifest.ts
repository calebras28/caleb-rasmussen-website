import type { MetadataRoute } from "next";
import { siteSettings } from "@/lib/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteSettings.fullName} — Portfolio`,
    short_name: siteSettings.fullName,
    description: siteSettings.bio,
    start_url: "/",
    display: "standalone",
    background_color: "#faf6ec",
    theme_color: "#2b50ff",
  };
}
