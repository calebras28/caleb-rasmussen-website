import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  Lightbulb,
  Target,
  Wrench,
  TriangleAlert,
  GraduationCap,
  Rocket,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/portfolio/status-badge";
import { TechnologyList } from "@/components/portfolio/technology-badge";
import { GithubIcon } from "@/components/icons";
import { getProjectBySlug, getProjectSlugs } from "@/lib/content";
import { categoryColors, categoryLabels } from "@/lib/labels";
import { formatDate } from "@/lib/utils";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: project.coverImage ? [{ url: project.coverImage }] : undefined,
    },
  };
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center border-brutal bg-accent text-accent-foreground shadow-brutal-sm">
          <Icon className="h-4 w-4" />
        </span>
        <h2 className="font-display text-xl font-black sm:text-2xl">{title}</h2>
      </div>
      <div className="leading-relaxed text-muted">{children}</div>
    </section>
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article>
      <Container className="pt-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 font-display text-sm font-bold hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" /> Back to projects
        </Link>
      </Container>

      {/* Header */}
      <Container className="py-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge color={categoryColors[project.category]}>
            {categoryLabels[project.category]}
          </Badge>
          <StatusBadge status={project.status} />
          <span className="font-mono text-xs text-muted">
            {formatDate(project.date)}
          </span>
        </div>
        <h1 className="mt-4 max-w-4xl font-display text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl md:text-6xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{project.summary}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.liveUrl ? (
            <Button href={project.liveUrl} variant="accent">
              <ExternalLink className="h-4 w-4" /> Live demo
            </Button>
          ) : null}
          {project.githubUrl ? (
            <Button href={project.githubUrl} variant="secondary">
              <GithubIcon className="h-4 w-4" /> View code
            </Button>
          ) : null}
        </div>
      </Container>

      {/* Cover image */}
      {project.coverImage ? (
        <Container>
          <div className="relative aspect-[16/9] w-full overflow-hidden border-brutal shadow-brutal">
            <Image
              src={project.coverImage}
              alt={`${project.title} cover`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
        </Container>
      ) : null}

      {/* Body */}
      <Container className="py-14">
        <div className="grid gap-12 lg:grid-cols-[1.7fr_1fr]">
          <div className="flex flex-col gap-12">
            <Section icon={Lightbulb} title="Overview">
              <p>{project.description}</p>
            </Section>

            {project.problem ? (
              <Section icon={Target} title="The problem">
                <p>{project.problem}</p>
              </Section>
            ) : null}

            {project.solution ? (
              <Section icon={Lightbulb} title="The solution">
                <p>{project.solution}</p>
              </Section>
            ) : null}

            {project.features.length > 0 ? (
              <Section icon={Rocket} title="Key features">
                <ul className="flex flex-col gap-2">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="mt-1 shrink-0 text-accent">▹</span>
                      <span className="text-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            ) : null}

            {project.architecture ? (
              <Section icon={Wrench} title="Technical architecture">
                <p>{project.architecture}</p>
              </Section>
            ) : null}

            {project.challenges ? (
              <Section icon={TriangleAlert} title="Challenges">
                <p>{project.challenges}</p>
              </Section>
            ) : null}

            {project.whatILearned ? (
              <Section icon={GraduationCap} title="What I learned">
                <p>{project.whatILearned}</p>
              </Section>
            ) : null}

            {project.futureImprovements ? (
              <Section icon={Rocket} title="Future improvements">
                <p>{project.futureImprovements}</p>
              </Section>
            ) : null}

            {/* Screenshots */}
            {project.images.length > 0 ? (
              <section className="flex flex-col gap-4">
                <h2 className="font-display text-xl font-black sm:text-2xl">
                  Screenshots
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.images.map((img) => (
                    <div
                      key={img.url}
                      className="relative aspect-video overflow-hidden border-brutal shadow-brutal-sm"
                    >
                      <Image
                        src={img.url}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
            <Card className="p-6">
              <h3 className="mb-3 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Tech stack
              </h3>
              <TechnologyList items={project.technologies} />
            </Card>

            <Card className="p-6">
              <h3 className="mb-3 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                Details
              </h3>
              <dl className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted">Category</dt>
                  <dd className="font-semibold">
                    {categoryLabels[project.category]}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-muted">Status</dt>
                  <dd>
                    <StatusBadge status={project.status} />
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted">Date</dt>
                  <dd className="font-semibold">{formatDate(project.date)}</dd>
                </div>
              </dl>
            </Card>

            <Card className="bg-accent p-6 text-accent-foreground">
              <h3 className="font-display font-bold">Interested?</h3>
              <p className="mt-1 text-sm opacity-90">
                Want to talk about this project or work together?
              </p>
              <Button href="/contact" variant="primary" className="mt-4 w-full">
                Get in touch
              </Button>
            </Card>
          </aside>
        </div>
      </Container>
    </article>
  );
}
