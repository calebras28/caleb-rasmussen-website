import Image from "next/image";
import { ArrowRight, ArrowUpRight, Download, Sparkles } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Marquee } from "@/components/portfolio/marquee";
import { ProjectGrid } from "@/components/portfolio/project-grid";
import { StatusBadge } from "@/components/portfolio/status-badge";
import { TechnologyList } from "@/components/portfolio/technology-badge";

import {
  getSiteSettings,
  getFeaturedProjects,
  getNowItems,
} from "@/lib/content";
import { PersonJsonLd } from "@/components/seo/json-ld";
import { highlights } from "@/lib/data/site";
import { featuredSkills } from "@/lib/data/skills";

export default async function HomePage() {
  const [site, featured, now] = await Promise.all([
    getSiteSettings(),
    getFeaturedProjects(3),
    getNowItems(),
  ]);

  const nowPreview = now.slice(0, 2);

  return (
    <>
      <PersonJsonLd site={site} />
      {/* Hero */}
      <section className="relative overflow-hidden border-b-[3px] border-border bg-dots">
        <Container className="grid gap-10 py-16 md:grid-cols-[1.4fr_1fr] md:items-center md:py-24">
          <div className="flex flex-col gap-6">
            <span className="inline-flex w-fit items-center gap-2 border-brutal bg-brand-lime px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-ink shadow-brutal-sm">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-ink" />
              Available for opportunities
            </span>

            <h1 className="font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
              I&apos;m{" "}
              <span className="bg-accent px-2 text-accent-foreground">
                {site.fullName.split(" ")[0]}
              </span>
            </h1>

            <p className="max-w-xl text-lg text-muted">
              {site.tagline}. {site.bio}
            </p>

            <div className="flex flex-wrap gap-3">
              <Button href="/projects" variant="accent" size="lg">
                View my work <ArrowRight className="h-5 w-5" />
              </Button>
              <Button href="/resume" variant="secondary" size="lg">
                <Download className="h-5 w-5" /> Resume
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Contact me
              </Button>
            </div>
          </div>

          <Reveal className="relative mx-auto w-full max-w-xs md:max-w-none">
            <div className="relative">
              <div className="absolute -right-3 -top-3 h-full w-full border-brutal bg-accent" />
              <Image
                src="/mission/stride-1.jpg"
                alt={`${site.fullName} standing on a plank bridge in Pucallpa, Peru`}
                width={768}
                height={1024}
                priority
                className="border-brutal relative aspect-[3/4] w-full object-cover shadow-brutal"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Skills marquee */}
      <Marquee items={featuredSkills} />

      {/* Highlights */}
      <Container className="py-16 md:py-24">
        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((h, i) => (
            <Reveal key={h.title} delay={i * 0.08}>
              <Card className="h-full p-6">
                <span className="font-mono text-sm font-bold text-accent">
                  0{i + 1}
                </span>
                <h3 className="mt-2 font-display text-xl font-bold">{h.title}</h3>
                <p className="mt-2 text-sm text-muted">{h.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* Featured projects */}
      <section className="border-y-[3px] border-border bg-surface-alt py-16 md:py-24">
        <Container>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Selected work"
              title="Featured projects"
              description="A few things I've designed, built, and shipped end-to-end."
            />
            <Button href="/projects" variant="primary">
              All projects <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
          <ProjectGrid projects={featured} />
        </Container>
      </section>

      {/* Now teaser */}
      <Container className="py-16 md:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Currently"
            title="What I'm working on"
            description="I like to keep learning and building in public."
          />
          <Button href="/now" variant="secondary">
            See everything <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {nowPreview.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <Card className="flex h-full flex-col gap-4 p-6">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-lg font-bold">{item.title}</h3>
                  <StatusBadge status={item.status} />
                </div>
                <p className="text-sm text-muted">{item.description}</p>
                <TechnologyList items={item.technologies} max={4} className="mt-auto" />
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* Mission teaser */}
      <section className="border-y-[3px] border-border bg-ink py-16 text-paper dark:bg-surface-alt dark:text-foreground md:py-24">
        <Container className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <Badge color="yellow" className="mb-3">
              <Sparkles className="h-3 w-3" /> Beyond code
            </Badge>
            <h2 className="font-display text-3xl font-black sm:text-4xl">
              Learn about my mission experience
            </h2>
            <p className="mt-3 text-paper/80 dark:text-muted">
              Before I wrote software full-time, I spent a formative period
              serving others in a new place and culture. It taught me discipline,
              empathy, and how to keep going when things get hard.
            </p>
          </div>
          <Button href="/mission" variant="accent" size="lg">
            Read the story <ArrowRight className="h-5 w-5" />
          </Button>
        </Container>
      </section>

      {/* Contact CTA */}
      <Container className="py-16 md:py-24">
        <Reveal>
          <Card className="relative overflow-hidden bg-accent p-8 text-accent-foreground md:p-14">
            <div className="relative z-10 flex flex-col items-start gap-5">
              <h2 className="max-w-2xl font-display text-3xl font-black sm:text-5xl">
                Let&apos;s build something together.
              </h2>
              <p className="max-w-xl text-lg opacity-90">
                I&apos;m open to full-time roles, internships, and interesting
                collaborations. My inbox is always open.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button href="/contact" variant="primary" size="lg">
                  Get in touch <ArrowRight className="h-5 w-5" />
                </Button>
                {site.githubUrl ? (
                  <Button href={site.githubUrl} variant="secondary" size="lg">
                    View GitHub
                  </Button>
                ) : null}
              </div>
            </div>
          </Card>
        </Reveal>
      </Container>
    </>
  );
}
