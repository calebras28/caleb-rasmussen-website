import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/icons";
import { Container } from "@/components/ui/container";
import { navLinks } from "@/lib/data/site";
import { getSiteSettings } from "@/lib/content";

export async function Footer() {
  const site = await getSiteSettings();
  const year = new Date().getFullYear();

  const socials = [
    site.githubUrl && { href: site.githubUrl, label: "GitHub", Icon: GithubIcon },
    site.linkedinUrl && { href: site.linkedinUrl, label: "LinkedIn", Icon: LinkedinIcon },
    site.twitterUrl && { href: site.twitterUrl, label: "Twitter", Icon: TwitterIcon },
    site.email && { href: `mailto:${site.email}`, label: "Email", Icon: Mail },
  ].filter(Boolean) as { href: string; label: string; Icon: typeof Mail }[];

  return (
    <footer className="mt-24 border-t-[3px] border-border bg-surface-alt">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="flex flex-col gap-3">
            <span className="font-display text-xl font-extrabold">
              {site.fullName}
            </span>
            <p className="max-w-xs text-sm text-muted">{site.tagline}</p>
            <div className="mt-2 flex gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="border-brutal shadow-brutal-sm hover-brutal grid h-10 w-10 place-items-center bg-surface"
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 font-mono text-xs font-bold uppercase tracking-widest text-muted">
              Navigate
            </h3>
            <ul className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-mono text-xs font-bold uppercase tracking-widest text-muted">
              Get in touch
            </h3>
            <p className="text-sm text-muted">
              Have a project in mind or just want to say hi? I&apos;d love to hear
              from you.
            </p>
            <Link
              href="/contact"
              className="border-brutal shadow-brutal-sm hover-brutal mt-4 inline-flex bg-accent px-4 py-2 font-display font-bold text-accent-foreground"
            >
              Contact me →
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t-[3px] border-border pt-6 text-sm text-muted sm:flex-row">
          <p>
            © {year} {site.fullName}. Built with Next.js, TypeScript &amp; Prisma.
          </p>
          <p className="font-mono text-xs">Designed &amp; developed from scratch.</p>
        </div>
      </Container>
    </footer>
  );
}
