import type { SiteSettings } from "@/types/content";

/** Renders a JSON-LD <Person> block for rich search results. */
export function PersonJsonLd({ site }: { site: SiteSettings }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const sameAs = [site.githubUrl, site.linkedinUrl, site.twitterUrl, site.websiteUrl]
    .filter(Boolean)
    .map(String);

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.fullName,
    url: baseUrl,
    email: site.email ? `mailto:${site.email}` : undefined,
    jobTitle: site.tagline,
    description: site.bio,
    image: site.avatarUrl ?? undefined,
    address: site.location
      ? { "@type": "PostalAddress", addressLocality: site.location }
      : undefined,
    sameAs: sameAs.length > 0 ? sameAs : undefined,
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
