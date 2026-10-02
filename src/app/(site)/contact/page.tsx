import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { ContactForm } from "@/components/portfolio/contact-form";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/icons";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch — I'm open to full-time roles, internships, and collaborations.",
};

export default async function ContactPage() {
  const site = await getSiteSettings();

  const channels = [
    { label: "Email", value: site.email, href: `mailto:${site.email}`, Icon: Mail },
    site.githubUrl && {
      label: "GitHub",
      value: site.githubUrl.replace(/^https?:\/\//, ""),
      href: site.githubUrl,
      Icon: GithubIcon,
    },
    site.linkedinUrl && {
      label: "LinkedIn",
      value: site.linkedinUrl.replace(/^https?:\/\//, ""),
      href: site.linkedinUrl,
      Icon: LinkedinIcon,
    },
    site.twitterUrl && {
      label: "Twitter",
      value: site.twitterUrl.replace(/^https?:\/\//, ""),
      href: site.twitterUrl,
      Icon: TwitterIcon,
    },
  ].filter(Boolean) as {
    label: string;
    value: string;
    href: string;
    Icon: typeof Mail;
  }[];

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk."
        description="Have a role, a project, or just want to connect? Fill out the form or reach me directly — I read everything."
      />

      <Container className="py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
          {/* Channels */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="font-display text-2xl font-black">Reach me directly</h2>
              <p className="mt-2 text-muted">
                Prefer email or social? Here&apos;s where to find me.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {channels.map(({ label, value, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="border-brutal shadow-brutal-sm hover-brutal flex items-center gap-4 bg-surface p-4"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center border-brutal bg-accent text-accent-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-xs font-bold uppercase tracking-widest text-muted">
                      {label}
                    </span>
                    <span className="block truncate font-semibold">{value}</span>
                  </span>
                </a>
              ))}

              {site.location ? (
                <div className="border-brutal flex items-center gap-4 bg-surface-alt p-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center border-brutal bg-surface">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-mono text-xs font-bold uppercase tracking-widest text-muted">
                      Based in
                    </span>
                    <span className="block font-semibold">{site.location}</span>
                  </span>
                </div>
              ) : null}
            </div>
          </div>

          {/* Form */}
          <Card className="p-6 sm:p-8">
            <h2 className="mb-6 font-display text-2xl font-black">
              Send a message
            </h2>
            <ContactForm />
          </Card>
        </div>
      </Container>
    </>
  );
}
