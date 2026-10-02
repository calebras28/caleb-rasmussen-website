import type { Metadata } from "next";
import Image from "next/image";
import { Code2, Heart, Target } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { getSiteSettings } from "@/lib/content";
import { aboutContent } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Get to know me — my background, what I care about as an engineer, and what I'm working toward.",
};

export default async function AboutPage() {
  const site = await getSiteSettings();

  return (
    <>
      <PageHeader
        eyebrow="About me"
        title="The person behind the portfolio."
        description="I'm a developer, a lifelong learner, and someone who believes good software comes from understanding people first."
      />

      <Container className="py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_1.6fr] md:gap-14">
          {/* Portrait + quick facts */}
          <div className="flex flex-col gap-6">
            <Reveal>
              <div className="relative">
                <div className="absolute -bottom-3 -left-3 h-full w-full border-brutal bg-brand-yellow" />
                {site.avatarUrl ? (
                  <Image
                    src={site.avatarUrl}
                    alt={site.fullName}
                    width={480}
                    height={480}
                    className="border-brutal shadow-brutal relative aspect-square w-full object-cover"
                  />
                ) : (
                  <div className="border-brutal shadow-brutal relative grid aspect-square w-full place-items-center bg-surface font-display text-6xl font-black">
                    {site.fullName.charAt(0)}
                  </div>
                )}
              </div>
            </Reveal>

            <Card className="p-6">
              <h2 className="font-display text-lg font-bold">Quick facts</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Name</dt>
                  <dd className="font-semibold">{site.fullName}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Role</dt>
                  <dd className="font-semibold">{site.tagline}</dd>
                </div>
                {site.location ? (
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted">Location</dt>
                    <dd className="font-semibold">{site.location}</dd>
                  </div>
                ) : null}
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Email</dt>
                  <dd className="truncate font-semibold">{site.email}</dd>
                </div>
              </dl>
              <Button href="/resume" variant="accent" className="mt-6 w-full">
                View my resume
              </Button>
            </Card>
          </div>

          {/* Narrative */}
          <div className="flex flex-col gap-10">
            <Reveal>
              <section className="prose-narrative flex flex-col gap-4">
                <h2 className="font-display text-2xl font-bold">Hello 👋</h2>
                <p className="text-lg leading-relaxed text-foreground">
                  {aboutContent.intro}
                </p>
                <p className="leading-relaxed text-muted">
                  {aboutContent.background}
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-accent" />
                  <h2 className="font-display text-2xl font-bold">
                    Where I&apos;m headed
                  </h2>
                </div>
                <p className="leading-relaxed text-muted">{aboutContent.goals}</p>
              </section>
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2">
              <Reveal>
                <Card className="h-full p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <Code2 className="h-5 w-5 text-accent" />
                    <h3 className="font-display text-lg font-bold">
                      Technical interests
                    </h3>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {aboutContent.technicalInterests.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <span className="mt-1 text-accent">▹</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>

              <Reveal delay={0.08}>
                <Card className="h-full p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <Heart className="h-5 w-5 text-accent" />
                    <h3 className="font-display text-lg font-bold">
                      Outside of code
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {aboutContent.personalInterests.map((item) => (
                      <Badge key={item} className="normal-case tracking-normal">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </Reveal>
            </div>

            <Reveal>
              <Card className="bg-ink p-6 text-paper dark:bg-surface-alt dark:text-foreground">
                <h3 className="font-display text-lg font-bold">
                  A formative chapter
                </h3>
                <p className="mt-2 text-sm text-paper/80 dark:text-muted">
                  I spent a meaningful period serving a full-time volunteer
                  mission. It shaped my work ethic, empathy, and resilience in
                  ways that still influence how I build software and work with
                  people today.
                </p>
                <Button href="/mission" variant="accent" className="mt-4">
                  Explore my mission →
                </Button>
              </Card>
            </Reveal>
          </div>
        </div>
      </Container>
    </>
  );
}
